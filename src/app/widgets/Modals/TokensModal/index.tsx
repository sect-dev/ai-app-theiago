"use client";
import React, { useEffect, useState, useTransition } from "react";
import Image, { StaticImageData } from "next/image";
import { Dialog, DialogPanel } from "@headlessui/react";
// import ImageModal from "@/../public/images/img/image-modal.webp";
import ImageModalBuyTokens from "@/../public/images/img/image-buy-tokens.png";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import ImageDecor1 from "@/../public/images/icons/payment/icon-decor1.png";
// import SectionWithSwiper from "@/app/flat-pages/Initpage/components/SectionWithSwiper";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import IcnCoins from "@/../public/images/icons/icon-coins.svg";
import { getTokenPackageInfo } from "@/app/shared/api/payment";
import { useParams, useRouter } from "next/navigation";
import IconClose from "@/../public/images/icons/icon-modal-close.svg";
import { StrictTokenPackage } from "@/app/shared/api/types/payment";
import TokenPackages from "@/app/widgets/TokenPackages";
import TokenPackagesSkeleton from "@/app/widgets/TokenPackages/TokenPackagesSkeleton";
import { PreparedAvatar } from "@/app/shared/api/types";
import clsx from "clsx";
import { useAuthStore } from "@/app/shared/store/authStore";
import notification from "@/app/widgets/Notification";
import Spinner from "@/app/widgets/Spinner";
import TokensPayForm from "../../TokensPage/TokensPayForm";
import TokenCosts from "../../TokensPage/TokenCosts";
import TokenAdvantages from "../../TokensPage/TokenAdvantages";
import SectionFooter from "@/app/flat-pages/Initpage/components/SectionFooter";
import Link from "next/link";
import ImageMastercard from "@/../public/images//icons/payment/1.png";
import ImageVisa from "@/../public/images/icons/payment/2.png";
import ImageStripe from "@/../public/images/icons/payment/3.svg";
import ImageMc from "@/../public/images/icons/payment/4.svg";

