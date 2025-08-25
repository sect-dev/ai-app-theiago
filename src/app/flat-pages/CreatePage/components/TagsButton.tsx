import clsx from "clsx";

interface Props {
	text: string;
	isActive: boolean;
	onClick?: () => void;
}

const TagsButton = (props: Props) => {
	const { text, isActive, onClick } = props;

	return (
		<button
			onClick={onClick}
			className={clsx(
				"flex items-center justify-center rounded-[12px] px-[12px] py-[6px]",
				{
					"bg-[#003B5F]": isActive,
					"bg-[#1D1F37]": !isActive
				}
			)}
		>
			<span
				className={clsx("text-[12px] font-semibold", {
					"text-[#0394EC]": isActive,
					"text-[#FFF]": !isActive
				})}
			>
				{text}
			</span>
		</button>
	);
};

export default TagsButton;
