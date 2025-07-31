import { create } from "zustand";
import {
	isSignInWithEmailLink,
	onAuthStateChanged,
	onIdTokenChanged,
	signInWithEmailLink,
	User,
	EmailAuthProvider,
	linkWithCredential
} from "firebase/auth";
import { auth } from "@/firebase";
// import notification from "@/app/widgets/Notification";
import { FirebaseUser } from "@/app/shared/api/types/auth";
import {
	getUserSubscriptionInfo,
	registerUserAfterPayment,
	signInAnonymouslyHandler
} from "@/app/shared/api/auth";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import {
	clearAccessTokenCookie,
	safeLocalStorage,
	setAccessTokenCookie
} from "@/app/shared/helpers";
import {
	ACTION_AUTH_SUCCESS,
	ACTION_ORGANIC,
	REDIRECT_URL
} from "@/app/shared/consts";
import { FirebaseError } from "firebase/app";
import * as Sentry from "@sentry/nextjs";
import {
	trackAuthorizationReturn,
	trackRegisterPaidWebUser
} from "../lib/amplitude";

const loadCharactersFromLocalStorage = (): { premium: boolean | null } => {
	if (typeof window === "undefined") return { premium: null };
	const storedPremium = localStorage.getItem("hasPremium");

	if (
		!storedPremium ||
		storedPremium === "undefined" ||
		storedPremium === "null"
	) {
		Sentry.addBreadcrumb({
			category: "localStorage",
			message: "hasPremium is invalid, returning null",
			level: "info",
			data: { raw_value: storedPremium }
		});
		return { premium: null };
	}

	try {
		return { premium: JSON.parse(storedPremium) };
	} catch (error) {
		// Детальное логирование ошибки JSON парсинга
		const storedPremium = localStorage.getItem("hasPremium");

		Sentry.captureException(error, {
			tags: {
				function: "loadCharactersFromLocalStorage",
				error_type: "json_parse_error",
				localStorage_key: "hasPremium"
			},
			extra: {
				raw_value: storedPremium,
				value_type: typeof storedPremium,
				value_length: storedPremium?.length,
				is_null: storedPremium === null,
				is_undefined_string: storedPremium === "undefined",
				is_null_string: storedPremium === "null",
				is_empty_string: storedPremium === "",
				first_chars: storedPremium?.substring(0, 10),
				last_chars: storedPremium?.substring(-10)
			},
			level: "error"
		});

		console.error("Failed to parse hasPremium from localStorage:", {
			error,
			raw_value: storedPremium,
			value_type: typeof storedPremium
		});
		return { premium: null };
	}
};

interface AuthState {
	isPremium: boolean | null;
	user: User | null;
	loading: boolean;
	setUser: (user: User | null) => void;
	isAuthModalActive: boolean;
	modalType: "login" | "register" | "forgotPass" | null;
	setIsPremium: (value: boolean) => void;
	setAuthModal: (value: {
		modalType: "login" | "register" | "forgotPass" | null;
		isAuthModalActive: boolean;
	}) => void;
	isRegistrationComplete: boolean;
	setRegistrationComplete: (isComplete: boolean) => void;
}

// Вспомогательная функция для отправки ошибок в Sentry с контекстом
const captureAuthError = (
	error: Error | FirebaseError | unknown,
	context: Record<string, unknown> = {}
) => {
	const authAction =
		typeof context.action === "string" ? context.action : "unknown";
	// Если это объект ошибки Firebase, извлекаем детали
	if (error instanceof FirebaseError) {
		Sentry.captureException(error, {
			tags: {
				auth_action: authAction,
				firebase_error_code: error.code
			},
			extra: {
				...context,
				firebase_error_message: error.message,
				firebase_error_details: error.customData
			}
		});
		console.error(`Auth error (${context.action}):`, error.code, error.message);
	} else if (error instanceof Error) {
		// Для стандартных ошибок JavaScript
		Sentry.captureException(error, {
			tags: {
				auth_action: authAction
			},
			extra: context
		});
	} else {
		// Для других типов ошибок
		Sentry.captureException(error, {
			tags: {
				auth_action: authAction
			},
			extra: context
		});
		console.error(`Auth error (${context.action}):`, error);
	}
};