const TokensModal = () => {
	const { characters, selectedCharacterId, setSelectedCharacterId } =
		useSelectedCardStore();
	const params = useParams();
	const navigate = useRouter();
	const { isTokensModalActive, setTokensModal, tokens } = usePaymentStore();
	const { user } = useAuthStore();
	const [tokenPackages, setTokenPackages] = useState<
		StrictTokenPackage[] | null
	>();
	const [characterImage, setCharacterImage] = useState("");
	const [loading, setLoading] = useState(false);
	const [selectedPackage, setSelectedPackage] =
		useState<StrictTokenPackage | null>(null);
	const [fullUrl, setFullUrl] = useState<string | null>(null);

	const getTokenPackages = async () => {
		setLoading(true);
		try {
			const resp = await getTokenPackageInfo();
			if (resp) {
				setSelectedPackage(resp[1]);
				return setTokenPackages(resp);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getTokenPackages();
		// if (params?.id && characters) {
		//   console.log(characterId)
		//   const characterId = Number(params.id);
		//   if (!isNaN(characterId)) {
		//     const currentCharacter = characters.find(
		//       (item: PreparedAvatar) =>
		//         item.id !== undefined && Number(item.id) === characterId,
		//     );
		//     console.log(currentCharacter)
		//     setCharacterImage(currentCharacter?.image ?? "");
		//   }
		// }

		if (Array.isArray(characters) && characters.length > 0) {
			const firstCharacter = characters[0];
			setSelectedCharacterId(firstCharacter.id);
		}
	}, []);

	// const buyTokensHandler = async () => {
	//   try {
	//     const packageName = selectedPackage.split(" ").join("_");
	//     console.log(packageName)
	//     if ((user && !user?.email) || !user) {
	//       return notification.open({
	//         title: "Error",
	//         type: "error",
	//         description: "To buy tokens, you need to authorize",
	//       });
	//     }
	//     // const resp = await buyTokens(packageName, user.uid, user?.email ?? '')
	//     startTransition(() => {
	//       navigate.push(
	//         `${process.env.NEXT_PUBLIC_API_URL}/tokens_purchase?name=${packageName}&user_id=${user.uid}&email=${user?.email}&character_id=${selectedCharacterId}`,
	//       );
	//     });
	//   } catch (error) {
	//     console.log(error);
	//   }
	// };

	// TODO: переписать на URLParams
	useEffect(() => {
		if (!selectedPackage || !user) return;

		const packageName = selectedPackage.description.split(" ").join("_");
		const apiBase = process.env.NEXT_PUBLIC_API_URL;

		if (apiBase) {
			let fullUrl;

			if (selectedCharacterId === null) {
				fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/tokens_purchase?name=${packageName}&user_id=${user.uid}&email=${user?.email}`;
			} else {
				fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/tokens_purchase?name=${packageName}&user_id=${user.uid}&email=${user?.email}&character_id=${selectedCharacterId}`;
			}

			if (fullUrl) {
				console.log(fullUrl);
				setFullUrl(fullUrl);
			}
		}
	}, [selectedPackage, user, params?.id]);

	// useEffect(() => {
	//   setIframe("")
	// }, [packageName])

	// const fullUrl = "https://stage-payments.theaigo.com:8000/tokens_purchase?name=1100_tokens&user_id=kqRBW7kADSOkTpClwkMK4nqWHdA3&email=lancecnc1@gmail.com&character_id=character_id=constructor_0680f42e-0cb5-7128-8000-cbcc7da3857d"

	// const image = characterImage ? characterImage : ImageModalBuyTokens.src;

	return (
		<Dialog
			open={isTokensModalActive}
			as="div"
			className="relative z-[50] focus:outline-none"
			onClose={() => setTokensModal(false)}
		>
			<div className="font-lato fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center">
					<DialogPanel
						transition
						className="data-[closed]:transform-[scale(95%)] flex h-screen w-full items-center justify-center bg-[#121423] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0"
					>
						<div className="flex h-full w-screen flex-col items-center justify-center">
							<div className="relative mx-auto h-[550px] w-full sm:size-full sm:overflow-x-hidden sm:bg-[#121423]">
								<div className="success-payment-bg relative hidden h-[400px] w-full sm:block">
									<Image
										src={ImageModalBuyTokens.src}
										fill
										alt="image modal"
										className="object-cover"
									/>
								</div>
								<div className="relative sm:static">
									{/* <button
                    onClick={() => setTokensModal(false)}
                    className="absolute z-[10] right-[20px] flex items-center justify-center top-[20px] bg-[#191B2C] rounded-[12px] size-[32px] sm:right-auto sm:left-[20px] sm:top-[20px]"
                  >
                    <Image
                      src={IconClose.src}
                      width={IconClose.width}
                      height={IconClose.height}
                      alt="icon close"
                    />
                  </button> */}
									<div className="flex items-center justify-center">
										<p className="mb-[27px] block font-bai-jamjuree text-[34px] font-semibold sm:hidden">
											Buy tokens
										</p>
									</div>
									<div className="grid grid-cols-3 gap-[16px] overflow-hidden rounded-[24px] bg-[#121423] px-[72px] sm:flex sm:h-auto sm:flex-col sm:overflow-visible sm:px-[16px]">
										<div className="sm:hidden">
											<Image
												src={ImageModalBuyTokens.src}
												width={ImageModalBuyTokens.width}
												height={ImageModalBuyTokens.height}
												alt="image modal"
												className="justify-self-end object-cover"
											/>
										</div>
										<div className="w-full sm:relative sm:z-[5] sm:mt-[-200px] sm:flex sm:h-full sm:flex-col sm:items-center sm:justify-center">
											<div className="mb-[14px] hidden space-y-[8px] pb-[24px] font-bai-jamjuree sm:block sm:w-full sm:space-y-[2.13vw]">
												<div className="mb-[16px] space-y-[12px]">
													<div className="px-[16px] sm:px-0">
														<p className="text-[24px] font-semibold leading-[1.3]">
															<span>Buy tokens</span>
														</p>
														<p className="max-w-[80%] text-[16px] font-medium">
															Enjoy a special package discount available only
															now!
														</p>
													</div>
												</div>
											</div>

											<div className="mb-[8px] w-full rounded-[32px] bg-[#191B2C] px-[16px] py-[32px] sm:mb-[0px] sm:bg-inherit sm:px-0">
												<div className="mt-[-10px]">
													{tokenPackages && !loading ? (
														<TokenPackages
															tokenPackages={tokenPackages}
															setSelectedPackage={setSelectedPackage}
															selectedPackage={
																selectedPackage?.description ?? ""
															}
														/>
													) : (
														<TokenPackagesSkeleton />
													)}
													{/*<SectionWithSwiper className="!h-[166px] fm:!h-[55.87vw] !rounded-[12px]" slidesPerView={2.2} images={selectedCard?.listImage ?? null} />*/}
												</div>
												<button
													onClick={() => {}}
													disabled={!tokenPackages && loading}
													className="main-gradient mb-[8px] flex h-[60px] w-full items-center justify-center gap-[5px] overflow-hidden rounded-[24px] disabled:pointer-events-none disabled:opacity-50"
												>
													<span className="relative z-[5] text-[15px] font-bold">
														Buy tokens
													</span>
													<span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
												</button>
												<div className="mb-[20px] text-center">
													<span className="font-bai-jamjuree text-[12px] font-bold">
														🔥 100,756 tokens sold today 🔥
													</span>
												</div>

												{fullUrl && <TokensPayForm fullUrl={fullUrl} />}
											</div>
											<div className="mx-auto block overflow-hidden pb-[10px] pt-[20px] text-center font-bai-jamjuree sm:hidden sm:max-w-[91vw] sm:pb-[2.778vw] sm:pt-[5.56vw]">
												<div className="mb-[15px] flex items-center gap-[10px]">
													<input
														type="checkbox"
														defaultChecked
														name="ssd"
														className={clsx(
															'size-[26px] shrink-0 cursor-pointer appearance-none rounded-[8px] border border-[#5E56E7] border-[#8E59FF] bg-transparent bg-[3px] bg-center bg-no-repeat before:!rounded-[5px] checked:bg-[url("/images/icons/payment/check.svg")]',
															{}
														)}
													/>
													<p className="text-left text-[12px] font-medium leading-[1.2em] tracking-[-0.04em] text-[#6D6D6D]">
														By completing this transaction you certify that you
														are 18 years or older and agree to our
														<span className="text-gradient !inline bg-button-gradient bg-clip-text text-transparent">
															{" "}
															Privacy Policy, Terms of Use and Cacellation
															Policy
														</span>
													</p>
												</div>
												<p className="text-center text-[12px] font-medium leading-[1.2em] tracking-[-0.04em] text-[#6D6D6D] sm:text-[3.333vw]">
													The charges on your credit card statement will appear
													as DevSect
												</p>
												<div className="pb-[0.6px] pt-[0.6vw] sm:pt-[3.5]">
													<div className="mx-auto max-w-[330px]">
														<div className="mb-[1.25vw] flex justify-center gap-[1vw] sm:mb-[3.89vw] sm:gap-[2.22vw]">
															<div className="flex h-[2.5vw] w-[4.5vw] items-center justify-center overflow-hidden rounded-[0.4vw] border-[1px] border-[#D9D9D9] bg-[#fff] sm:h-[10.83vw] sm:w-[16.11vw] sm:rounded-[2.78vw]">
																<Image
																	src={ImageMastercard.src}
																	width={ImageMastercard.width}
																	height={ImageMastercard.height}
																	alt="Image Mastercard"
																	className="sm:h-[5.28vw] sm:w-[14.72vw]"
																/>
															</div>
															<div className="flex h-[2.5vw] w-[4.5vw] items-center justify-center overflow-hidden rounded-[0.4vw] border-[1px] border-[#D9D9D9] bg-[#fff] sm:h-[10.83vw] sm:w-[16.11vw] sm:rounded-[2.78vw]">
																<Image
																	src={ImageVisa.src}
																	width={ImageVisa.width}
																	height={ImageVisa.height}
																	alt="Image Stripe"
																	className="sm:h-[5.28vw] sm:w-[14.72vw]"
																/>
															</div>
															<div className="flex h-[2.5vw] w-[4.5vw] items-center justify-center overflow-hidden rounded-[0.4vw] border-[1px] border-[#D9D9D9] bg-[#fff] sm:h-[10.83vw] sm:w-[16.11vw] sm:rounded-[2.78vw]">
																<Image
																	src={ImageStripe.src}
																	width={ImageStripe.width}
																	height={ImageStripe.height}
																	alt="Image Stripe"
																	className="sm:h-[5.28vw] sm:w-[14.72vw]"
																/>
															</div>
															<div className="flex h-[2.5vw] w-[4.5vw] items-center justify-center overflow-hidden rounded-[0.4vw] border-[1px] border-[#D9D9D9] bg-[#fff] sm:h-[10.83vw] sm:w-[16.11vw] sm:rounded-[2.78vw]">
																<Image
																	src={ImageMc.src}
																	width={ImageMc.width}
																	height={ImageMc.height}
																	alt="Image Stripe"
																	className="sm:h-[3.33vw] sm:w-[11.11vw]"
																/>
															</div>
														</div>
														<p className="mb-[8px] text-[12px] leading-[1.2em] text-[#6D6D6D] sm:mb-[2vw] sm:text-[3.333vw]">
															New Verve Limited <br /> 86–90 Paul Street,
															London, England, EC2A 4NE
														</p>
													</div>
												</div>

												<div className="flex items-center justify-between gap-[5px] text-[14px] font-medium sm:text-[3.889vw]">
													<Link
														className="border-b-[1px] border-b-transparent transition-all duration-300 hover:border-b-white"
														href="https://app.theaigo.com/terms"
													>
														Terms of use
													</Link>
													<Link
														className="border-b-[1px] border-b-transparent transition-all duration-300 hover:border-b-white"
														href="https://app.theaigo.com/privacy"
													>
														Privacy
													</Link>
													<Link
														className="border-b-[1px] border-b-transparent transition-all duration-300 hover:border-b-white"
														href="https://app.theaigo.com/cancellation"
													>
														Cancellation policy
													</Link>
												</div>
											</div>
										</div>
										<div className="h-fit w-[365px] rounded-[32px] bg-[#191B2C] p-[16px] sm:w-full">
											<TokenAdvantages />
											<TokenCosts />
										</div>
										<div className="mx-auto hidden overflow-hidden pb-[10px] pt-[20px] text-center font-bai-jamjuree sm:block sm:max-w-[91vw] sm:pb-[2.778vw] sm:pt-[5.56vw]">
											<div className="mb-[15px] flex items-center gap-[10px]">
												<input
													type="checkbox"
													defaultChecked
													name="ssd"
													className={clsx(
														'size-[26px] shrink-0 cursor-pointer appearance-none rounded-[8px] border border-[#5E56E7] border-[#8E59FF] bg-transparent bg-[3px] bg-center bg-no-repeat before:!rounded-[5px] checked:bg-[url("/images/icons/payment/check.svg")]',
														{}
													)}
												/>
												<p className="text-left text-[12px] font-medium leading-[1.2em] tracking-[-0.04em] text-[#6D6D6D]">
													By completing this transaction you certify that you
													are 18 years or older and agree to our
													<span className="text-gradient !inline bg-button-gradient bg-clip-text text-transparent">
														{" "}
														Privacy Policy, Terms of Use and Cacellation Policy
													</span>
												</p>
											</div>
											<p className="text-center text-[12px] font-medium leading-[1.2em] tracking-[-0.04em] text-[#6D6D6D] sm:text-[3.333vw]">
												The charges on your credit card statement will appear as
												DevSect
											</p>
											<div className="pb-[0.6px] pt-[0.6vw] sm:pt-[3.5]">
												<div className="mx-auto max-w-[330px]">
													<div className="mb-[1.25vw] flex justify-center gap-[1vw] sm:mb-[3.89vw] sm:gap-[2.22vw]">
														<div className="flex h-[2.5vw] w-[4.5vw] items-center justify-center overflow-hidden rounded-[0.4vw] border-[1px] border-[#D9D9D9] bg-[#fff] sm:h-[10.83vw] sm:w-[16.11vw] sm:rounded-[2.78vw]">
															<Image
																src={ImageMastercard.src}
																width={ImageMastercard.width}
																height={ImageMastercard.height}
																alt="Image Mastercard"
																className="sm:h-[5.28vw] sm:w-[14.72vw]"
															/>
														</div>
														<div className="flex h-[2.5vw] w-[4.5vw] items-center justify-center overflow-hidden rounded-[0.4vw] border-[1px] border-[#D9D9D9] bg-[#fff] sm:h-[10.83vw] sm:w-[16.11vw] sm:rounded-[2.78vw]">
															<Image
																src={ImageVisa.src}
																width={ImageVisa.width}
																height={ImageVisa.height}
																alt="Image Stripe"
																className="sm:h-[5.28vw] sm:w-[14.72vw]"
															/>
														</div>
														<div className="flex h-[2.5vw] w-[4.5vw] items-center justify-center overflow-hidden rounded-[0.4vw] border-[1px] border-[#D9D9D9] bg-[#fff] sm:h-[10.83vw] sm:w-[16.11vw] sm:rounded-[2.78vw]">
															<Image
																src={ImageStripe.src}
																width={ImageStripe.width}
																height={ImageStripe.height}
																alt="Image Stripe"
																className="sm:h-[5.28vw] sm:w-[14.72vw]"
															/>
														</div>
														<div className="flex h-[2.5vw] w-[4.5vw] items-center justify-center overflow-hidden rounded-[0.4vw] border-[1px] border-[#D9D9D9] bg-[#fff] sm:h-[10.83vw] sm:w-[16.11vw] sm:rounded-[2.78vw]">
															<Image
																src={ImageMc.src}
																width={ImageMc.width}
																height={ImageMc.height}
																alt="Image Stripe"
																className="sm:h-[3.33vw] sm:w-[11.11vw]"
															/>
														</div>
													</div>
													<p className="mb-[8px] text-[12px] leading-[1.2em] text-[#6D6D6D] sm:mb-[2vw] sm:text-[3.333vw]">
														New Verve Limited <br /> 86–90 Paul Street, London,
														England, EC2A 4NE
													</p>
												</div>
											</div>

											<div className="flex items-center justify-between gap-[5px] text-[14px] font-medium sm:text-[3.889vw]">
												<Link
													className="border-b-[1px] border-b-transparent transition-all duration-300 hover:border-b-white"
													href="https://app.theaigo.com/terms"
												>
													Terms of use
												</Link>
												<Link
													className="border-b-[1px] border-b-transparent transition-all duration-300 hover:border-b-white"
													href="https://app.theaigo.com/privacy"
												>
													Privacy
												</Link>
												<Link
													className="border-b-[1px] border-b-transparent transition-all duration-300 hover:border-b-white"
													href="https://app.theaigo.com/cancellation"
												>
													Cancellation policy
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default TokensModal;
