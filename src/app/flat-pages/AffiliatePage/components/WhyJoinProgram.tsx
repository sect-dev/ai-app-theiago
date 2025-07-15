import Image from "next/image";
import { WHY_JOIN_PROGRAM_ITEMS } from "../helpers/consts";
import clsx from "clsx";
import StartEarning from "./StartEarning";

interface ItemProps {
	image: string;
	title: string;
	description: string;
}

interface Props {
	className?: string;
}

const WhyJoinProgram = (props: Props) => {
	const { className } = props;
	return (
		<div
			className={clsx(
				"rounded-bl-[24px] rounded-tl-[24px] bg-[#121423] p-[24px] md:rounded-[24px] md:p-[16px]",
				className
			)}
		>
			<span className="mb-[16px] block text-[24px] font-semibold leading-[1.3] tracking-wide">
				Why join the AiGo Affiliate program?
			</span>

			<div className="mb-[24px] grid grid-cols-2 gap-[8px] md:grid-cols-1 md:gap-[16px]">
				{WHY_JOIN_PROGRAM_ITEMS.map((item) => (
					<WhyJoinProgramItem key={item.id} {...item} />
				))}
			</div>

			<StartEarning />
		</div>
	);
};

const WhyJoinProgramItem = (props: ItemProps) => {
	const { image, title, description } = props;
	return (
		<div className="flex gap-[16px] rounded-[20px] bg-[#2B2D44] px-[12px] pb-[20px] pt-[12px]">
			<div className="flex max-h-[42px] min-h-[42px] min-w-[42px] max-w-[42px] items-center justify-center rounded-[12px] bg-[#121423] p-[8px]">
				<Image
					src={image}
					alt={title}
					width={24}
					height={24}
					className="h-fit"
				/>
			</div>
			<div className="flex max-w-[426px] flex-col gap-[8px]">
				<span className="text-[18px] font-bold leading-[24px]">{title}</span>
				<span className="text-[14px] font-semibold leading-[16px] text-[#9DB2CE]">
					{description}
				</span>
			</div>
		</div>
	);
};

export default WhyJoinProgram;
