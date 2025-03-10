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

  if (firebaseUser) {
    const token = await firebaseUser.getIdToken();
    if (firebaseUser.isAnonymous) {
      localStorage.setItem("uid", firebaseUser.uid);
      localStorage.setItem("tempToken", token);
      setUser(firebaseUser);
    } else {
      localStorage.removeItem("uid");
      localStorage.removeItem("tempToken");
      localStorage.setItem("accessToken", token);
      setAuthModal({ modalType: null, isAuthModalActive: false });
      setUser(firebaseUser);
    }
  } else {
    localStorage.removeItem("uid");
    localStorage.removeItem("tempToken");
    localStorage.removeItem("accessToken");
    setUser(null);
  }
});

