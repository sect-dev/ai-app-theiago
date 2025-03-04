import {SendMessageParam, SendMessageResponse} from "@/app/shared/api/types";
import {apiClient} from "@/app/shared/api/index";
import {ApiResponse, GenerateUserTextPayload, StartRequest, StartResponse} from "@/app/shared/api/types/messsaes";

export const generateUserText = async (userId: string | null,characterId: number | null): Promise<ApiResponse | null> => {
  const payload: GenerateUserTextPayload = {
    type: "generate_user_text",
    user_id: userId,
    character_id: characterId.toString(),
    locale: "en",
    allowed_response_types: ["text", "image", "video", "audio"],
    censorship: {
      text: "low",
      image: "low",
      audio: "low",
      video: "low",
    },
    token: "none",
  };

  try {
    const response = await apiClient.post<ApiResponse>(
      "/build_web_response",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе к API:", error);
    return null;
  }
};

export const sendMessage = async (params:SendMessageParam):Promise<SendMessageResponse | null> => {
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
        video: "low",
      },
      token: "10"
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    return null;
  }
};

export const startConversation = async ({userId,characterId}: { userId: string | null, characterId: string | null }): Promise<StartResponse | null> => {
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
      video: "low",
    },
    token: "none",
  };

  try {
    const response = await apiClient.post<StartResponse>("/build_web_response", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе к API:", error);
    return null;
  }
};

