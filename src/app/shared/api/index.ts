import axios from "axios";

export const apiClient = axios.create({
  baseURL: 'https://stage.theaigo.com:8000',
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

export const getCharacterInfoById = async (id:string | string[]) => {
  try {
    const response = await apiClient.get(`/character_info?id=${id}`);
    if(response.data) {
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}

export const getTokensInfo = async (userId:string) => {
  try {
    const response = await apiClient.get(`/user_tokens?user_id=${userId}`)
    return response.data
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    return null;
  }
}
