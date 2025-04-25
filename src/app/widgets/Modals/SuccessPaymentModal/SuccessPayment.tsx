'use client'
//General
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {useSearchParams} from "next/navigation";
import clsx from "clsx";
import {useForm} from "react-hook-form";
//API
import {
  getEmailByOrderNumber,
  handleEmailLinkAuth,
  signInWithFacebook,
  signInWithGoogle,
  signInWithX
} from "@/app/shared/api/auth";
import {apiClient} from "@/app/shared/api";
import {Character} from "@/app/shared/api/types";
import SuccessEmailSent from "@/app/widgets/Modals/SuccessPaymentModal/SuccessEmailSent";
//Components
import notification from "@/app/widgets/Notification";
import Spinner from "@/app/widgets/Spinner";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
//Images
import IconX from "@/../public/images/icons/icon-x.webp";
import IconFacebook from "@/../public/images/icons/icon-fb.webp";
import IconGoogle from "@/../public/images/icons/icon-google.svg";
import ImageDefault from '@/../public/images/img/payment/image-no-char-id.webp';
import ImageSuccess from "@/../public/images/img/payment/image-success.webp";
import IconClose from "@/../public/images/icons/icon-close.svg";

interface FormData {
  email: string;
}

const SuccessPayment = () => {
  const {charFromPaywall} = useSelectedCardStore()
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order_number');
  const characterId = searchParams.get('character_id');

  const [loading,setLoading] = useState<boolean>(false);
  const [charInfo,setCharInfo] = useState<Character | null>(null);
  const [characterLoading, setCharacterLoading] = useState<boolean>(false);
  const [emailSent,setEmailSent] = useState<string>('')
  // const [authError, setAuthError] = useState<string | null>(null);
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<FormData>();
  const characterImage = charInfo ? charInfo.avatar : ImageDefault.src;
  const messageValue = watch("email");

  const getCharacterInfoById = async (id: string) => {
    try {
      setCharacterLoading(true)
      const response = await apiClient.get(`/character_info?id=${id}`);
      const result = JSON.parse(JSON.stringify(response.data))
      return setCharInfo(result)
    } catch (error) {
      console.log(error)
    } finally {
      setCharacterLoading(false)
    }
  }

  const getUserEmail = async (orderId:string) => {
    try {
      const response = await getEmailByOrderNumber(orderId);
      setValue('email',response)
    } catch (error) {
      console.log('error',error)
    }
  }

  useEffect(() => {
    const charId = characterId ? characterId : charFromPaywall?.character_id;
    const emailForSighIn = typeof window !== 'undefined' && localStorage.getItem('emailForSignIn')
    if(charId) {
      getCharacterInfoById(charId ?? '')
      getUserEmail(orderNumber ?? '')
    }
    if(emailForSighIn) {
      setEmailSent(emailForSighIn);
    }
  }, [])

  const changeEmailHandler = () => {
    setEmailSent('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('emailForSignIn');
    }
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const resp = await handleEmailLinkAuth(data.email)

      if(resp && resp?.success) {
        notification.open({
          title: 'Message sent',
          type: 'success',
          description: 'We have sent you an email to confirm your address',
        });
        setEmailSent(data.email)
        reset()
      }
    } catch (error) {
      console.log('error',error)
    } finally {
      setLoading(false)
    }
  };

  const onGoogleSignInHandler = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.log('error',error)
    }
  }

  const onXSignInHandler = async () => {
    try {
      await signInWithX()
    } catch (error) {
      console.log(error)
    }
  }

  const onFacebookSignInHandler = async () => {
    try {
      await signInWithFacebook()
    } catch (error) {
      console.log('error',error)
    }
  }

  return (
    <div className="flex justify-between bg-[#121423] rounded-[24px] overflow-hidden  sm:overflow-visible sm:h-auto">
      {emailSent
        ?  <SuccessEmailSent emailSent={emailSent} changeEmailHandler={changeEmailHandler} />
        :  <div className="w-full p-[20px] sm:relative sm:z-[5] sm:flex sm:flex-col sm:items-center sm:mt-[-200px] sm:justify-center sm:h-full">
          <div className="font-bai-jamjuree mb-[24px] space-y-[8px] sm:w-full">
            <Image
              src={ImageSuccess.src}
              width={ImageSuccess.width}
              height={ImageSuccess.height}
              alt="image success"
            />
            <p className="leading-[1.2em] font-semibold text-[20px]">Payment was successful!  🎉</p>
            <p className="text-[14px] font-medium">Sign up to activate your subscription</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-[24px] pb-[32px] mb-[32px] border-b border-b-[#3A3F63] sm:w-full">
            {/* Поле Email */}

            <div className="relative">
              {characterLoading
                ? <div className="animate-pulse w-full bg-[#191B2C] px-[16px] rounded-[12px] h-[48px]" />
                : <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="Input your E-mail"
                    className={clsx("w-full animate-fadeIn delay-300 bg-[#191B2C] px-[16px] pr-[32px] rounded-[12px] h-[48px] text-[14px] border border-transparent font-medium leading-[1.5em] transition-all duration-300  focus:border-[#049AEF] placeholder-text:opacity-50 focus:outline-none focus:outline-none outline-offset-0 focus:outline-offset-0", {
                      "!border-[#BD0000]": errors.email
                    })}
                    {...register("email", {
                      required: "Email обязателен",
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Некорректный email" }
                    })}
                  />
                  {messageValue &&
                    <button
                      onClick={() => reset()}
                      className={"animate-fadeIn absolute right-[10px] top-1/2 -translate-y-1/2"}
                    >
                      <Image
                        src={IconClose.src}
                        width={IconClose.width}
                        height={IconClose.height}
                        alt="clean form"
                      />
                    </button>
                  }
                </div>
              }

              <p className="font-bai-jamjuree pt-[8px] px-[8px] text-[12px] font-medium opacity-50 leading-[1.2em]">This email will be used to login to your account. You can change it</p>
              {errors.email && <p className="text-[#BD0000] text-[12px] absolute right-0 top-[-20px]">{errors.email.message}</p>}
            </div>

            {/*  Отображение ошибки авторизации */}
            {/* {authError && <p className="text-[#BD0000] text-[14px]">{authError}</p>} */}

            {/* Кнопка отправки */}
            <button
              type="submit"
              disabled={loading}
              className="w-full main-gradient flex items-center justify-center gap-[10px] text-[20px] h-[40px] font-bold rounded-[12px] disabled:bg-none disabled:bg-[#778899] disabled:pointer-events-none"
            >
              <span className="relative z-[5]">Sign in</span>
              {loading && <Spinner/>}
            </button>
          </form>
          <div className="flex flex-col justify-center items-center gap-[24px]">
            <p className=" font-medium text-[16px] text-[#B5B5B5]">or continue with</p>
            <div className="flex gap-[20px]">
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
              </button>
              <button
                onClick={onFacebookSignInHandler}
                className="transition-transform duration-300 hover:scale-[1.025]"
              >
                <Image
                  src={IconFacebook.src}
                  width={IconFacebook.width}
                  height={IconFacebook.height}
                  alt="icon discord"
                />
              </button>
              <button
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
            </div>
          </div>
        </div>
      }
      <div className="w-full h-hull relative sm:hidden">
        {characterLoading
          ? <div className="animate-pulse size-full bg-[#2B2D44]" />
          :  <Image
              src={characterImage}
              fill
              alt="image modal"
              className="object-cover animate-fadeIn"
            />
        }
      </div>
    </div>
  );
};

export default SuccessPayment;