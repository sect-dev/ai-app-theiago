import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signInAnonymously,
  linkWithCredential,
  EmailAuthProvider,
  TwitterAuthProvider
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/firebase";
import {FirebaseUser} from "@/app/shared/api/types/auth";
import {apiClient} from "@/app/shared/api/index";
import {useAuthStore} from "@/app/shared/store/authStore";

export const signUpWithEmailAndPassword = async (email: string, password: string): Promise<FirebaseUser> => {
  try {
    const currentUser = auth.currentUser;

    if (currentUser && currentUser.isAnonymous) {
      const credential = EmailAuthProvider.credential(email, password);
      const userCredential = await linkWithCredential(currentUser, credential);

      const user = userCredential.user as FirebaseUser;
      user.accessToken = (userCredential.user as FirebaseUser).stsTokenManager.accessToken;

      if (user.accessToken) {
        localStorage.setItem("accessToken", user.accessToken);
        localStorage.removeItem("uid");
        localStorage.removeItem("tempToken");
      }

      const setUser = useAuthStore.getState().setUser;
      const { setAuthModal } = useAuthStore.getState();

      setAuthModal({ modalType: null, isAuthModalActive: false });
      setUser(user);

      return user;
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user as FirebaseUser;
      user.accessToken = (userCredential.user as FirebaseUser).stsTokenManager.accessToken;

      if (user.accessToken) {
        localStorage.setItem("accessToken", user.accessToken);
      }

      return user;
    }
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    throw error;
  }
};

export const signInWithEmailAndPasswordHandler = async (email: string, password: string): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user as FirebaseUser;
    user.accessToken = (userCredential.user as FirebaseUser).stsTokenManager.accessToken;

    if (user.accessToken) {
      localStorage.setItem("accessToken", user.accessToken);
    }

    return user;
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    throw error;
  }
};

export const resetPasswordHandler = async (email: string) => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);

    return { success: true, message: "✅ Letter sent! Check your mail." };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Произошла неизвестная ошибка" };
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    const user = result.user;
    if(accessToken) {
      localStorage.setItem("accessToken", accessToken);
      return user
    }
    return user
  } catch (error) {
    const firebaseError = error as FirebaseError;
    
    if (firebaseError.code) {
      return {
        success: false,
        errorCode: firebaseError.code,
        errorMessage: firebaseError.message,
        email: firebaseError.customData?.email || null,
        credential: GoogleAuthProvider.credentialFromError(firebaseError),
      };
    }

    return { success: false, message: "An error occurred while authorizing by Google" }
  }
};

export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    if(accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    return { user, accessToken };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    
    if (firebaseError.code) {
      return {
        success: false,
        errorCode: firebaseError.code,
        errorMessage: firebaseError.message,
        email: firebaseError.customData?.email || null,
        credential: GoogleAuthProvider.credentialFromError(firebaseError),
      };
    }

    return { success: false, message: "An error occurred while authorizing by X" }
  }
};

export const signInWithX = async () => {
  const provider = new TwitterAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;

    const user = result.user;
    if(accessToken) {
      localStorage.setItem("accessToken", accessToken);
      return user
    }
    return user
  } catch (error) {
    const firebaseError = error as FirebaseError;

    if (firebaseError.code) {
      return {
        success: false,
        errorCode: firebaseError.code,
        errorMessage: firebaseError.message,
        email: firebaseError.customData?.email || null,
        credential: TwitterAuthProvider.credentialFromError(firebaseError),
      };
    }

    return { success: false, message: "An error occurred while authorizing by Twitter" }
  }
}

export const signInAnonymouslyHandler = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;

    if (user.uid && user.isAnonymous) {
      const token = await user.getIdToken();
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("tempToken", token);
      await registerAnonymousUser();
      return;
    }
  } catch (error) {
    console.error("Ошибка анонимной авторизации:", error);
    throw error;
  }
};

export const registerAnonymousUser = async (): Promise<void> => {
  try {
    await apiClient.get('/register_anonymous_web_user');
    return;
  } catch (error) {
    console.error('Ошибка при регистрации анонимного пользователя:', error);
    return;
  }
};



