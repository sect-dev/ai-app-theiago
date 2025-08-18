"use client";

import { useState } from "react";
import Image from "next/image";
import { CharacterByConstructor } from "@/app/shared/api/types";
import { BASE_URL_PAYWALL_PRECREATED } from "@/app/shared/consts";

interface Props {
	character: CharacterByConstructor;
}

const IMAGE_PROPERTIES = "?quality=100";

const GalleryComponent = (props: Props) => {
	const { character } = props;

	const images = [
		`${BASE_URL_PAYWALL_PRECREATED}/${character?.style}/${character?.ethnicity}/${character?.body_type}/1.png${IMAGE_PROPERTIES}`,
		`${BASE_URL_PAYWALL_PRECREATED}/${character?.style}/${character?.ethnicity}/${character?.body_type}/2.png${IMAGE_PROPERTIES}`,
		`${BASE_URL_PAYWALL_PRECREATED}/${character?.style}/${character?.ethnicity}/${character?.body_type}/3.png${IMAGE_PROPERTIES}`,
		`${BASE_URL_PAYWALL_PRECREATED}/${character?.style}/${character?.ethnicity}/${character?.body_type}/4.png${IMAGE_PROPERTIES}`
	];

	const [mainImage, setMainImage] = useState(images[0]);

	return (
		<div className="relative mb-[12px] flex flex-col items-center gap-4">
			<div className="relative h-[345px] w-full max-w-md overflow-hidden rounded-b-[32px]">
				<Image
					src={mainImage}
					alt="Main Image"
					fill
					sizes="(max-width: 768px) 100vw, 500px"
					className="object-cover object-top"
					priority
				/>
			</div>

			<div className="absolute bottom-0 mb-[16px] flex gap-[12px]">
				{images.map((img, index) => (
					<div
						key={index}
						className={`relative h-16 w-16 cursor-pointer overflow-hidden rounded-[16px]`}
						onClick={() => setMainImage(img)}
					>
						<Image
							src={img}
							alt={`Thumbnail ${index + 1}`}
							fill
							sizes="64px"
							className="object-cover object-top"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default GalleryComponent;
