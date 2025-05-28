"use client";
//General
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useForm } from "react-hook-form";
//API
import {
  getEmailByOrderNumber,
  handleEmailLinkAuth,
  signInWithFacebook,
  signInWithGoogle,
  signInWithX,
} from "@/app/shared/api/auth";
import { apiClient } from "@/app/shared/api";
import { Character } from "@/app/shared/api/types";
import SuccessEmailSent from "@/app/widgets/Modals/SuccessPaymentModal/SuccessEmailSent";
//Components
import notification from "@/app/widgets/Notification";
import Spinner from "@/app/widgets/Spinner";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
//Images
import IconX from "@/../public/images/icons/icon-x.webp";
import IconFacebook from "@/../public/images/icons/icon-fb.webp";
import IconGoogle from "@/../public/images/icons/icon-google.svg";
import ImageDefault from "@/../public/images/img/payment/image-no-char-id.webp";
import ImageSuccess from "@/../public/images/img/payment/image-success.webp";
import IconClose from "@/../public/images/icons/icon-close.svg";
import { safeLocalStorage } from "@/app/shared/helpers";

interface FormData {
  email: string;
}

const SuccessPayment = () => {
  const { charFromPaywall } = useSelectedCardStore();
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string | null>(
    searchParams.get("order_number"),
  );
  const [characterId, setCharacterId] = useState<string | null>(
    searchParams.get("character_id"),
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [charInfo, setCharInfo] = useState<Character | null>(null);
  const [characterLoading, setCharacterLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<string>("");
  const [pendingActivationParams, setPendingActivationParams] = useState<
    string | null
  >(null);
  // const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const characterImage = charInfo ? charInfo.avatar : ImageDefault.src;
  const messageValue = watch("email");

  const getCharacterInfoById = async (id: string) => {
    try {
      setCharacterLoading(true);
      const response = await apiClient.get(`/character_info?id=${id}`);
      const result = JSON.parse(JSON.stringify(response.data));
      return setCharInfo(result);
    } catch (error) {
      console.log(error);
    } finally {
      setCharacterLoading(false);
    }
  };

  const getUserEmail = async (orderId: string) => {
    try {
      const response = await getEmailByOrderNumber(orderId);
      setValue("email", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const charId = characterId ? characterId : charFromPaywall?.character_id;
    const emailForSighIn =
      typeof window !== "undefined" && localStorage.getItem("emailForSignIn");

    // Получаем параметры из pendingSubscriptionActivation
    const pendingActivation =
      typeof window !== "undefined"
        ? localStorage.getItem("pendingSubscriptionActivation")
        : null;

    if (pendingActivation) {
      try {
        const activationData = JSON.parse(pendingActivation);
        if (activationData.searchParams) {
          setPendingActivationParams(activationData.searchParams);

          // Извлекаем order_number и character_id из searchParams
          const params = new URLSearchParams(activationData.searchParams);
          const pendingOrderNumber = params.get("order_number");
          const pendingCharacterId = params.get("character_id");

          if (pendingOrderNumber) {
            setOrderNumber(pendingOrderNumber);
          }

          if (pendingCharacterId) {
            setCharacterId(pendingCharacterId);
          }
        }
      } catch (error) {
        console.error("Error parsing pendingActivation:", error);
      }
    }

    if (charId) {
      getCharacterInfoById(charId ?? "");
    }

    if (orderNumber) {
      getUserEmail(orderNumber);
    }

    if (emailForSighIn) {
      setEmailSent(emailForSighIn);
    }
  }, []);

  const changeEmailHandler = () => {
    setEmailSent("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("emailForSignIn");
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Сохраняем email в localStorage для последующего использования
      if (typeof window !== "undefined") {
        localStorage.setItem("emailForSignIn", data.email);
      }

      // Формируем URL для перенаправления
      const autologinUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/first_autologin?email=${encodeURIComponent(data.email)}`;

      console.log("Перенаправляем пользователя на:", autologinUrl);

      // Перенаправляем пользователя на URL first_autologin
      window.location.href = autologinUrl;
    } catch (error) {
      console.error("Redirect error:", error);
      notification.open({
        title: "Error",
        type: "error",
        description: "Failed to redirect for authentication. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSignInHandler = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log("error", error);
    }
  };

  const onXSignInHandler = async () => {
    try {
      await signInWithX();
    } catch (error) {
      console.log(error);
    }
  };

  const onFacebookSignInHandler = async () => {
    try {
      await signInWithFacebook();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex justify-between overflow-hidden rounded-[24px] bg-[#121423] sm:h-auto sm:overflow-visible">
      {emailSent ? (
        <SuccessEmailSent
          emailSent={emailSent}
          changeEmailHandler={changeEmailHandler}
        />
      ) : (
        <div className="w-full p-[20px] sm:relative sm:z-[5] sm:mt-[-200px] sm:flex sm:h-full sm:flex-col sm:items-center sm:justify-center">
          <div className="mb-[24px] space-y-[8px] font-bai-jamjuree sm:w-full">
            <Image
              src={ImageSuccess.src}
              width={ImageSuccess.width}
              height={ImageSuccess.height}
              alt="image success"
            />
            <p className="text-[20px] font-semibold leading-[1.2em]">
              Payment was successful! 🎉
            </p>
            <p className="text-[14px] font-medium">
              Sign up to activate your subscription
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-[32px] space-y-[24px] border-b border-b-[#3A3F63] pb-[32px] sm:w-full"
          >
            {/* Поле Email */}

            <div className="relative">
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="Input your E-mail"
                  className={clsx(
                    "placeholder-text:opacity-50 h-[48px] w-full animate-fadeIn rounded-[12px] border border-transparent bg-[#191B2C] px-[16px] pr-[32px] text-[14px] font-medium leading-[1.5em] outline-offset-0 transition-all delay-300 duration-300 focus:border-[#049AEF] focus:outline-none focus:outline-offset-0",
                    {
                      "!border-[#BD0000]": errors.email,
                    },
                  )}
                  {...register("email", {
                    required: "Email обязателен",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Некорректный email",
                    },
                  })}
                />
                {messageValue && (
                  <button
                    onClick={() => reset()}
                    className={
                      "absolute right-[10px] top-1/2 -translate-y-1/2 animate-fadeIn"
                    }
                  >
                    <Image
                      src={IconClose.src}
                      width={IconClose.width}
                      height={IconClose.height}
                      alt="clean form"
                    />
                  </button>
                )}
              </div>

              <p className="px-[8px] pt-[8px] font-bai-jamjuree text-[12px] font-medium leading-[1.2em] opacity-50">
                This email will be used to login to your account. You can change
                it
              </p>
              {errors.email && (
                <p className="absolute right-0 top-[-20px] text-[12px] text-[#BD0000]">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/*  Отображение ошибки авторизации */}
            {/* {authError && <p className="text-[#BD0000] text-[14px]">{authError}</p>} */}

            {/* Кнопка отправки */}
            <button
              type="submit"
              disabled={loading}
              className="main-gradient flex h-[40px] w-full items-center justify-center gap-[10px] rounded-[12px] text-[20px] font-bold disabled:pointer-events-none disabled:bg-[#778899] disabled:bg-none"
            >
              <span className="relative z-[5]">Sign in</span>
              {loading && <Spinner />}
            </button>
          </form>
          <div className="flex flex-col items-center justify-center gap-[24px]">
            {/* <p className="text-[16px] font-medium text-[#B5B5B5]">
              or continue with
            </p> */}
            {/* <div className="flex gap-[20px]">
              <button
                onClick={onXSignInHandler}
                className="transition-transform duration-300 hover:scale-[1.025]"
              >
                <Image
                  src={IconX.src}
                  width={IconX.width}
                  height={IconX.height}
                  alt="icon X"
                />
              </button> */}
            {/* <button
                onClick={onFacebookSignInHandler}
                className="transition-transform duration-300 hover:scale-[1.025]"
              >
                <Image
                  src={IconFacebook.src}
                  width={IconFacebook.width}
                  height={IconFacebook.height}
                  alt="icon discord"
                />
              </button> */}
            {/* <button
                onClick={onGoogleSignInHandler}
                className="transition-transform duration-300 hover:scale-[1.025]"
              >
                <Image
                  src={IconGoogle.src}
                  width={IconGoogle.width}
                  height={IconGoogle.height}
                  alt="icon google"
                />
              </button>
            </div> */}
          </div>
        </div>
      )}
      <div className="h-hull relative w-full sm:hidden">
        {characterLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Image
            src={characterImage}
            fill
            alt="image modal"
            className="animate-fadeIn object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default SuccessPayment;
