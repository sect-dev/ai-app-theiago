import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user: User | null) => set({ user, loading: false }),
}));

onAuthStateChanged(auth, async (firebaseUser) => {
  const setUser = useAuthStore.getState().setUser;
  const { setAuthModal } = useSelectedCardStore.getState();

  if(firebaseUser && firebaseUser.isAnonymous) {
    const token = await firebaseUser.getIdToken();
    localStorage.setItem("tempToken", token);
    setUser(null)
    return
  }

  if (firebaseUser) {
    const token = await firebaseUser.getIdToken();
    localStorage.setItem("accessToken", token);
    localStorage.removeItem("tempToken");
    setAuthModal({modalType:null, isAuthModalActive: false})
    setUser(firebaseUser);
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tempToken");
    setUser(null);
  }
});