// Добавляем функцию для отслеживания успешных действий (опционально)
const trackAuthSuccess = (
	action: string,
	data: Record<string, unknown> = {}
) => {
	const message = `Auth success: ${action}`;

	Sentry.addBreadcrumb({
		category: "auth",
		message: `Auth action successful: ${action}`,
		level: "info",
		data
	});

	Sentry.captureMessage(message, {
		level: "info", // Используем уровень info для успешных действий
		tags: {
			auth_action: action,
			auth_success: "true"
		},
		extra: data
	});
};

export const useAuthStore = create<AuthState>((set) => {
	const initialCharacters = loadCharactersFromLocalStorage();

	return {
		isPremium: initialCharacters.premium,
		user: null,
		loading: true,
		isAuthModalActive: false,
		modalType: "register",
		setUser: (user: User | null) => set({ user, loading: false }),
		setAuthModal: (value: {
			modalType: "login" | "register" | "forgotPass" | null;
			isAuthModalActive: boolean;
		}) =>
			set({
				modalType: value.modalType,
				isAuthModalActive: value.isAuthModalActive
			}),
		setIsPremium: (isPremium: boolean) => {
			set({ isPremium });
		},
		isRegistrationComplete: false,
		setRegistrationComplete: (isComplete: boolean) =>
			set({ isRegistrationComplete: isComplete })
	};
});

let isEmailSignInHandled = false;

