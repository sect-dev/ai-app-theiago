import { useState } from "react";
import CopyIcon from "@/../public/images/img/image-copy-prompt.png";
import Image from "next/image";

interface Props {
	text: string;
	copyText?: string;
}

const CopyButton = (props: Props) => {
	const { text, copyText } = props;
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(copyText || "");
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Ошибка при копировании:", err);
		}
	};

	return (
		<button
			onClick={handleCopy}
			className="flex items-center gap-[4px] text-white"
		>
			<Image
				src={CopyIcon}
				alt="copy"
				width={16}
				height={16}
				className="h-[16px] w-[16px]"
			/>
			<span className="text-[14px] leading-[120%] text-[#0394EC]">
				{copied ? "Copied" : text}
			</span>
		</button>
	);
};

export default CopyButton;
