import Image from "next/image";
import SecondStep from "@/../public/images/createpage/second-step.png";
import StepBackButton from "./StepBackButton";

const GENDER_OPTIONS = [
	{
		id: 1,
		gender: "Female",
		icon: "/images/createpage/gender-female.png",
		has: true
	},
	{
		id: 2,
		gender: "Male",
		icon: "/images/createpage/gender-male.png",
		has: false
	},
	{
		id: 3,
		gender: "Transgender",
		icon: "/images/createpage/gender-transgender.png",
		has: false
	}
];

const BasicInfo = () => {
	return (
		<div>
			<div className="mb-[32px] flex flex-col gap-[12px] text-center">
				<div className="mb-[32px] flex sm:mb-[22px]">
					<StepBackButton />
					<Image
						src={SecondStep.src}
						width={SecondStep.width}
						height={SecondStep.height}
						alt="second-page-header"
						className="absolute right-0 h-[32px] object-cover object-left sm:max-w-[340px] xs:max-w-[300px]"
					/>
				</div>

				<div>
					<span className="block text-[24px] font-bold leading-[1.3]">
						Basic information
					</span>
					<span className="block text-[16px] font-medium opacity-50">
						Select the basic information about your character
					</span>
				</div>

				<div>
					<span className="traking-wide mb-[8px] text-[18px] font-bold leading-[130%]">
						Gender
					</span>
					<div className="flex items-center justify-center gap-[8px]">
						{GENDER_OPTIONS.map((gender) => (
							<div className="rounded-[16px] bg-[#1D1F37] p-[20px]">
								<span>{gender.gender}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BasicInfo;
