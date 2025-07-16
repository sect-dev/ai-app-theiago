import BecomeAffiliateButton from "./BecomeAffiliateButton";
import ImageBanner from "@/../public/images/img/image-affiliate-banner.png";
import ImageBannerSmall from "@/../public/images/img/image-affiliate-banner-small.png";
import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface Props {
	className?: string;
}

const AffiliateBanner = (props: Props) => {
	const { className } = props;
	const t = useTranslations("AffiliatePage");
	return (
		<div
			className={clsx(
				"ml-[4px] grid h-[219px] w-full grid-cols-[auto_auto] justify-between overflow-hidden rounded-bl-[24px] rounded-tl-[24px] bg-[#121423] bg-blue-layered-gradient md:m-0 md:h-full md:rounded-[24px]",
				className
			)}
		>
			<div className="flex w-full flex-col py-[24px] pl-[24px] md:p-[16px]">
				<div className="mb-[24px] flex max-w-[515px] flex-col gap-[10px] sm:max-w-[311px]">
					<Image
						src={ImageBannerSmall}
						alt="affiliate banner"
						className="hidden sm:block"
					/>
					<span className="text-[34px] font-semibold leading-[130%] tracking-wide sm:text-[24px]">
						{t("affiliate_banner_title")}
					</span>
					<span className="text-[14px] font-semibold leading-[16px] text-[#9DB2CE]">
						{t("affiliate_banner_desc")}
					</span>
				</div>

				<BecomeAffiliateButton />
			</div>

			<div className="relative lgm:hidden">
				<Image
					src={ImageBanner}
					alt="affiliate banner"
					className="object-cover"
				/>
			</div>
		</div>
	);
};

export default AffiliateBanner;
