// src/app/flat-pages/CreateCharacterPage/components/SummarySkeleton.tsx
import Image from "next/image";
import StepBackButton from "./StepBackButton";
import FourthStep from "@/../public/images/createpage/fourth-step.png";
import Lottie from "lottie-react";
import SparklingAnimationLottie from "@/../public/lotties/sparkling-starts-lottie.json";
import LoadingImage from "@/../public/images/img/image-loading-generator.png";

const SummaryPageSkeleton = () => {
	return (
		<div>
			<div className="flex flex-col text-center">
				<div className="mb-[32px] flex sm:mb-[22px]">
					<StepBackButton />
					<Image
						src={FourthStep.src}
						width={FourthStep.width / 2}
						height={FourthStep.height / 2}
						alt="fourth-step-header"
						className="absolute right-0 h-[32px] object-cover object-left sm:max-w-[340px] xs:max-w-[300px]"
					/>
				</div>

				<div className="mb-[32px]">
					<div className="mx-auto mb-[8px] h-[32px] w-[120px] animate-pulse rounded-[8px] bg-skeleton" />
					<div className="mx-auto h-[20px] w-[180px] animate-pulse rounded-[8px] bg-skeleton" />
				</div>

				<div className="relative mb-[20px] overflow-hidden rounded-[32px]">
					<Image
						src={LoadingImage}
						alt="sparkling starts"
						className="mb-[20px] max-h-[433px] rounded-[32px] object-cover"
						width={427}
						height={447}
					/>

					<div className="pointer-events-none absolute inset-0 z-10 rounded-[32px] bg-black/5 backdrop-blur-[59px]" />

					<div className="absolute inset-0 flex flex-col items-center justify-center rounded-[32px]">
						<Lottie
							className="bottom-0 left-0 right-0 top-0 z-10 max-h-[100px] min-h-[100px] min-w-[100px] max-w-[100px]"
							animationData={SparklingAnimationLottie}
							height={40}
							width={40}
							loop={true}
							autoplay={true}
						/>
					</div>
				</div>

				<div className="mb-[20px]">
					<div className="mx-auto mb-[12px] h-[24px] w-[100px] animate-pulse rounded-[8px] bg-skeleton" />
					<div className="space-y-[8px]">
						<div className="h-[20px] w-full animate-pulse rounded-[8px] bg-skeleton" />
						<div className="mx-auto h-[20px] w-[80%] animate-pulse rounded-[8px] bg-skeleton" />
						<div className="mx-auto h-[20px] w-[60%] animate-pulse rounded-[8px] bg-skeleton" />
					</div>
				</div>

				<div className="mb-[32px] grid grid-cols-2 gap-[12px]">
					<div className="flex items-center justify-between rounded-[16px] bg-[#1D1F37] px-[16px] py-[12px]">
						<div className="flex flex-col items-start gap-[8px]">
							<div className="h-[16px] w-[50px] animate-pulse rounded-[8px] bg-skeleton" />
							<div className="h-[16px] w-[60px] animate-pulse rounded-[8px] bg-skeleton" />
						</div>
						<div className="h-[32px] w-[32px] animate-pulse rounded-[8px] bg-skeleton" />
					</div>

					<div className="flex items-center justify-between rounded-[16px] bg-[#1D1F37] px-[16px] py-[12px]">
						<div className="flex flex-col items-start gap-[8px]">
							<div className="h-[16px] w-[30px] animate-pulse rounded-[8px] bg-skeleton" />
							<div className="h-[16px] w-[25px] animate-pulse rounded-[8px] bg-skeleton" />
						</div>
						<div className="h-[32px] w-[32px] animate-pulse rounded-[8px] bg-skeleton" />
					</div>
				</div>

				{/* Slider skeleton */}
				<div className="mb-8">
					<div className="flex justify-center gap-[20px]">
						{[1, 2, 3].map((index) => (
							<div
								key={index}
								className="skeleton-shadow h-[217px] w-[180px] animate-pulse rounded-[16px] bg-skeleton"
							/>
						))}
					</div>
				</div>

				{/* Buttons skeleton */}
				<div className="flex flex-col justify-center gap-[16px]">
					<div className="h-[60px] w-full animate-pulse rounded-[24px] bg-skeleton" />
					<div className="mx-auto h-[18px] w-[120px] animate-pulse rounded-[8px] bg-skeleton" />
				</div>
			</div>
		</div>
	);
};

export default SummaryPageSkeleton;
