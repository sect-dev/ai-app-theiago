import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  isAuthModalActive: boolean
  modalType: "login" | "register" | "forgotPass" | null,
  setAuthModal: (value: { modalType: "login" | "register" | "forgotPass" | null; isAuthModalActive: boolean }) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  isAuthModalActive: false,
  modalType: "register",
  setUser: (user: User | null) => set({ user, loading: false }),
  setAuthModal: (value: { modalType: "login" | "register" | "forgotPass" | null; isAuthModalActive: boolean }) => set({modalType: value.modalType, isAuthModalActive:value.isAuthModalActive}),
}));

onAuthStateChanged(auth, async (firebaseUser) => {
  const setUser = useAuthStore.getState().setUser;
  const { setAuthModal } = useAuthStore.getState();

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

