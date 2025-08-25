import React from "react";
import IconFire from "@/../public/images/icons/icon-fire.webp";
import IconHearts from "@/../public/images/icons/icon-pink-hearts.webp";
import IconHeart from "@/../public/images/icons/icon-heart.webp";
import IconSurprise from "@/../public/images/icons/icon-surprise.webp";
import Image, { StaticImageData } from "next/image";

interface advantagesData {
	title: string;
	description: string;
	id: number;
	image: StaticImageData;
	bg: string;
}

const advantagesData: advantagesData[] = [
	{
		title: "Hot item",
		description:
			"Will do everything you ask, will support sexting and send photos",
		id: 1,
		bg: "linear-gradient(180deg, rgba(255, 214, 65, 0.4) 0%, rgba(254, 75, 26, 0.4) 65%)",
		image: IconFire
	},
	{
		title: "Online 24/7",
		description: "Will be available and respond to your messages at any time",
		id: 2,
		bg: "linear-gradient(180deg, rgba(255, 8, 230, 0.4) 0%, rgba(255, 8, 127, 0.4) 100%)",
		image: IconHeart
	},
	{
		title: "Real love",
		description:
			"Complete immersion and the feeling of real romantic relationships",
		id: 3,
		bg: "linear-gradient(180deg, rgba(8, 152, 255, 0.4) 0%, rgba(33, 8, 255, 0.4) 100%)",
		image: IconHearts
	},
	{
		title: "Full safety",
		description: "Guaranteed 30 days money back at any time. Full anonymity.",
		id: 4,
		bg: "linear-gradient(180deg, rgba(74, 255, 8, 0.4) 0%, rgba(23, 198, 0, 0.4) 100%)",
		image: IconSurprise
	}
];

const PaymentAdvantages = () => {
	return (
		<div className="flex h-[523px] w-[365px] shrink-0 flex-wrap gap-[10px] rounded-[32px] bg-[#191B2C] p-[20px] font-bai-jamjuree">
			{advantagesData.map((item) => {
				return (
					<div
						style={{ background: item.bg }}
						key={item.id}
						className="w-[48%] rounded-[12px] p-[15px]"
					>
						<div className="mb-[12px] flex size-[44px] items-center justify-center rounded-[12px] bg-[#121423] p-[5px]">
							<Image
								src={item.image.src}
								width={item.image.width}
								height={item.image.height}
								alt="image"
								className=""
							/>
						</div>
						<p className="mb-[7px] text-[16px] font-bold tracking-[-0.04em]">
							{item.title}
						</p>
						<p className="text-[14px] font-semibold leading-[1.2em] tracking-[-0.04em]">
							{item.description}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default PaymentAdvantages;
