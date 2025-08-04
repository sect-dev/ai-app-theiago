import DollarSign from "@/../public/images/img/affiliate/image-dollar-sign.png";
import { AFFILIATE_FORM_URL } from "@/app/shared/consts";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const GetStartedButton = () => {
	const t = useTranslations("AffiliatePage");

	return (
		<Link href={AFFILIATE_FORM_URL} target="_blank">
			<button className="flex max-w-[159px] items-center justify-center gap-[8px] rounded-[20px] bg-[#FFFFFF] px-[16px] py-[12px] md:max-w-full">
				<Image src={DollarSign.src} alt="dollar sign" width={20} height={20} />
				<span className="bg-main-gradient bg-clip-text text-[18px] font-bold leading-[22px] text-transparent">
					{t("affiliate_start_earning_button")}
				</span>
			</button>
		</Link>
	);
};

export default GetStartedButton;
