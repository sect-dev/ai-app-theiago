"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import ImageArrow from "@/../public/images/icons/icon-payment-arrow.svg";
import { PaymentPlan } from "@/app/shared/api/payment";
import { calculateCostPerDay } from "@/app/shared/helpers";
import { sendGTMEvent } from "@next/third-parties/google";
import Link from "next/link";
import * as fbq from "@/app/shared/lib/fbPixel";

import ym from "react-yandex-metrika";
import { trackBuyButtonClick } from "@/app/shared/helpers/clickTracker";
import * as amplitude from "@amplitude/analytics-browser";
import log from "@/app/shared/lib/logger";
import { useTranslations } from "next-intl";
import { trackSubscriptionSelection } from "@/app/shared/lib/amplitude";
import IconSecure from "@/../public/images/icons/icon-payment-secure-shield.svg";
import IconCancel from "@/../public/images/icons/icon-cancel-anytime-cash.svg";
import { getTrustPayGatewayUrl } from "@/app/shared/api/trustPay";

interface ComponentProps {
	paymentPlans: PaymentPlan[];
	isOrganic?: boolean;
}

const SectionPlans: FC<ComponentProps> = ({ paymentPlans, isOrganic }) => {
	const [selectedPlan, setPlan] = useState(2);
	const [selectedPrice, setSelectedPrice] = useState<PaymentPlan | null>(null);
	const [gatewayUrl, setGatewayUrl] = useState<string>("");
	const t = useTranslations("Paywall");

	const additionalInfo = [
		t("plan_unlimited_dialogues"),
		t("plan_300_photos"),
		t("plan_nsfw_support"),
		t("plan_create_your_own_girlfriends"),
		t("plan_video_and_audio_content")
	];

	useEffect(() => {
		if (paymentPlans && paymentPlans.length > 0) {
			setSelectedPrice(paymentPlans[1]);
			setPlan(paymentPlans[1].id ?? 1);

      getTrustPayGatewayUrl(paymentPlans[1].id).then(gatewayUrl => setGatewayUrl(gatewayUrl));
		}
	}, [paymentPlans]);

	const handleClickBuy = async () => {
		log.debug(
			"SectionPayments.tsx",
			"sending analytics to paywall_buy:: ",
			selectedPlan
		);
		await trackBuyButtonClick();

		sendGTMEvent({
			event: "paywall_buy",
			placement: "quiz",
			product_name: selectedPlan
		});
		fbq.event("InitiateCheckout");
		ym("reachGoal", "paywall_buy", {
			placement: "quiz",
			product_name: selectedPlan
		});
		amplitude.track("paywall_buy", {
			placement: "quiz",
			product_name: selectedPlan,
			domain: window.location.hostname
		});
	};

	const paymentHandle = (item: PaymentPlan) => {
		if (item.id === selectedPlan) return;

		setSelectedPrice(item);
		setPlan(item.id);
    getTrustPayGatewayUrl(item.id)
      .then(gatewayUrl => setGatewayUrl(gatewayUrl));

		log.debug(
			"SectionPlans.tsx",
			"sending analytics to switch_plan_click:: ",
			item.id
		);

		const paymentSystem =
			new URLSearchParams(window.location.search).get("payment_system") ||
			"unknown";
		trackSubscriptionSelection(String(item.id) || "unknown", paymentSystem);

		sendGTMEvent({ event: "switch_plan_click", type: `${item.id}` });
		// setPlan(item.id ?? paymentPlans[1].id ?? "1_month_premium_access");
		// setPrice(item.amount_recurring);
		ym("reachGoal", "switch_plan_click", {
			placement: "quiz",
			type: `${item.id}`
		});
		amplitude.track("switch_plan_click", {
			placement: "quiz",
			type: `${item.id}`,
			domain: window.location.hostname
		});
	};

	return (
		<div>
			<div className="mb-[24px] space-y-[12px]">
				{paymentPlans.map((item) => {

          let days;
          switch (item.interval_unit) {
            case "day":
            case "days":
              days = 1;
              break;
            case "week":
              days = 7;
              break;
            case "month":
            case "months":
              days = 30;
              break;
            case "year":
              days = 365;
              break;
            default:
              days = 0;
          }
					days = days * item.interval_length;
					const fullPricePerDay = calculateCostPerDay(
						+item.amount_recurring,
						days
					);
					const discountPricePerDay = calculateCostPerDay(
						+item.amount_initial,
						days
					);


					const firstLetterDiscountPrice = fullPricePerDay
						.toString()
						.split(".")[0];
					const discountPriceWithoutFirstLetter = discountPricePerDay
						.toString()
						.split(".")[1];
					return (
						<div
							onClick={() => paymentHandle(item)}
							key={item.id}
							className={clsx(
								"relative cursor-pointer rounded-[24px] bg-[#2B2D44] p-[16px] before:z-[1] before:rounded-[24px] before:opacity-0 fm:rounded-[24px] fm:p-[24px] fm:before:rounded-[24px]",
								{
									"init-page-gradient-border-blue": isOrganic,
									"init-page-gradient-border": !isOrganic,
									"hover:shadow-card-shadow hover:before:opacity-100":
										!isOrganic && selectedPrice?.id !== item.id,
									"hover:shadow-blue-shadow hover:before:opacity-100":
										isOrganic && selectedPrice?.id !== item.id,
									"bg-blue-card-gradient": isOrganic,
									"bg-pink-card-gradient": !isOrganic,
									"shadow-card-shadow before:opacity-100":
										!isOrganic && selectedPrice?.id === item.id,
									"shadow-blue-shadow before:opacity-100":
										isOrganic && selectedPrice?.id === item.id
								}
							)}
						>
							<div
								className={clsx("flex items-center justify-between", {
									"pt-[12px] fm:pt-[3.20vw]": selectedPrice?.id === item.id
								})}
							>
								<div>
									<p className="text-[16px] font-semibold leading-[1.5em] fm:text-[4.27vw]">
										{item.interval_length} {item.interval_unit}
									</p>
									<div className="flex items-center gap-[4px] font-asap text-[12px] fm:gap-[1.07vw] fm:text-[3.20vw]">
										<p className="relative">
											<span className="uppercase opacity-40">
												{item.currency} {item.amount_recurring}
											</span>
											<span
												className={clsx(
													"absolute left-0 top-1/2 z-[5] h-[2px] w-full -translate-y-1/2",
													isOrganic
														? "bg-blue-button-gradient"
														: "bg-button-gradient"
												)}
											/>
										</p>
										<Image
											src={ImageArrow.src}
											width={ImageArrow.width}
											height={ImageArrow.height}
											alt="arrow"
										/>
										<p>
											<span className="uppercase opacity-40">
												{item.currency} {item.amount_initial}
											</span>
										</p>
									</div>
								</div>
								{item.kind === 'subscription'
                	?
									<div className="flex items-end gap-[6px] font-asap leading-[1.5em] fm:gap-[1.60vw]">
										<p className="flex items-center gap-[4px]">
										<span className="text-[12px] font-semibold uppercase fm:text-[3.20vw]">
											{item.currency}
										</span>
											<span className="relative text-[12px] fm:text-[3.20vw]">
											<span className="opacity-40">{fullPricePerDay}</span>
											<span
												className={clsx(
													"absolute left-0 top-1/2 z-[5] h-[2px] w-full -translate-y-1/2",
													isOrganic
														? "bg-blue-button-gradient"
														: "bg-button-gradient"
												)}
											/>
										</span>
										</p>
										<p>
										<span className="text-[12px] font-semibold leading-[1.3em] fm:text-[3.20vw]">
											<span className="text-[24px] fm:text-[6.40vw]">
												{firstLetterDiscountPrice}
											</span>
											<span>,{discountPriceWithoutFirstLetter}</span>
										</span>
											<span className="text-[12px] opacity-40 fm:text-[3.20vw]">
											{" "}
												/ day
										</span>
										</p>
									</div>
									:
									<div className="flex items-end gap-[6px] font-asap leading-[1.5em] fm:gap-[1.60vw]">
										<p className="flex items-center gap-[4px]">
											<span className="text-[12px] font-semibold uppercase fm:text-[3.20vw]">
												{item.currency}
											</span>
											<span className="text-[12px] font-semibold leading-[1.3em] fm:text-[3.20vw]">
												<span className="text-[24px] fm:text-[6.40vw]">
													{item.amount_recurring}
												</span>
											</span>
										</p>

									</div>
								}
							</div>
							<div className="pt-[12px] fm:pt-[3.20vw]">
								<button className="flex w-full items-center justify-between font-asap text-[13px] fm:text-[3.47vw]">
									{t("plan_learn_more")}
									{/* <Image
                    src={IconExpand.src}
                    width={IconExpand.width}
                    height={IconExpand.height}
                    alt="icon arrow"
                    className="fm:h-[3.20vw] fm:w-[6.40vw]"
                  /> */}
								</button>
								{selectedPrice?.id === item.id && (
									<div className="animate-fadeIn">
										<ul className="space-y-[6px] py-[12px] fm:space-y-[1.60vw] fm:py-[3.20vw]">
											{additionalInfo.map((item, index) => {
												return (
													<li
														key={index}
														className="text-[14px] font-medium fm:text-[3.73vw]"
													>
														{item}
													</li>
												);
											})}
										</ul>
										<Link
											href={gatewayUrl ?? ""}
                      target={"_blank"}
											onClick={handleClickBuy}
											className={clsx(
												"relative mb-[12px] flex h-[60px] w-full items-center justify-center gap-[5px] overflow-hidden rounded-[24px] text-center text-white disabled:opacity-50 fm:h-[16vw] fm:rounded-[6.40vw]",
												isOrganic
													? "bg-blue-button-gradient shadow-blue-shadow"
													: "bg-button-gradient shadow-pink-shadow"
											)}
										>
											<span className="font-noto-sans text-[14px] font-bold uppercase fm:text-[3.73vw]">
												{isOrganic
													? t("plan_choose_plan")
													: t("plan_get_your_girlfriend")}
											</span>
											<span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
										</Link>

										<div className="flex items-center justify-center gap-[12px]">
											<div className="flex gap-[1.5px]">
												<Image
													src={IconSecure.src}
													alt="icon secure"
													width={IconSecure.width}
													height={IconSecure.height}
												/>
												<span className="text-[12px] font-semibold">
													Secured payment
												</span>
											</div>
											<div className="flex gap-[1.5px]">
												<Image
													src={IconCancel.src}
													alt="icon secure"
													width={IconCancel.width}
													height={IconCancel.height}
												/>
												<span className="text-[12px] font-semibold">
													Cancel anytime
												</span>
											</div>
										</div>
									</div>
								)}
							</div>
							{item.id === selectedPrice?.id && (
								<div
									className={clsx(
										"absolute left-0 top-0 flex h-[17px] w-full animate-fadeIn items-center justify-center rounded-t-[24px] fm:h-[4.53vw] fm:rounded-t-[24px]",
										isOrganic ? "bg-blue-button-gradient" : "bg-button-gradient"
									)}
								>
									<span className="text-[11px] font-bold uppercase fm:text-[2.93vw]">
										{t("plan_most_popular")}
									</span>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SectionPlans;
