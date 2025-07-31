import Image from "next/image";
import StepBackIcon from "@/../public/images/createpage/button-step-back.png";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";

const StepBackButton = () => {
	const { step, setStep } = useGenerateImageStore();

	const handleStepBack = () => {
		setStep(step - 1);
	};

	return (
		<button
			onClick={handleStepBack}
			className="rounded-[12px] bg-[#2F3250] p-[6px]"
		>
			<Image src={StepBackIcon} alt="step-back" className="h-[20px] w-[20px]" />
		</button>
	);
};

export default StepBackButton;
