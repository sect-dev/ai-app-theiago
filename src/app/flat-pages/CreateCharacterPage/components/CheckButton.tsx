import Image from "next/image";
import CheckIcon from "@/../public/images/createpage/blue-check-icon.png";

const CheckButton = () => {
	return (
		<div className="flex h-[24px] w-[28px] items-center justify-center rounded-[16px] bg-[#003B5F] px-[4px] py-[2px]">
			<Image src={CheckIcon.src} alt="check" width={20} height={20} />
		</div>
	);
};

export default CheckButton;
