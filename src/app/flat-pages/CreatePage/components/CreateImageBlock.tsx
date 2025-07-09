"use client";

import RandomButton from "./RandomButton";
import { useCharacterCreateStore } from "@/app/shared/store/createCharacterStore";
import SuggestionsBlock from "./SuggestionsBlock";
import TextArea from "./TextArea";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { createImage } from "../helpers/createImage";
import { userAgent } from "next/server";
import { auth } from "@/firebase";
import { useAuthStore } from "@/app/shared/store/authStore";
import Image from "next/image";
import ImageSparkling from "@/../public/images/img/img-sparkling-white.svg";
import ImageStackSvg from "@/../public/images/img/image-cointstack.svg";
import { useRouter } from "next/navigation";

const CreateImageBlock = () => {
	const {
		setRequest,
		request,
		characterId,
		type,
		setIsLoading,
		setGeneratedAssets,
		generatedAssets,
		setIsGenerateModalActive,
		setRecentlyGeneratedImage
	} = useCharacterCreateStore();
	const user = auth.currentUser;
	const tokens = usePaymentStore((state) => state.tokens);
	const { setAuthModal } = useAuthStore();
	const { setTokens } = usePaymentStore();
	const router = useRouter();

	console.log("tokens", tokens);

	const handleCreateImage = async () => {
		if (user?.isAnonymous) {
			setAuthModal({ modalType: "login", isAuthModalActive: true });
			return;
		}
		if (tokens < 2) {
			router.push("/paywall2");
			return;
		}
		await createImage({
			setIsLoading,
			type,
			characterId: characterId ?? 1,
			request,
			setTokens,
			setGeneratedAssets,
			generatedAssets
		});
	};

	const handleFixedCreateImage = async () => {
		if (user?.isAnonymous) {
			setAuthModal({ modalType: "login", isAuthModalActive: true });
			return;
		}
		if (tokens < 2) {
			router.push("/paywall2");
			return;
		}
		await createImage({
			setIsLoading,
			type,
			characterId: characterId ?? 1,
			request,
			setTokens,
			setGeneratedAssets,
			generatedAssets,
			isFixed: true,
			setIsGenerateModalActive,
			setRecentlyGeneratedImage
		});
	};

	return (
		<>
			<div className="min-w-[411px] md:min-w-full">
				<div className="flex flex-col">
					<div className="mb-[16px] grid grid-rows-[1fr_auto] gap-[12px] rounded-[8px] bg-[#121423] p-[20px] md:rounded-[16px]">
						<TextArea />
						<div className="flex flex-row justify-between">
							{/* <SwitchButton /> */}
							{/* <RandomButton /> */}
						</div>
					</div>

					<SuggestionsBlock />

					<button
						onClick={handleCreateImage}
						className="relative mb-[8px] flex h-[60px] w-full items-center justify-center overflow-hidden rounded-[24px] bg-blue-button-gradient shadow-blue-shadow disabled:pointer-events-none disabled:opacity-50 md:hidden"
					>
						<Image
							src={ImageSparkling}
							alt="sparkling"
							className="mr-[7px] h-[24px] w-[24px]"
						/>
						<span className="relative z-[5] mr-[7px] block text-[15px] font-bold">
							Create Image
						</span>
						<span className="mr-[4px] block text-[12px] font-bold leading-[150%]">
							2
						</span>
						<Image
							src={ImageStackSvg}
							alt="stack"
							className="h-[12px] w-[12px]"
						/>
						<span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
					</button>
				</div>
			</div>

			<div className="fixed bottom-[5vw] left-1/2 z-[50] hidden -translate-x-1/2 md:block">
				<button
					onClick={handleFixedCreateImage}
					className="relative flex h-[60px] w-[343px] items-center justify-center overflow-hidden rounded-[24px] bg-blue-button-gradient shadow-blue-shadow disabled:pointer-events-none disabled:opacity-50"
				>
					<Image
						src={ImageSparkling}
						alt="sparkling"
						className="mr-[7px] h-[24px] w-[24px]"
					/>
					<span className="relative z-[5] mr-[7px] block text-[15px] font-bold">
						Create Image
					</span>
					<span className="mr-[4px] block text-[12px] font-bold leading-[150%]">
						2
					</span>
					<Image
						src={ImageStackSvg}
						alt="stack"
						className="h-[12px] w-[12px]"
					/>
					<span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
				</button>
			</div>
		</>
	);
};

export default CreateImageBlock;
