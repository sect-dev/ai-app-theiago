import clsx from 'clsx';


interface Props {
	text: string;
	isActive: boolean;
	onClick: () => void;
}

const TagsButton = (props: Props) => {
	const {text, isActive, onClick} = props;


	return (
		<button onClick={onClick} className={clsx("py-[6px] px-[12px]  rounded-[12px] flex justify-center items-center", {
			"bg-[#003B5F]": isActive,
			"bg-[#1D1F37]": !isActive
		})}>
			<span className={clsx("font-semibold text-[12px]", {"text-[#0394EC]": isActive, "text-[#FFF]": !isActive})}>{text}</span>
		</button>
	)
}

export default TagsButton