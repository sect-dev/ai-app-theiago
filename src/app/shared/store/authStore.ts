import { create } from "zustand";
import {isSignInWithEmailLink, onAuthStateChanged, signInWithEmailLink, User} from "firebase/auth";
import { auth } from "@/firebase";
import notification from "@/app/widgets/Notification";
import {useSearchParams} from "next/navigation";
import {FirebaseUser} from "@/app/shared/api/types/auth";

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
  let email = localStorage.getItem('emailForSignIn');
  if (isSignInWithEmailLink(auth, window.location.href)) {
    try {
      const result = await signInWithEmailLink(auth, email ?? '', window.location.href);
      const user = result.user as FirebaseUser
      if(result) {
        localStorage.removeItem("uid");
        localStorage.removeItem("tempToken");
        localStorage.removeItem("emailForSignIn");
        localStorage.setItem("accessToken", user.accessToken);
        setUser(result.user);
        return window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (error) {
      notification.open({
        title: 'Error',
        description: 'Your account is already registered',
        type: 'error',
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
  if (firebaseUser) {
    const token = await firebaseUser.getIdToken();
    if (firebaseUser.isAnonymous) {
      localStorage.setItem("uid", firebaseUser.uid);
      localStorage.setItem("tempToken", token);
      setUser(firebaseUser);
    } else {
      localStorage.removeItem("uid");
      localStorage.removeItem("tempToken");
      localStorage.removeItem("emailForSignIn");
      localStorage.setItem("accessToken", token);
      setAuthModal({ modalType: null, isAuthModalActive: false });
      setUser(firebaseUser);
    }
  } else {
    localStorage.removeItem("uid");
    localStorage.removeItem("tempToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("emailForSignIn");
    setUser(null);
  }
});

