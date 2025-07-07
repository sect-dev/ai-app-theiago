import { useClickOutside } from "@/app/shared/hooks/useClickOutside";
import Image from "next/image";
import { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PromptModal from "./PromptModal";
import PromptIcon from "@/../public/images/img/image-prompt-open.png";

interface Content {
	created_at?: string;
	nsfw?: boolean;
	url: string;
	request?: string;
	hasVideo?: boolean;
}

interface Props {
	content: Content[];
}

const CreatedContent = (props: Props) => {
	const { content } = props;
	const [open, setOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

	const handleModalToggle = (index: number) => {
		setActiveModalIndex(activeModalIndex === index ? null : index);
	};

	const handlePhotoClick = (index: number) => {
		setSelectedIndex(index);
		setOpen(true);
	};

	const slides = content.map((item) => ({
		src: `${item.url}?format=webp&quality=100`
	}));

	return (
		<div>
			<div className="grid grid-cols-2 gap-[12px]">
				{content.map((item, index) => (
					<div key={item.url} className="relative">
						<div
							className="relative h-[181px] w-[144px] cursor-pointer overflow-hidden rounded-lg transition-opacity duration-150 hover:opacity-90 xs:h-[217px] xs:w-[165px]"
							onClick={() => handlePhotoClick(index)}
						>
							<Image
								src={`${item.url}?format=webp&quality=80`}
								alt="assembled content"
								fill
								className="object-cover"
								sizes="(max-width: 768px) 50vw, 144px"
							/>
						</div>

						<div className="absolute bottom-0 left-0 flex flex-col items-start p-[8px]">
							<button
								onClick={() => handleModalToggle(index)}
								className="z-[1] flex items-center justify-center gap-[4px] rounded-[16px] bg-[#003B5F] px-[8px] py-[2px] text-center"
							>
								<Image
									src={PromptIcon}
									alt="copy"
									width={16}
									height={16}
									className="h-[16px] w-[16px]"
								/>
								<span className="text-[14px] font-normal text-[#0394EC]">
									Prompt
								</span>
							</button>

							{activeModalIndex === index && (
								<div className="z-[10]">
									<PromptModal
										closeModal={() => setActiveModalIndex(null)}
										request={item.request || ""}
										className={index % 2 !== 0 ? "right-0" : ""}
									/>
								</div>
							)}
						</div>
					</div>
				))}
			</div>

			<Lightbox
				open={open}
				close={() => setOpen(false)}
				index={selectedIndex}
				slides={slides}
			/>
		</div>
	);
};

export default CreatedContent;