onAuthStateChanged(auth, async (firebaseUser) => {
	// Получаем методы управления состоянием из стора
	const { setSuccessPaymentModal, setTokens } = usePaymentStore.getState();
	const { setAuthModal, setUser, setIsPremium, setRegistrationComplete } =
		useAuthStore.getState();

	// Удаляет временные значения из localStorage
	const cleanLocalStorage = async () => {
		safeLocalStorage.remove("tempToken");
		safeLocalStorage.remove("emailForSignIn");
	};

	// Проверка, является ли вход социальным (Google, Facebook, Twitter)
	const isSocialLogin = (user: User) =>
		user.providerData.some((p) =>
			["google.com", "facebook.com", "twitter.com"].includes(p.providerId)
		);

	// Получаем данные из URL и localStorage
	const email = safeLocalStorage.get("emailForSignIn");
	const searchParams =
		typeof window !== "undefined"
			? new URLSearchParams(window.location.search)
			: null;
	const authSuccess = searchParams?.get("action") === ACTION_AUTH_SUCCESS;
	const organicAuth = searchParams?.get("action") === ACTION_ORGANIC;
	const subscriptionSuccess =
		searchParams?.get("action") === "subscription_success";

	// Сохраняем данные о подписке в localStorage
	const action = searchParams?.get("action");
	if (action === "auth_success" || action === "subscription_success") {
		safeLocalStorage.set(
			"pendingSubscriptionActivation",
			JSON.stringify({
				searchParams: searchParams?.toString() ?? ""
			})
		);
	}

	// Обработка action=subscription_success для уже авторизованных пользователей
	if (firebaseUser && !firebaseUser.isAnonymous && subscriptionSuccess) {
		try {
			Sentry.addBreadcrumb({
				category: "auth",
				message: "Starting payment registration",
				level: "info",
				data: {
					email: firebaseUser.email ?? "",
					uid: firebaseUser.uid,
					searchParams: searchParams?.toString() ?? ""
				}
			});

			setUser(firebaseUser);

			// setSuccessPaymentModal({
			// 	isSuccessPaymentModalActive: true,
			// 	successPaymentModalType: "auth_success"
			// });

			const success = await registerUserAfterPayment(
				firebaseUser.email ?? "",
				searchParams?.toString() ?? "",
				5,
				1500
			);

			if (success) {
				trackAuthSuccess("payment_registration_authenticated", {
					email: firebaseUser.email
				});

				// Загружаем обновленную информацию о подписке
				const userInfo = await getUserSubscriptionInfo();
				setIsPremium(userInfo?.subscription?.active ?? false);
				setTokens(userInfo?.tokens ?? 0);
				setRegistrationComplete(true);

				const characterIdFromUrl = searchParams?.get("character_id");

				// Показываем модальное окно успешной активации
				if (characterIdFromUrl) {
					setSuccessPaymentModal({
						isSuccessPaymentModalActive: true,
						successPaymentModalType: "auth_success"
					});
				}

				// Очищаем URL от параметров
				window.history.replaceState(
					{},
					document.title,
					window.location.pathname
				);

				trackAuthSuccess("subscription_activated", {
					email: firebaseUser.email,
					subscription_active: userInfo?.subscription?.active
				});

				return;
			} else {
				// Регистрация не удалась, но не выбросила исключение
				Sentry.captureMessage(
					"Payment registration failed for authenticated user",
					{
						level: "warning",
						tags: { auth_action: "payment_registration_authenticated" },
						extra: {
							email: firebaseUser.email,
							searchParams: searchParams?.toString()
						}
					}
				);
			}
		} catch (paymentError) {
			captureAuthError(paymentError, {
				action: "payment_registration_authenticated",
				email: firebaseUser.email,
				searchParams: searchParams?.toString()
			});
		}
	}

	// Обработка входа через email-ссылку
	if (
		typeof window !== "undefined" &&
		isSignInWithEmailLink(auth, window.location.href) &&
		!isEmailSignInHandled
	) {
		isEmailSignInHandled = true;
		try {
			Sentry.addBreadcrumb({
				category: "auth",
				message: "Starting email link authentication",
				level: "info",
				data: { email, hasSearchParams: !!searchParams }
			});

			const urlParams = new URLSearchParams(window.location.search);
			const emailFromUrl = urlParams.get("email");

			// Используем email из URL или из localStorage, если URL не содержит email
			const emailToUse = emailFromUrl || email || "";

			// Если email найден в URL, сохраняем его в localStorage для будущего использования
			if (emailFromUrl && typeof window !== "undefined") {
				safeLocalStorage.set("emailForSignIn", emailFromUrl);
			}

			// Проверяем, есть ли текущий анонимный пользователь
			const currentUser = auth.currentUser;
			let result;

			if (currentUser && currentUser.isAnonymous) {
				// Если есть анонимный пользователь, связываем его с email-аутентификацией

				try {
					const credential = EmailAuthProvider.credentialWithLink(
						emailToUse,
						window.location.href
					);

					result = await linkWithCredential(currentUser, credential);

					Sentry.addBreadcrumb({
						category: "auth",
						message: "Successfully linked anonymous user with email",
						level: "info",
						data: {
							email: emailToUse,
							uid: currentUser.uid,
							preservedUID: true
						}
					});
				} catch (linkError) {
					// Если связывание не удалось, попробуем обычный вход
					captureAuthError(linkError, {
						action: "link_anonymous_with_email",
						email: emailToUse,
						anonymousUID: currentUser.uid
					});

					// Fallback к обычному входу
					result = await signInWithEmailLink(
						auth,
						emailToUse,
						window.location.href
					);
				}
			} else {
				result = await signInWithEmailLink(
					auth,
					emailToUse,
					window.location.href
				);
			}

			const user = result.user as FirebaseUser;

			const oldToken = safeLocalStorage.get("accessToken") || "";
			const newToken = user.accessToken;
			trackAuthorizationReturn(oldToken !== newToken, oldToken, newToken);

			if (result) {
				safeLocalStorage.set("accessToken", user.accessToken);
				setUser(user);

				// Регистрация после успешной оплаты
				const action = searchParams?.get("action");

				if (action && action === "auth_permanent") {
					const pendingSubscriptionActivation = safeLocalStorage.get(
						"pendingSubscriptionActivation"
					);

					if (pendingSubscriptionActivation) {
						try {
							const success = await registerUserAfterPayment(
								emailToUse,
								searchParams?.toString() ?? "",
								5,
								1500
							);

							if (success) {
								trackRegisterPaidWebUser(
									emailToUse,
									"success",
									undefined,
									searchParams?.toString()
								);
								trackAuthSuccess("payment_registration_permanent", { email });
								safeLocalStorage.remove("pendingSubscriptionActivation");
								window.history.replaceState(
									{},
									document.title,
									window.location.pathname
								);
							} else {
								// Регистрация не удалась, но не выбросила исключение
								trackRegisterPaidWebUser(
									emailToUse,
									"error",
									"registration failed without error",
									searchParams?.toString()
								);
								Sentry.captureMessage(
									"Payment registration failed without error",
									{
										level: "warning",
										tags: { auth_action: "payment_registration_permanent" },
										extra: { email, searchParams: searchParams?.toString() }
									}
								);
							}
						} catch (error) {
							const errorMessage =
								error instanceof Error ? error.message : "unknown error";
							trackRegisterPaidWebUser(
								emailToUse,
								"error",
								errorMessage,
								searchParams?.toString()
							);

							captureAuthError(error, {
								action: "payment_registration_permanent",
								email: emailToUse,
								searchParams: searchParams?.toString()
							});
						}
					}
					Sentry.addBreadcrumb({
						category: "auth",
						message: "Redirecting to chats (auth_permanent)",
						level: "info",
						data: { email: emailToUse }
					});

					// Загружаем данные о подписке перед редиректом
					try {
						const userInfo = await getUserSubscriptionInfo();
						setIsPremium(userInfo?.subscription?.active ?? false);
						setTokens(userInfo?.tokens ?? 0);
						setRegistrationComplete(true);

						// Отслеживаем успешную аутентификацию
						trackAuthSuccess("auth_permanent", {
							subscription_active: userInfo?.subscription?.active,
							email: emailToUse
						});

						// Очищаем URL и выполняем редирект
						window.history.replaceState({}, document.title, "/chats");
						return (window.location.href = "/chats");
					} catch (userInfoError) {
						captureAuthError(userInfoError, {
							action: "get_user_subscription_auth_permanent",
							email: emailToUse,
							userId: user.uid
						});

						// Даже при ошибке все равно выполняем редирект
						window.history.replaceState({}, document.title, "/chats");
						return (window.location.href = "/chats");
					}
				}

				try {
					// Загружаем данные о подписке и токенах
					const userInfo = await getUserSubscriptionInfo();
					if (authSuccess && !userInfo?.subscription?.active) {
						Sentry.captureMessage(
							"Payment was successful but subscription is not active",
							{
								level: "warning",
								tags: { auth_action: "subscription_check" },
								extra: { email, userInfo }
							}
						);
						console.warn(
							"Payment was successful but subscription is not active"
						);
					}

					setIsPremium(userInfo?.subscription?.active ?? false);
					setTokens(userInfo?.tokens ?? 0);
					setRegistrationComplete(true);

					// Отслеживаем успешную аутентификацию
					trackAuthSuccess("email_link_auth", {
						subscription_active: userInfo?.subscription?.active,
						is_organic: !!organicAuth
					});

					// Органическая регистрация — редирект на квиз ( если нет платной пописки )
					if (organicAuth && !userInfo?.subscription?.active) {
						const url = new URL(window.location.href);
						url.search = "";
						window.history.replaceState(null, "", url.toString());
					}
				} catch (userInfoError) {
					captureAuthError(userInfoError, {
						action: "get_user_subscription",
						email,
						userId: user.uid
					});
				}

				await cleanLocalStorage();
			}
		} catch (error) {
			captureAuthError(error, {
				action: "email_link_signin",
				email,
				url: window.location.href
			});
			console.error("Email link sign-in error:", error);
			window.history.replaceState({}, document.title, window.location.pathname);
		}
		return;
	}

	// Если пользователь не авторизован
	if (!firebaseUser) {
		clearAccessTokenCookie();
		setUser(null);
		setIsPremium(false);
		setTokens(0);
		setRegistrationComplete(false);
		safeLocalStorage.remove("pendingSubscriptionActivation");

		try {
			Sentry.addBreadcrumb({
				category: "auth",
				message: "Starting anonymous sign in",
				level: "info"
			});
			await signInAnonymouslyHandler();

			const currentUser = auth.currentUser;
			if (currentUser) {
				setUser(currentUser);
				trackAuthSuccess("anonymous_signin", { uid: currentUser.uid });
			} else {
				Sentry.captureMessage("Anonymous sign in completed but user is null", {
					level: "warning",
					tags: { auth_action: "anonymous_signin" }
				});
			}
		} catch (error) {
			captureAuthError(error, { action: "anonymous_signin" });
			console.error("Failed to sign in anonymously:", error);
		}
		return;
	}

	const token = await firebaseUser.getIdToken();

	// Обработка входа через социальные сети
	// if (isSocialLogin(firebaseUser)) {
	//   const userInfo = await getUserSubscriptionInfo();

	//   const pendingActivation = safeLocalStorage.get(
	//     "pendingSubscriptionActivation",
	//   );

	//   if (pendingActivation) {
	//     try {
	//       const activationData = JSON.parse(pendingActivation);
	//       if (activationData.searchParams) {
	//         console.log(
	//           "Found pendingSubscriptionActivation, activating subscription...",
	//         );

	//         // Получаем email пользователя из Firebase
	//         const userEmail = firebaseUser.email;

	//         if (userEmail) {
	//           // Регистрируем пользователя после оплаты
	//           const success = await registerUserAfterPayment(
	//             userEmail,
	//             activationData.searchParams,
	//             5,
	//             1500,
	//           );

	//           if (success) {
	//             console.log("Subscription activated successfully");

	//             // Обновляем информацию о подписке
	//             const updatedUserInfo = await getUserSubscriptionInfo();
	//             setIsPremium(updatedUserInfo?.subscription?.active ?? false);
	//             setTokens(updatedUserInfo?.tokens ?? 0);

	//             // Если подписка активирована, не делаем редирект на квиз
	//             if (updatedUserInfo?.subscription?.active) {
	//               // Очищаем localStorage и устанавливаем токен
	//               await cleanLocalStorage();
	//               safeLocalStorage.set("accessToken", token);
	//               safeLocalStorage.remove("pendingSubscriptionActivation");
	//               setUser(firebaseUser);
	//               setTokens(updatedUserInfo?.tokens ?? 0);
	//               setSuccessPaymentModal({
	//                 isSuccessPaymentModalActive: false,
	//                 successPaymentModalType: null,
	//               });
	//               setRegistrationComplete(true);
	//               return;
	//             }
	//           } else {
	//             console.warn("Failed to activate subscription");
	//           }
	//         } else {
	//           console.warn("User email is missing, cannot activate subscription");
	//         }
	//       }
	//     } catch (error) {
	//       console.error("Error processing pendingSubscriptionActivation:", error);
	//     }
	//   }

	//   await cleanLocalStorage();
	//   safeLocalStorage.set("accessToken", token);
	//   setIsPremium(userInfo?.subscription?.active ?? false);
	//   setUser(firebaseUser);
	//   setTokens(userInfo?.tokens ?? 0);
	//   setAuthModal({ modalType: null, isAuthModalActive: false });
	//   setRegistrationComplete(true);
	//   // Если зашел через соц.сети и нет премиума то редиректим на квиз
	//   if (!userInfo?.subscription?.active) {
	//     return (window.location.href = process.env.NEXT_PUBLIC_QUIZ_URL ?? "");
	//   }
	//   return;
	// }

	// Анонимный вход — сохраняем временный токен
	if (firebaseUser.isAnonymous) {
		safeLocalStorage.set("tempToken", token);
		setUser(firebaseUser);
		return;
	}

	// Стандартный вход зарегистрированного пользователя
	if (!subscriptionSuccess) {
		const userInfo = await getUserSubscriptionInfo();
		setIsPremium(userInfo?.subscription?.active ?? false);
		setTokens(userInfo?.tokens ?? 0);
	}

	await cleanLocalStorage();
	safeLocalStorage.set("accessToken", token);
	setAuthModal({ modalType: null, isAuthModalActive: false });
	setUser(firebaseUser);
});

onIdTokenChanged(auth, async (firebaseUser) => {
	if (firebaseUser) {
		const token = await firebaseUser.getIdToken(true);
		setAccessTokenCookie(token);
	} else {
		clearAccessTokenCookie();
	}
});
