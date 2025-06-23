"use client"

import { useCharacterCreateStore } from '@/app/shared/store/createCharacterStore';
import clsx from 'clsx';
import Image from "next/image";

interface Props {
	className?: string;
}

const ChangeButton = (props: Props) => {
	const {className} = props;

	const { setChangeCharacterModal } = useCharacterCreateStore();

	const handleClick = () => {
		console.log("opened modal")
		setChangeCharacterModal(true)
	}

	return (
		<button onClick={handleClick} className={clsx("flex items-center justify-center gap-[4px] bg-[#003B5F] py-[2px] px-[8px] rounded-[16px]", className)}>
			<Image
				src="/images/icons/icon-change-button.svg"
				width={24}
				height={24}
				alt="change button"
			/>
			<span className='font-medium text-[14px] text-[#0394EC]'>Change</span>
		</button>
	)
}

export default ChangeButton