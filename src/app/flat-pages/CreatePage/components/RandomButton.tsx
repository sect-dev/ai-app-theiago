import Image from "next/image";


const RandomButton = () => {

	return (
		<button className="flex items-center justify-center gap-[4px] bg-[#003B5F] py-[2px] px-[8px] rounded-[16px]">
			<Image
				src="/images/icons/icon-random-button.svg"
				width={24}
				height={24}
				alt="change button"
			/>
			<span className='font-medium text-[14px] text-[#0394EC]'>Random</span>
		</button>
	)
}

export default RandomButton;