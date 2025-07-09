import React, { FC, useRef } from "react";
import { useClickOutside } from "@/app/shared/hooks/useClickOutside";
import { useRouter } from "next/navigation";
import { IS_CLIENT } from "@/app/shared/consts";

interface PhotoItem {
	title: string;
	value?: string;
	id: number;
	image: string;
}

const photoPrompt = [
	{
		title: "Breasts ",
		value: "Show me a picture of your breasts",
		id: 1,
		image: "🍒"
	},
	{
		title: "Butt ",
		value: "Show me a picture of your butt",
		id: 2,
		image: "🌰"
	},
	{
		title: "Pussy ",
		value: "Show me a picture of your pussy",
		id: 3,
		image: "🐱"
	},
	{
		title: "Custom ",
		value: "Show me a picture of your [body part] while you [action or pose]",
		id: 4,
		image: "✏️"
	}
];

const textPrompt = [
	{
		title: "Send me... ",
		id: 1
	}
];

interface ComponentProps {
	closeModal: () => void;
	onSelectMessage: (text: string) => void;
}

const ChatsMessageModal: FC<ComponentProps> = ({
	closeModal,
	onSelectMessage
}) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	useClickOutside(modalRef, closeModal);

	const handleCustomClick = (item: PhotoItem, prompt: string) => {
		onSelectMessage(prompt);
	};

	return (
		<div
			ref={modalRef}
			className="chats-suggestion-modal absolute bottom-[calc(100%+10px)] right-[60px] z-[5] w-[187px] animate-fadeIn space-y-[4px]"
		>
			<div className="rounded-b-[4px] rounded-t-[12px] bg-[#21233A] px-[6px] py-[12px]">
				<p className="mb-[10px] text-[14px] font-semibold">Ask a photo with</p>
				<ul className="">
					{photoPrompt.map((item) => {
						const prompt = item.value;
						return (
							<li key={item.id} className="">
								<button
									onClick={() => handleCustomClick(item, item.value)}
									className="group flex w-full items-center gap-[8px] py-[6px] text-left"
								>
									<span className="text-[14px]">{item.image}</span>
									<span className="transition-border border-b border-b-transparent text-[12px] font-medium duration-300 group-hover:border-b-white">
										{item.title}
									</span>
								</button>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="rounded-b-[12px] rounded-t-[4px] bg-[#21233A] px-[6px] py-[12px]">
				<ul className="mb-[12px]">
					{textPrompt.map((item) => {
						return (
							<li key={item.id} className="group">
								<button
									onClick={() => onSelectMessage(item.title)}
									className="block w-full py-[6px] text-left text-[12px] font-medium"
								>
									<span className="transition-border border-b border-b-transparent duration-300 group-hover:border-b-white">
										{item.title}
									</span>
								</button>
							</li>
						);
					})}
				</ul>
				<p className="text-[10px] font-medium leading-[1.2em] tracking-[-0.04em] opacity-50">
					You can request any photo by starting the message with these words.
				</p>
			</div>
		</div>
	);
};

export default ChatsMessageModal;
