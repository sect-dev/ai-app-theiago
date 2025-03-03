import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider
} from "firebase/auth";
import { auth } from "@/firebase";
import {FirebaseUser} from "@/app/shared/api/types/auth";

export const signUpWithEmailAndPassword = async (email: string, password: string): Promise<FirebaseUser> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user as FirebaseUser;
    user.accessToken = (userCredential.user as FirebaseUser).stsTokenManager.accessToken;

    if(user.accessToken) {
      localStorage.setItem("accessToken", user.accessToken);
    }

    return user;
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

    if(user.accessToken) {
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
    return { success: false, message: error.message };
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
    console.error("Ошибка входа через Google:", error.message);
    return {
      success: false,
      errorCode: error.code,
      errorMessage: error.message,
      email: error.customData?.email || null,
      credential: GoogleAuthProvider.credentialFromError(error),
    };
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
    console.error("Ошибка входа через Facebook:", error.message);

    return {
      success: false,
      errorCode: error.code,
      errorMessage: error.message,
      email: error.customData?.email || null,
      credential: FacebookAuthProvider.credentialFromError(error),
    };
  }
};



