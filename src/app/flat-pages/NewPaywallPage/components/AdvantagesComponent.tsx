import ImageHotItem from "@/../public/images/icons/icon-fire.webp";
import ImageOnline247 from "@/../public/images/icons/icon-heart.webp";
import ImageRealLove from "@/../public/images/icons/icon-pink-hearts.webp";
import ImageFullSafety from "@/../public/images/icons/icon-surprise.webp";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AdvantagesComponent = () => {
	const t = useTranslations("Paywall");

	const ADVANTAGES = [
		{
			id: 1,
			title: t("advantages_hot_item"),
			description: t("advantages_hot_item_description"),
			icon: ImageHotItem
		},
		{
			id: 2,
			title: t("advantages_online_24_7"),
			description: t("advantages_online_24_7_description"),
			icon: ImageOnline247
		},
		{
			id: 3,
			title: t("advantages_real_love"),
			description: t("advantages_real_love_description"),
			icon: ImageRealLove
		},
		{
			id: 4,
			title: t("advantages_full_safety"),
			description: t("advantages_full_safety_description"),
			icon: ImageFullSafety
		}
	];
	return (
		<div className="mb-[24px] flex flex-col gap-[12px]">
			{ADVANTAGES.map((advantage) => (
				<div
					key={advantage.id}
					className="flex gap-[12px] rounded-[20px] bg-[#2B2D44] p-[12px]"
				>
					<div className="flex h-[44px] min-w-[44px] items-center justify-center rounded-[12px] bg-[#121423] p-[10px]">
						<Image
							src={advantage.icon.src}
							alt={advantage.title}
							width={advantage.icon.width}
							height={advantage.icon.height}
						/>
					</div>
					<div className="flex flex-col gap-[8px]">
						<span className="text-[20px] font-bold">{advantage.title}</span>
						<span className="text-[14px] font-semibold">
							{advantage.description}
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default AdvantagesComponent;
