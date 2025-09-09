"use client";

import { useAuthStore } from "@/app/shared/store/authStore";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PaymentPlan } from "@/app/shared/api/payment";
import PaymentDiscountBanner from "@/app/widgets/Payment/PaymentDiscountBanner";
import Image from "next/image";
import ImageModalBuyTokens from "@/../public/images/img/image-buy-tokens.png";
import ImageModalBuyTokensMobile from "@/../public/images/img/image-buy-tokens-mobile.png";
import TokenPackages from "@/app/widgets/TokenPackages";
import TokenPackagesSkeleton from "@/app/widgets/TokenPackages/TokenPackagesSkeleton";
import SectionFooter from "./components/SectionFooter";
import TokenCosts from "@/app/widgets/TokensPage/TokenCosts";
import TokenAdvantages from "@/app/widgets/TokensPage/TokenAdvantages";
import Link from "next/link";
import Spinner from "@/app/widgets/Spinner";
import { sendGTMEvent } from "@next/third-parties/google";
import * as fbq from "@/app/shared/lib/fbPixel";
import ym from "react-yandex-metrika";
import { useTokensStore } from "@/app/shared/store/tokensStore";
import * as amplitude from "@amplitude/analytics-browser";
import { useProductsToBuyStore } from "@/app/shared/store/productsToBuyStore";
import { getTrustPayGatewayUrl } from "@/app/shared/api/trustPay";

const TokensPage = () => {
	const { characters, selectedCharacterId, setSelectedCharacterId } =
		useSelectedCardStore();
	const params = useParams();
	const { user } = useAuthStore();
  const { tokenPlans } = useProductsToBuyStore();
	const [tokenPackages, setTokenPackages] = useState<
    PaymentPlan[] | null
	>(null);
	const [loading, setLoading] = useState(false);
	const [selectedPackage, setSelectedPackage] =
		useState<PaymentPlan | null>(null);
	const [fullUrl, setFullUrl] = useState<string | null>(null);
	const { setSelectedTokensPlan } = useTokensStore();

	useEffect(() => {
		sendGTMEvent({
			event: "token_show",
			placement: "quiz",
			product_name: selectedPackage?.description
		});
		fbq.event("AddtoCart");
		ym("reachGoal", "token_show", {
			placement: "quiz",
			product_name: selectedPackage?.description
		});
		amplitude.track("token_show", {
			placement: "quiz",
			product_name: selectedPackage?.description,
			domain: window.location.hostname
		});
	}, []);

	const handleClickBuyAnalytics = () => {
		sendGTMEvent({
			event: "token_buy",
			placement: "quiz",
			product_name: selectedPackage?.description
		});
		fbq.event("InitiateCheckout");
		ym("reachGoal", "token_buy", {
			placement: "quiz",
			product_name: selectedPackage?.description
		});
		amplitude.track("token_buy", {
			placement: "quiz",
			product_name: selectedPackage?.description,
			domain: window.location.hostname
		});
	};

  const selectPackage = async (item: PaymentPlan | null) => {
    if (!item) return;

    setFullUrl(null);
    setSelectedPackage(item);
    const gatewayUrl = await getTrustPayGatewayUrl(item.id);
    setFullUrl(gatewayUrl)
  }

	useEffect(() => {
    setTokenPackages(tokenPlans())
    setSelectedPackage(tokenPlans()[1])
    getTrustPayGatewayUrl(tokenPlans()[1].id)
      .then(gatewayUrl => setFullUrl(gatewayUrl));


		if (Array.isArray(characters) && characters.length > 0) {
			const firstCharacter = characters[0];
			setSelectedCharacterId(firstCharacter.id);
		}
	}, []);

	return (
		<>
			<div className="block sm:hidden">
				<PaymentDiscountBanner />
			</div>
			<div className="bg-[#121423]">
				<div className="flex items-center justify-center">
					<p className="mb-[27px] mt-[24px] block font-bai-jamjuree text-[34px] font-semibold sm:hidden">
						Buy tokens
					</p>
				</div>
				<div className="relative hidden sm:block">
					<Image
						src={ImageModalBuyTokensMobile.src}
						width={ImageModalBuyTokensMobile.width}
						height={ImageModalBuyTokensMobile.height}
						alt="image modal"
						className="object-cover"
					/>
					<div className="absolute bottom-0 left-[16px] grid grid-rows-2">
						<span className="leading-1.3 text-[24px] font-semibold">
							Buy tokens
						</span>
						<span className="leading-1 text-[16px] font-medium">
							Enjoy a special package discount
							<br />
							available only now!
						</span>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-[16px] overflow-visible px-[20px] sm:flex sm:h-auto sm:flex-col sm:overflow-visible">
					<div className="sm:hidden">
						<Image
							src={ImageModalBuyTokens.src}
							width={ImageModalBuyTokens.width}
							height={ImageModalBuyTokens.height}
							alt="image modal"
							className="justify-self-end object-cover"
						/>
					</div>
					<div>
						<div className="mb-[8px] w-full rounded-[32px] bg-[#191B2C] px-[16px] py-[32px] sm:mb-[0px] sm:bg-inherit sm:px-0">
							<div className="mt-[-10px]">
								{tokenPackages && !loading ? (
									<TokenPackages
										tokenPackages={tokenPackages}
										setSelectedPackage={selectPackage}
										selectedPackage={selectedPackage?.description ?? ""}
									/>
								) : (
									<TokenPackagesSkeleton />
								)}
							</div>
							<div>
								{!fullUrl ? (
									<div className="mb-[12px] flex items-center justify-center">
										<Spinner className="h-8 w-8" />
									</div>
								) : (
									<Link
										onClick={handleClickBuyAnalytics}
										href={fullUrl}
                    target={"_blank"}
										className="main-gradient mb-[8px] flex h-[60px] w-full items-center justify-center gap-[5px] overflow-hidden rounded-[24px] disabled:pointer-events-none disabled:opacity-50"
									>
										<span className="relative z-[5] text-[15px] font-bold">
											Buy tokens
										</span>
										<span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
									</Link>
								)}
								<div className="mb-[20px] text-center">
									<span className="font-bai-jamjuree text-[12px] font-bold">
										🔥 100,756 tokens sold today 🔥
									</span>
								</div>
							</div>
							{/* <VivaPayComponent
                paymentSuccess={tokensPaymentSuccess}
                price={selectedPackage?.price ?? 0}
              /> */}
						</div>
						<SectionFooter className="mb-[80px] block sm:hidden" />
					</div>
					<div>
						<div className="h-fit rounded-[32px] bg-[#191B2C] p-[16px] sm:w-full">
							<TokenAdvantages />
							<TokenCosts />
						</div>
						<SectionFooter className="mb-[80px] hidden sm:block" />
					</div>
				</div>
			</div>
		</>
	);
};

export default TokensPage;
