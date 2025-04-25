import { apiClient } from "@/app/shared/api/index";
import { getCurrentToken } from "@/app/shared/api"; // Ensure this import is correct
import { UserStatus } from './types';

export const getUserStatus = async (): Promise<{status: UserStatus; token: string} | null> => {
  const token = await getCurrentToken();
  if (!token) {
    console.error('No token found');
    return null
  }

  try {
    const response = await apiClient.get(`/user_status`, {
      params: {token}
    });
    if (response.data) {
      console.log(response.data)
      return {status: response.data, token: token};
    } else {
      console.error('No data received from user status API');
      return null
    }
  } catch (error) {
    console.error('Error fetching user status:', error);
    return null
  }
};