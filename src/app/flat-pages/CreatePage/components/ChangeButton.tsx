"use client";

import { useCharacterCreateStore } from "@/app/shared/store/createCharacterStore";
import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface Props {
	className?: string;
}

const ChangeButton = (props: Props) => {
	const { className } = props;
	const t = useTranslations("ImageGenerator");

	const { setChangeCharacterModal } = useCharacterCreateStore();

	const handleClick = () => {
		console.log("opened modal");
		setChangeCharacterModal(true);
	};

	return (
		<button
			onClick={handleClick}
			className={clsx(
				"flex items-center justify-center gap-[4px] rounded-[16px] bg-[#003B5F] px-[8px] py-[2px]",
				className
			)}
		>
			<Image
				src="/images/icons/icon-change-button.svg"
				width={24}
				height={24}
				alt="change button"
			/>
			<span className="text-[14px] font-medium text-[#0394EC]">
				{t("generator_change_character")}
			</span>
		</button>
	);
};

export default ChangeButton;
