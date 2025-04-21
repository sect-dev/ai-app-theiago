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


