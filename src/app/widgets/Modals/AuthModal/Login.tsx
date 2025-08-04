import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import ImageModal from "@/../public/images/img/image-modal.webp";
// import IconEye from '@/../public/images/icons/icon-eye.svg';
import IconGoogle from "@/../public/images/icons/icon-google.svg";
import IconFacebook from "@/../public/images/icons/icon-fb.webp";
import IconX from "@/../public/images/icons/icon-x.webp";
import Link from "next/link";
import clsx from "clsx";
import Spinner from "@/app/widgets/Spinner";
import {
	handleEmailLinkAuth,
	// signInWithEmailAndPasswordHandler,
	signInWithFacebook,
	signInWithGoogle,
	signInWithX
} from "@/app/shared/api/auth";
import { authErrorMessages } from "@/app/shared/consts";
// import {useAuthStore} from "@/app/shared/store/authStore";
import notification from "@/app/widgets/Notification";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { useTranslations } from "next-intl";

interface FormData {
	email: string;
	// password: string;
}

interface AuthError {
	code: string;
}

const Login = () => {
	// const {setAuthModal} = useAuthStore()
	const { selectedCharacterId, characters } = useSelectedCardStore();
	const currentCharacter =
		characters && characters?.find((item) => item.id === selectedCharacterId);
	const image = currentCharacter ? currentCharacter.image : ImageModal.src;
	const [loading, setLoading] = useState<boolean>(false);
	// const [showPassword, setShowPassword] = useState<boolean>(false);
	const [authError, setAuthError] = useState<string | null>(null);
	const t = useTranslations("LoginModal");
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>();
	// const [isChecked, setIsChecked] = useState(false);

	const onSubmit = async (data: FormData) => {
		try {
			setLoading(true);
			const isOrganicAuth = true;
			const resp = await handleEmailLinkAuth(data.email, isOrganicAuth);

			if (resp && resp?.success) {
				notification.open({
					title: "Message sent",
					type: "success",
					description: "We have sent you an email to confirm your address"
				});

				reset();
			}
		} catch (error) {
			const authError = error as AuthError;
			const errorMessage =
				authErrorMessages[authError.code] || authErrorMessages["default"];
			setAuthError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const onGoogleSignInHandler = async () => {
		try {
			await signInWithGoogle();
		} catch (error) {
			console.log("error", error);
		}
	};

	const onXSignInHandler = async () => {
		try {
			await signInWithX();
		} catch (error) {
			console.log(error);
		}
	};

	const onFacebookSignInHandler = async () => {
		try {
			await signInWithFacebook();
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<div className="flex justify-between overflow-hidden rounded-[24px] sm:h-full">
			<div className="w-full bg-[#121423] p-[20px] sm:flex sm:h-full sm:flex-col sm:items-center sm:justify-center sm:pt-[60px]">
				<p className="mb-[24px] text-[20px] font-semibold leading-[1.2em]">
					{t("login_title")}
				</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="mb-[32px] space-y-[16px] border-b border-b-[#3A3F63] pb-[32px] sm:w-full"
				>
					{/* Поле Email */}
					<div className="relative">
						<label
							htmlFor="email"
							className="mb-[8px] block pl-[16px] text-[12px] leading-[1.2em]"
						>
							{t("login_email")}
						</label>
						<input
							id="email"
							type="email"
							placeholder={t("login_input_your_e_mail")}
							className={clsx(
								"placeholder-text:opacity-50 h-[48px] w-full rounded-[12px] border border-transparent bg-[#191B2C] px-[16px] text-[14px] font-medium leading-[1.5em] outline-offset-0 transition-all duration-300 focus:border-[#049AEF] focus:outline-none focus:outline-offset-0",
								{
									"!border-[#BD0000]": errors.email
								}
							)}
							{...register("email", {
								required: "Email обязателен",
								pattern: {
									value: /^\S+@\S+\.\S+$/,
									message: "Некорректный email"
								}
							})}
						/>
						{errors.email && (
							<p className="absolute right-0 top-0 text-[12px] text-[#BD0000]">
								{errors.email.message}
							</p>
						)}
					</div>
					{authError && (
						<p className="text-[14px] text-[#BD0000]">{authError}</p>
					)}

					{/* Кнопка отправки */}
					<button
						type="submit"
						disabled={loading}
						className="main-gradient flex h-[40px] w-full items-center justify-center gap-[10px] rounded-[12px] text-[20px] font-bold disabled:pointer-events-none disabled:bg-[#778899] disabled:bg-none"
					>
						<span className="relative z-[5]">{t("login_sign_in")}</span>
						{loading && <Spinner />}
					</button>
				</form>
				{/* <div className="mb-[10px] flex justify-center gap-[20px]">
          <button
            onClick={onXSignInHandler}
            className="transition-transform duration-300 hover:scale-[1.025]"
          >
            <Image
              src={IconX.src}
              width={IconX.width}
              height={IconX.height}
              alt="icon X"
            />
          </button> */}
				{/* <button
              onClick={onFacebookSignInHandler}
              className="transition-transform duration-300 hover:scale-[1.025]"
            >
              <Image
                src={IconFacebook.src}
                width={IconFacebook.width}
                height={IconFacebook.height}
                alt="icon discord"
              />
            </button> */}
				{/* <button
            onClick={onGoogleSignInHandler}
            className="transition-transform duration-300 hover:scale-[1.025]"
          >
            <Image
              src={IconGoogle.src}
              width={IconGoogle.width}
              height={IconGoogle.height}
              alt="icon google"
            />
          </button>
        </div> */}

				{/*/!* Поле Password *!/*/}
				{/*<div className="relative">*/}
				{/*  <label htmlFor="password" className="block text-[12px] pl-[16px] leading-[1.2em] mb-[8px]">Password</label>*/}
				{/*  <div className="relative">*/}
				{/*    <input*/}
				{/*      id="password"*/}
				{/*      placeholder="Enter password"*/}
				{/*      className={clsx("w-full bg-[#191B2C] px-[16px] rounded-[12px] h-[48px] text-[14px] border border-transparent font-medium leading-[1.5em] transition-all duration-300 focus:border-[#049AEF] placeholder-text:opacity-50 focus:outline-none outline-offset-0 focus:outline-offset-0", {*/}
				{/*        "!border-[#BD0000]": errors.password*/}
				{/*      })}*/}
				{/*      type={showPassword ? "text" : "password"}*/}
				{/*      {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}*/}
				{/*    />*/}
				{/*    <button*/}
				{/*      type="button"*/}
				{/*      className="absolute right-2 top-1/2 size-[32px] flex items-center justify-center  -translate-y-1/2 text-gray-400 hover:text-gray-200"*/}
				{/*      onClick={() => setShowPassword(!showPassword)}*/}
				{/*    >*/}
				{/*      {showPassword*/}
				{/*        ? <Image src={IconEye.src} width={IconEye.width} height={IconEye.height} alt="icon eye" />*/}
				{/*        :  <Image src={IconEye.src} width={IconEye.width} height={IconEye.height} alt="icon eye" />*/}
				{/*      }*/}
				{/*    </button>*/}
				{/*  </div>*/}
				{/*  {errors.password && <p className="text-[#BD0000] text-[12px] absolute right-0 top-0">{errors.password.message}</p>}*/}
				{/*</div>*/}

				{/*<div className="flex items-center justify-between mt-4 pb-[16px]">*/}
				{/*  /!* Toggle Switch *!/*/}
				{/*  <label className="flex items-center cursor-pointer">*/}
				{/*    <div className="relative">*/}
				{/*      <input*/}
				{/*        type="checkbox"*/}
				{/*        className="sr-only"*/}
				{/*        checked={isChecked}*/}
				{/*        onChange={() => setIsChecked(!isChecked)}*/}
				{/*      />*/}
				{/*      <div*/}
				{/*        className={clsx("w-[40px] h-[20px] bg-[#191B2C] rounded-full transition-all duration-300", {*/}
				{/*          "rememberMeButton before:pointer-events-none": isChecked*/}
				{/*        })}*/}
				{/*      ></div>*/}
				{/*      <div*/}
				{/*        className={clsx("absolute top-1/2 -translate-y-1/2 left-[2px] size-[16px] translate-x-0 rounded-full bg-[#303456] transition-bg duration-300" , {*/}
				{/*          "translate-x-5 !bg-white": isChecked*/}
				{/*        })}*/}
				{/*      ></div>*/}
				{/*    </div>*/}
				{/*    <span className="ml-3 text-white text-sm">Remember me</span>*/}
				{/*  </label>*/}

				{/*  /!* Forgot password *!/*/}
				{/*  <button*/}
				{/*    onClick={() => setAuthModal({ modalType: "forgotPass", isAuthModalActive: true })}*/}
				{/*    className="block text-blue-400 text-sm hover:underline"*/}
				{/*  >*/}
				{/*    Forgot password?*/}
				{/*  </button>*/}
				{/*</div>*/}

				{/*  Отображение ошибки авторизации */}

				<div className="flex flex-col items-center justify-center gap-[24px]">
					{/* <p className="text-[16px] font-medium text-[#B5B5B5]">
            or continue with
          </p> */}

					{/* <div className="flex gap-[8px] text-[12px]">
            <p>Dont have an account?</p>
            <Link
              href={process.env.NEXT_PUBLIC_QUIZ_URL ?? ""}
              className="logo-gradient"
            >
              Register now
            </Link>
          </div> */}
				</div>
			</div>
			<div className="h-hull relative w-full sm:hidden">
				<Image src={image} fill alt="image modal" className="object-cover" />
				<Link
					href="/"
					className="absolute bottom-[20px] left-[20px] block text-[34px] font-bold tracking-[0.04em] sm:text-[5.33vw]"
				>
					<span className="logo-gradient">Ai</span>
					<span className="">Go</span>
				</Link>
			</div>
		</div>
	);
};

export default Login;
