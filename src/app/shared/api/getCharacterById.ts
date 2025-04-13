import {apiClient} from "@/app/shared/api/index";

export const getCharacterInfoById = async (id: string) => {
  try {
    const response = await apiClient.get(`/character_info?id=${id}`);
    return JSON.parse(JSON.stringify(response.data));
    // if(response.data) {
    //   return response.data
    // }
  } catch (error) {
    console.log(error)
  }
}