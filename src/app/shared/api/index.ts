import axios from "axios";


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

export const sendMessage = async (userId: string, character: any, message: string) => {
  try {
    const response = await apiClient.post("/build_response", {
      type: "text",
      user_id: userId,
      character_id: character.id, // Берём ID из объекта персонажа
      locale: "en", // Или character.locale, если оно есть в объекте
      message,
      allowed_response_types: ["text", "image", "video", "audio"],
      censorship: {
        text: "low",
        image: "low",
        audio: "low",
        video: "low",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    return null;
  }
};
