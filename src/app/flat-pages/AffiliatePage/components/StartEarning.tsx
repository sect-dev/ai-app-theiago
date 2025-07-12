import Image from "next/image";
import ImageBank from "@/../public/images/img/affiliate/image-bank.png";
import ImageBackMobile from "@/../public/images/img/affiliate/image-bank-small.png";
import GetStartedButton from "./GetStartedButton";

const StartEarning = () => {
	return (
		<div className="flex justify-between rounded-[24px] bg-main-gradient shadow-blue-shadow md:flex-col">
			<div className="flex flex-col gap-[16px] py-[20px] pl-[20px] md:p-[16px]">
				<div className="flex flex-col gap-[8px]">
					<span className="text-[24px] font-bold leading-[1.2] tracking-wide">
						Start earning now
					</span>
					<span className="text-[14px] font-medium leading-[130%] tracking-normal opacity-80">
						It&apos;s time to start! Press this button below!
					</span>
				</div>

				<GetStartedButton />
			</div>

			<div className="mr-[28px] md:mr-0">
				<Image
					src={ImageBank}
					alt="bank"
					width={ImageBank.width}
					height={ImageBank.height}
					className="block md:hidden"
				/>
				<Image
					src={ImageBackMobile}
					alt="bank"
					width={ImageBackMobile.width}
					height={ImageBackMobile.height}
					className="hidden md:block"
				/>
			</div>
		</div>
	);
};

export default StartEarning;
