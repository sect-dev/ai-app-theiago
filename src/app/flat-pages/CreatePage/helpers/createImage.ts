import { assembleRequest } from "@/app/shared/api/assembleRequest";
import { AssembledImageResponse } from "@/app/shared/api/types/assembleRequest";
import { GeneratedAsset } from "@/app/shared/store/createCharacterStore";
import { safeLocalStorage } from "@/app/shared/helpers";
import { generateImage, sendMessage } from "@/app/shared/api/mesages";

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
	setIsErrorModalActive: (isErrorModalActive: boolean) => void;
	setErrorModalText: (errorText: string) => void;
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
		setRecentlyGeneratedImage,
		setIsErrorModalActive,
		setErrorModalText
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

			if (response.forbidden === true) {
				setIsErrorModalActive(true);
				setErrorModalText("Please try another prompt");
				return;
			}

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

export const createImage2 = async (props: Props) => {
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
		setRecentlyGeneratedImage,
		setIsErrorModalActive,
		setErrorModalText
	} = props;

	try {
		if (isFixed) {
			setIsGenerateModalActive?.(true);
		}

		setIsLoading(true);

		// Получаем userId из localStorage или используем null
		const userId = safeLocalStorage.get("userId") || null;

		// Формируем запрос так, чтобы стимулировать генерацию изображения
		const imageRequest = `Show me a picture of ${request}`;

		const params = {
			userId: userId || "anonymous",
			characterId: characterId.toString(),
			message: imageRequest
		};

		const response = await sendMessage(params);

		if (response) {
			const tokens = response.tokens_remaining;
			safeLocalStorage.set("tokens", JSON.stringify(tokens));
			setTokens(tokens);

			// Ищем изображение в ответе
			const imageResponse = response.response.find(
				(item) => item.type === "image"
			);

			if (imageResponse && imageResponse.url) {
				const newAsset = {
					url: imageResponse.url,
					nsfw: imageResponse.nsfw,
					hasVideo: false, // Для изображений всегда false
					tokens_remaining: response.tokens_remaining
				};

				if (isFixed) {
					setRecentlyGeneratedImage?.(newAsset.url);
				}

				setGeneratedAssets([...generatedAssets, newAsset]);
			} else {
				// Если в ответе нет изображения, но есть другие сообщения
				if (response.response.length > 0) {
					const textResponse = response.response.find(
						(item) => item.type === "text"
					);
					if (textResponse) {
						setIsErrorModalActive(true);
						setErrorModalText(
							`The character responded: "${textResponse.message}". Try a more specific image request.`
						);
					} else {
						setIsErrorModalActive(true);
						setErrorModalText(
							"The character didn't send an image. Try a more specific image request."
						);
					}
				} else {
					setIsErrorModalActive(true);
					setErrorModalText("Failed to generate image. Please try again.");
				}
			}
		} else {
			setIsErrorModalActive(true);
			setErrorModalText("Failed to generate image. Please try again.");
		}
	} catch (error) {
		console.error("Error creating image:", error);
		setIsErrorModalActive(true);
		setErrorModalText(
			"An error occurred while generating the image. Please try again."
		);
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
