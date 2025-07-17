import { SendMessageParam, SendMessageResponse } from "@/app/shared/api/types";
import {
	ApiResponse,
	GenerateImagePayload,
	GenerateImageResponse,
	GenerateUserTextPayload,
	StartRequest,
	StartResponse
} from "@/app/shared/api/types/messsaes";
import { apiClient, getCurrentToken } from "@/app/shared/api/index";

export const generateUserText = async (
	userId: string | null,
	characterId: number | null
): Promise<ApiResponse | null> => {
	const token = await getCurrentToken();

	const payload: GenerateUserTextPayload = {
		type: "generate_user_text",
		user_id: userId,
		character_id: characterId?.toString() ?? "",
		locale: "en",
		allowed_response_types: ["text", "image", "video", "audio"],
		censorship: {
			text: "low",
			image: "low",
			audio: "low",
			video: "low"
		},
		token: token ?? ""
	};

	try {
		const response = await apiClient.post<ApiResponse>(
			"/build_web_response",
			payload
		);
		if (response.data) {
			localStorage.setItem("hasPremium", response?.data.is_premium.toString());
			return response.data;
		}
		return null;
	} catch (error) {
		console.error("Error while requesting API:", error);
		return null;
	}
};

export const sendMessage = async (
	params: SendMessageParam
): Promise<SendMessageResponse | null> => {
	const token = await getCurrentToken();
	try {
		const response = await apiClient.post("/build_web_response", {
			type: "text",
			user_id: params.userId,
			character_id: params.characterId,
			message: params.message,
			allowed_response_types: ["text", "image", "video", "audio"],
			censorship: {
				text: "low",
				image: "low",
				audio: "low",
				video: "low"
			},
			token
		});
		if (response.data) {
			localStorage.setItem("hasPremium", response?.data.is_premium.toString());
			return response.data;
		}
		return null;
	} catch (error) {
		console.error("Error sending message:", error);
		return null;
	}
};

export const startConversation = async ({
	userId,
	characterId
}: {
	userId: string | null;
	characterId: string | null;
}): Promise<StartResponse | null> => {
	const token = await getCurrentToken();
	const payload: StartRequest = {
		type: "start",
		user_id: userId,
		character_id: characterId,
		locale: "en",
		allowed_response_types: ["text", "image", "video", "audio"],
		censorship: {
			text: "low",
			image: "low",
			audio: "low",
			video: "low"
		},
		token: token ?? ""
	};

	try {
		const response = await apiClient.post<StartResponse>(
			"/build_web_response",
			payload
		);
		if (response.data) {
			localStorage.setItem("hasPremium", response?.data.is_premium.toString());
			return response.data;
		}
		return null;
	} catch (error) {
		console.error("Error while requesting API:", error);
		return null;
	}
};

// TODO: Функция для генерации изображений. Костыль на место /assemble_content в генераторе. Удалить.
export const generateImage = async (
	userId: string | null,
	characterId: string,
	request: string
): Promise<SendMessageResponse | null> => {
	// Формируем запрос так, чтобы стимулировать генерацию изображения
	const imageRequest = `Show me a picture of ${request}`;

	const params = {
		userId: userId || "anonymous",
		characterId: characterId,
		message: imageRequest
	};

	try {
		const response = await sendMessage(params);
		return response;
	} catch (error) {
		console.error("Error generating image:", error);
		return null;
	}
};
