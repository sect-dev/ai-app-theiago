"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import IconAlert from "@/../public/images/icons/icon-alert.svg";
import IconCheck from "@/../public/images/icons/icon-check.svg";
import CountDownTimer from "@/app/widgets/CountDownTimer";
import clsx from "clsx";

interface ComponentProps {
	isMobileVersion?: boolean;
}

const PaymentDiscountBanner: FC<ComponentProps> = ({ isMobileVersion }) => {
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) return null;

	return (
		<div
			className={clsx(
				"banner-bg relative w-full animate-fadeIn bg-[#191B2C] py-[5px]",
				{
					"overflow-hidden rounded-[6.40vw] bg-[#8F59FF4F] !py-[3.20vw] px-[4.27vw] !pb-[4.27vw]":
						isMobileVersion
				}
			)}
		>
			<span
				className={clsx("hidden", {
					"absolute left-0 top-1/2 !block size-[8.53vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#121423]":
						isMobileVersion
				})}
			/>
			<span
				className={clsx("hidden", {
					"absolute right-0 top-1/2 !block size-[8.53vw] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#121423]":
						isMobileVersion
				})}
			/>
			<div
				className={clsx("flex items-center justify-center gap-[8px]", {
					"flex-col justify-start gap-[2.13vw]": isMobileVersion
				})}
			>
				<div className="flex items-center gap-[5px]">
					<Image
						src={IconAlert.src}
						width={IconAlert.width}
						height={IconAlert.height}
						alt="icon alert"
						className={clsx("", { "size-[6.40vw] shrink-0": isMobileVersion })}
					/>
					<p
						className={clsx("font-bai-jamjuree text-[12px] font-semibold", {
							"text-[4.27vw] font-semibold leading-[1.5em]": isMobileVersion
						})}
					>
						Your discount is valid for 5 minutes.
						<span className={clsx("hidden", { "!block": isMobileVersion })}>
							Then <span className="">your girlfriend will disappear</span>
						</span>
					</p>
				</div>
				<div
					className={clsx("flex items-center gap-[8px]", {
						"mt-[3.20vw] gap-[2.13vw] border-t border-[#8E59FF] pt-[6.40vw]":
							isMobileVersion
					})}
				>
					<div
						className={clsx(
							"flex h-[24px] items-center gap-[4px] rounded-[7px] bg-[#121423] px-[7px]",
							{
								"order-[2] !h-[12vw] w-[46.13vw] !rounded-[1.87vw] !bg-[#121423] px-[3.20vw]":
									isMobileVersion
							}
						)}
					>
						<Image
							src={IconCheck.src}
							width={IconCheck.width}
							height={IconCheck.height}
							alt="icon check"
							className={clsx("", { "size-[4.27vw]": isMobileVersion })}
						/>
						<span
							className={clsx(
								"font-bai-jamjuree text-[12px] font-semibold uppercase",
								{
									"text-[4.27vw] font-semibold text-white": isMobileVersion
								}
							)}
						>
							code312
						</span>
					</div>
					<CountDownTimer
						setIsVisible={setIsVisible}
						isVisible={isVisible}
						className="text-white fm:h-[12vw] fm:rounded-[1.87vw] fm:!bg-red-gradient fm:px-[6.67vw] fm:text-[5.87vw] fm:before:opacity-0"
					/>
				</div>
			</div>
		</div>
	);
};

export default PaymentDiscountBanner;
