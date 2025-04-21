import axios from "axios";
import {auth} from "@/firebase";

export const apiClient = axios.create({
  baseURL: 'https://stage.theaigo.com:8000',
});

export const waitForAuthInit = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(!!user);
    });
  });
};

export const getCurrentToken = async (): Promise<string | null> => {
  try {
    await waitForAuthInit();
    const user = auth.currentUser;
    if (!user) return null;

    return await user.getIdToken();
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};
