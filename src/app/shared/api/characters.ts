import { apiClient } from "@/app/shared/api/index";
import { cookies } from "next/headers";
import axios from "axios";

export const getCharactersList = async () => {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("accessToken")?.value ||
    cookieStore.get("tempToken")?.value;

  try {
    const response = await apiClient.get(
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

export const getAllCharacters = async () => {
  try {
    const response = await apiClient.get("/characters_list_full");
    if (response.data) {
      return response.data
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message, error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
  }
} 
