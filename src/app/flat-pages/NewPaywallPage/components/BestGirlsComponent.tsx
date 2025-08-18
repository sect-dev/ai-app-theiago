import Image from "next/image";
import ImageBestGirls from "@/../public/images/img/image-best-girls.png";
import ImageBestGirlsBlue from "@/../public/images/img/image-best-girls-blue.png";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface Props {
	isOrganic?: boolean;
}

const BestGirlsComponent = (props: Props) => {
	const { isOrganic } = props;
	const t = useTranslations("Paywall");

	return (
		<div className="mb-[24px] flex flex-col items-center justify-center text-[20px] font-semibold leading-[120%]">
			<span className="text-center">
				{t("our")}{" "}
				<span
					className={clsx(
						"mx-[5px] inline-block bg-clip-text text-transparent",
						isOrganic ? "bg-blue-text-gradient" : "bg-purple-text-gradient"
					)}
				>
					{t("best_girls")}
				</span>{" "}
				{t("are")} <br /> {t("waiting_for_you")}
			</span>
			<Image
				src={isOrganic ? ImageBestGirlsBlue.src : ImageBestGirls.src}
				alt="best girls"
				width={ImageBestGirls.width}
				height={ImageBestGirls.height}
			/>
		</div>
	);
};

export default BestGirlsComponent;
