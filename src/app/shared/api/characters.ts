import { apiClient } from "@/app/shared/api/index";
import { cookies } from "next/headers";
import axios from "axios";
import { Character } from './types';

type CharacterData = Record<number, Character>

export const getCharactersList = async (): Promise<CharacterData | undefined> => {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("accessToken")?.value ||
    cookieStore.get("tempToken")?.value;

  try {
    const response = await apiClient.get<CharacterData>(
      `/characters_list_full?token=${token}`,
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message, error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
