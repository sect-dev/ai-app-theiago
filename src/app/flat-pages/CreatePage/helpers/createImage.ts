import { assembleRequest } from "@/app/shared/api/assembleRequest";
import { AssembledImageResponse } from "@/app/shared/api/types/assembleRequest";
import { useCharacterCreateStore } from "@/app/shared/store/createCharacterStore";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { GeneratedAsset } from "@/app/shared/store/createCharacterStore";
import { safeLocalStorage } from "@/app/shared/helpers";

const CENSORSHIP_LOW = "low";

interface Props {
	setIsLoading: (isLoading: boolean) => void;
	type: string;
	characterId: number | string;
	request: string;
	setTokens: (tokens: number) => void;
	setGeneratedAssets: (assets: GeneratedAsset[]) => void;
	generatedAssets: GeneratedAsset[];
	isFixed?: boolean;
	setIsGenerateModalActive?: (isGenerateModalActive: boolean) => void;
	setRecentlyGeneratedImage?: (recentlyGeneratedImage: string) => void;
}

export const createImage = async (props: Props) => {
	const {
		setIsLoading,
		type,
		characterId,
		request,
		setTokens,
		setGeneratedAssets,
		generatedAssets,
		isFixed = false,
		setIsGenerateModalActive,
		setRecentlyGeneratedImage
	} = props;

	try {
		if (isFixed) {
			setIsGenerateModalActive?.(true);
		}

		setIsLoading(true);

		const response = await assembleRequest<AssembledImageResponse>({
			type: type,
			characterId: characterId !== null ? characterId.toString() : "",
			request: request,
			censorship: CENSORSHIP_LOW
		});

		if (response) {
			const tokens = response.tokens_remaining;
			safeLocalStorage.set("tokens", JSON.stringify(tokens));
			setTokens(tokens);

			const newAsset = {
				url: response.url,
				nsfw: response.nsfw,
				hasVideo: response.has_video,
				tokens_remaining: response.tokens_remaining
			};

			if (isFixed) {
				setRecentlyGeneratedImage?.(newAsset.url);
			}

			setGeneratedAssets([...generatedAssets, newAsset]);
		}
	} catch (error) {
		console.error("Error creating image:", error);
	} finally {
		setIsLoading(false);
	}
};

// export const handleFixedCreateImage = async () => {
// 	try {
// 		setIsGenerateModalActive(true);
// 		setIsLoading(true);

// 		const response = await assembleRequest<AssembledImageResponse>({
// 			type: type,
// 			characterId: characterId !== null ? characterId : 1,
// 			request: request,
// 			censorship: CENSORSHIP_LOW
// 		});

// 		if (response) {
// 			const newAsset = {
// 				url: response.url,
// 				nsfw: response.nsfw,
// 				hasVideo: response.has_video
// 			};

// 			setRecentlyGeneratedImage(newAsset.url);
// 			setGeneratedAssets([...generatedAssets, newAsset]);
// 		}

// 		// console.log("response", response);
// 	} catch (error) {
// 		console.error("Error creating image:", error);
// 	} finally {
// 		setIsLoading(false);
// 	}
// };
