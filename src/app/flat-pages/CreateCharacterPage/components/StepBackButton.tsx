import Image from "next/image";
import StepBackIcon from "@/../public/images/createpage/button-step-back.png";

const StepBackButton = () => {
	return (
		<button className="rounded-[12px] bg-[#2F3250] p-[6px]">
			<Image src={StepBackIcon} alt="step-back" className="h-[20px] w-[20px]" />
		</button>
	);
};

export default StepBackButton;
