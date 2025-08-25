import IconRedAlert from "@/../public/images/icons/icon-red-alert-sign.svg";
import CountDownTimer from "@/app/widgets/CountDownTimer";
import { MenuSeparator } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import IconCheck from "@/../public/images/icons/icon-purple-check.svg";
import { useTranslations } from "next-intl";

interface Props {
	isOrganic?: boolean;
}

const DiscountComponent = (props: Props) => {
	const { isOrganic } = props;
	const [isVisible, setIsVisible] = useState(true);
	const t = useTranslations("Paywall");

	if (!isVisible) return null;

	return (
		<div
			className={clsx(
				"mb-[24px] rounded-[24px] bg-[#2B2D44] p-[16px]",
				isOrganic ? "bg-blue-card-gradient" : "bg-pink-card-gradient"
			)}
		>
			<div className="mb-[10px] flex gap-[10px]">
				<Image
					src={IconRedAlert.src}
					alt="icon red alert"
					width={IconRedAlert.width}
					height={IconRedAlert.height}
				/>
				<div className="flex flex-col">
					<span className="text-[16px] font-semibold">
						{t("advantages_your_discount_is_valid_for_5_minutes")}
					</span>
					<span className="text-[16px] font-semibold">
						{t("advantages_then")}
						<span className="text-[#F00928]">
							{t("advantages_then_your_girlfriend_will_disappear")}
						</span>
					</span>
				</div>
			</div>
			<MenuSeparator className="my-1 mb-[24px] h-px bg-menu-separator" />
			<div className="grid grid-cols-[2fr_3fr] gap-[10px]">
				<div>
					<CountDownTimer
						setIsVisible={setIsVisible}
						isVisible={isVisible}
						className="h-full rounded-[12px] !bg-red-gradient px-[25px] py-[6px] text-[22px] font-semibold text-white before:opacity-0 fm:h-[12vw] fm:rounded-[1.87vw] fm:px-[6.67vw] fm:text-[5.87vw]"
					/>
				</div>
				<div
					className={clsx(
						"flex items-center gap-[4px] rounded-[7px] bg-[#121423] px-[13px] py-[10px]"
					)}
				>
					<Image
						src={IconCheck.src}
						width={IconCheck.width}
						height={IconCheck.height}
						alt="icon check"
					/>
					<span
						className={clsx(
							"font-bai-jamjuree text-[16px] font-semibold uppercase"
						)}
					>
						code312
					</span>
				</div>
			</div>
		</div>
	);
};

export default DiscountComponent;
