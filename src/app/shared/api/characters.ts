import {apiClient} from "@/app/shared/api/index";
import {cookies} from "next/headers";

export const getCharactersList = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value || cookieStore.get('tempToken')?.value;

  try {
    const response = await apiClient.get(`/characters_list_full?token=${token}`)
    if(response.data) {
      return response.data
    }
  } catch (error) {
    console.log('error',error)
  }
}

export const getCharacterInfoByConstructor = async (id:string) => {
  try {
    const response = await apiClient.get(`/constructor_character_basic_info?character_id=${id}`, {
      timeout: 5000,
    })
    const data = JSON.parse(JSON.stringify(response.data));
    return data
  } catch (error) {
    console.log('error',error)
  }
}
