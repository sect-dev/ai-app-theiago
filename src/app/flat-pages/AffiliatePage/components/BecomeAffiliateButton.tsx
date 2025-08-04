import { AFFILIATE_FORM_URL } from "@/app/shared/consts";
import Link from "next/link";
import { useTranslations } from "next-intl";

const BecomeAffiliateButton = () => {
	const t = useTranslations("AffiliatePage");
	return (
		<Link href={AFFILIATE_FORM_URL} target="_blank">
			<button className="relative mb-[8px] flex h-[60px] w-[268px] items-center justify-center overflow-hidden rounded-[24px] bg-blue-button-gradient shadow-blue-shadow disabled:pointer-events-none disabled:opacity-50 md:w-full">
				<span className="relative z-[5] mr-[7px] block text-[15px] font-bold">
					{t("affiliate_banner_button")}
				</span>
				<span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
			</button>
		</Link>
	);
};

export default BecomeAffiliateButton;
