import { Dialog, DialogPanel } from "@headlessui/react";
import Lottie from "lottie-react";
import Image from "next/image";
import SparklingAnimationLottie from "@/../public/lotties/sparkling-starts-lottie.json";
import LoadingImage from "@/../public/images/img/image-loading-generator.png";
import { useCharacterCreateStore } from "@/app/shared/store/createCharacterStore";

const GeneratePhotoModal = () => {
	const {
		isLoading,
		recentlyGeneratedImage,
		setIsGenerateModalActive,
		setRecentlyGeneratedImage
	} = useCharacterCreateStore();

	const handleBackClick = () => {
		setIsGenerateModalActive(false);
		setRecentlyGeneratedImage(null);
	};

	return (
		<Dialog
			open={true}
			onClose={() => {}}
			className="relative z-50 font-bai-jamjuree"
		>
			<div className="fixed inset-0 flex w-screen items-center justify-center">
				<DialogPanel
					transition
					className="data-[closed]:transform-[scale(95%)] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0"
				>
					<div className="flex h-full w-full flex-col items-center justify-center bg-[#121423]">
						<div>
							{isLoading && (
								<div className="flex flex-col items-center justify-center">
									<div className="relative mb-[20px] overflow-hidden rounded-[32px]">
										<Image
											src={LoadingImage}
											alt="sparkling starts"
											className="mb-[20px] max-h-[433px] object-cover"
											width={326}
											height={433}
										/>

										<div className="pointer-events-none absolute inset-0 z-10 bg-black/5 backdrop-blur-[59px]" />

										<div className="absolute inset-0 flex flex-col items-center justify-center">
											<Lottie
												className="bottom-0 left-0 right-0 top-0 z-10"
												animationData={SparklingAnimationLottie}
												height={40}
												width={40}
												loop={true}
												autoplay={true}
											/>
										</div>
									</div>

									<div className="mb-[20px] flex flex-col justify-center gap-[8px] text-center">
										<span className="text-[24px] font-bold leading-[1.1]">
											Creating image
										</span>
										<span className="text-[14px] font-normal leading-[1.2] text-[#B0B0B0]">
											You will need to wait a little.
										</span>
									</div>
								</div>
							)}

							{recentlyGeneratedImage && !isLoading && (
								<div className="flex flex-col items-center justify-center">
									<div className="">
										<Image
											src={recentlyGeneratedImage}
											alt="last generated image"
											className="mb-[20px] max-h-[433px] rounded-[32px] object-cover"
											width={326}
											height={433}
										/>
									</div>
									<div className="mb-[20px] flex flex-col gap-[8px] text-center">
										<span className="text-[24px] font-bold leading-[1.1]">
											Done!
										</span>
										<span className="text-[14px] font-normal leading-[1.2] text-[#B0B0B0]">
											Your image has been created with prompt
										</span>
									</div>
								</div>
							)}
						</div>

						<button
							onClick={handleBackClick}
							className="h-[44px] w-[328px] rounded-[16px] bg-[#003B5F] text-[14px] font-bold text-[#0394EC]"
						>
							Back
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default GeneratePhotoModal;
