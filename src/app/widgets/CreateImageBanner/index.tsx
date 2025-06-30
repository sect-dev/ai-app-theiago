"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageIconOrange from "@/../public/images/img/image-sparkling-orange.png";
import ImageCreateImageBanner from "@/../public/images/img/create-image-banner.png";
import Spinner from "../Spinner";

const CreateImageBanner = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleClick = () => {
		setIsLoading(true);
		router.push("/generate");
	};

	return (
		<div className="mx-[8px] mb-[18px]">
			<div className="main-gradient flex h-[157px] w-full justify-between rounded-[32px] p-[20px]">
				<div>
					<div className="relative z-[1] mb-[16px] flex flex-col gap-[8px]">
						<span className="text-[24px] font-bold leading-[1.2]">
							Create image
						</span>
						<span className="text-[14px] font-normal leading-[1.3] opacity-80">
							Generate a unique photo with any character
						</span>
					</div>
					<button
						onClick={handleClick}
						className="relative z-[1] flex h-[46px] w-[131px] items-center justify-center gap-[8px] rounded-[20px] bg-[#FFFFFF] px-[16px] py-[12px]"
					>
						{isLoading ? (
							<Spinner className="mx-auto h-[22px] w-[22px] rounded-[12px] border-[2px] border-[#007AFF] border-t-transparent" />
						) : (
							<>
								<Image
									src={ImageIconOrange.src}
									alt="image icon"
									width={22}
									height={22}
									className="size-[22px]"
								/>
								<span className="bg-main-gradient bg-clip-text text-[18px] font-bold text-transparent">
									Try Now
								</span>
							</>
						)}
					</button>
				</div>

				{/* TODO: add image */}
				{/* <Image
					src={ImageCreateImageBanner.src}
					alt="create image banner"
					width={ImageCreateImageBanner.width}
					height={ImageCreateImageBanner.height}
					className=""
				/> */}
			</div>
		</div>
	);
};

export default CreateImageBanner;
