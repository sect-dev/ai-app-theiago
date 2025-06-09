import { apiClient } from "@/app/shared/api/index";
import axios from "axios";

export const getCharacterInfoById = async (id: string) => {
  try {
    const response = await apiClient.get(`/character_info?id=${id}`);
    return JSON.parse(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const getCharacterInfoByConstructor = async (id: string, locale?: string) => {
  try {
    const response = await apiClient.get(
      `/constructor_character_basic_info?character_id=${id}&locale=${locale}`,
      {
        timeout: 10000,
      },
    );
    const data = JSON.parse(JSON.stringify(response.data));
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message, error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
