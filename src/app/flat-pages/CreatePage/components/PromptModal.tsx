import { useClickOutside } from "@/app/shared/hooks/useClickOutside";
import CopyButton from "@/app/widgets/CopyButton";
import { useRef } from "react";
import CloseIcon from "@/../public/images/img/image-prompt-close.png";
import Image from "next/image";

interface Props {
	closeModal: () => void;
	request: string;
	className?: string;
}

const PromptModal = (props: Props) => {
	const { closeModal, request, className } = props;
	const modalRef = useRef<HTMLDivElement>(null);

	useClickOutside(modalRef, closeModal);

	return (
		<div
			ref={modalRef}
			className={`chats-suggestion-modal absolute bottom-auto top-full z-[5] animate-fadeIn space-y-[4px] md:bottom-[calc(100%+10px)] md:top-auto ${className}`}
		>
			<div className="max-h-[365px] w-[237px] rounded-[12px] rounded-b-[12px] bg-[#21233A] p-[8px]">
				<div className="mb-[8px] flex w-[237px] items-center gap-[8px]">
					<Image
						onClick={closeModal}
						src={CloseIcon}
						alt="prompt"
						width={16}
						height={16}
						className="h-[16px] w-[16px]"
					/>
					<span className="text-[14px] font-semibold text-[#fff]">Prompt</span>
				</div>

				<span className="mb-[10px] block text-[12px] font-medium leading-[130%] tracking-normal text-[#fff] opacity-50">
					{request}
				</span>

				<CopyButton text={"Copy button"} copyText={request} />
			</div>
		</div>
	);
};

export default PromptModal;
