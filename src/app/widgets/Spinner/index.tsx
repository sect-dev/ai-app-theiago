import React, { FC } from "react";
import clsx from "clsx";

interface ComponentProps {
	className?: string;
}

const Spinner: FC<ComponentProps> = ({ className }) => {
	return (
		<div
			className={clsx(
				"border-gray-200 h-4 w-4 animate-spin rounded-full border-2 border-t-[#007AFF]",
				className
			)}
		/>
	);
};

export default Spinner;
