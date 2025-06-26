import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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
	const {content} = props;
	const [open, setOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handlePhotoClick = (index: number) => {
		setSelectedIndex(index);
		setOpen(true);
	}

	const slides = content.map((item) => ({
		src: `${item.url}?format=webp&quality=100`
	}))

	
	return (

		<>
					<div className="grid grid-cols-2 gap-[12px]">
				{content.map((item, index) => (
					<div 
						key={item.url} 
						className="relative rounded-lg overflow-hidden h-[181px] w-[144px] xs:h-[217px] xs:w-[165px] cursor-pointer hover:opacity-90 transition-opacity duration-150"
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
				))}
			</div>
		
			<Lightbox
		open={open}
		close={() => setOpen(false)}
		index={selectedIndex}
		slides={slides}
	/>
		</>

	)
}

export default CreatedContent;