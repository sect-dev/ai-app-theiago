import axios from "axios";
import {SendMessageParam, SendMessageResponse} from "@/app/shared/api/types";

const apiClient = axios.create({
  baseURL: "https://stage.theaigo.com:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCharactersList = async () => {
  try {
    const response = await apiClient.get('/characters_list_full')
    if(response.data) {
      return response.data
    }
  } catch (error) {
    console.log('error',error)
  }
}

export const getCharacterInfoById = async (id:number) => {
  try {
    const response = await apiClient.get(`/character_info?id=${id}`);
    if(response.data) {
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}

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

export const getTokensInfo = async (userId:string) => {
  try {
    const response = await apiClient.get(`/user_tokens?user_id=${userId}`)
    return response.data
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    return null;
  }
}
