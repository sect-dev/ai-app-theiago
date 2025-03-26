import React from 'react';
import Image from "next/image";
import {Dialog, DialogPanel} from "@headlessui/react";
import IconClose from "@/../public/images/icons/icon-modal-close.svg";
import {usePaymentStore} from "@/app/shared/store/paymentStore";
import clsx from "clsx";
import Spinner from "@/app/widgets/Spinner";
import IconX from "@/../public/images/icons/icon-x.webp";
import IconFacebook from "@/../public/images/icons/icon-fb.webp";
import IconGoogle from "@/../public/images/icons/icon-google.svg";
import ImageModal from "@/../public/images/img/image-modal.webp";
import ImageSuccess from '@/../public/images/img/payment/image-success.webp';
import {
  signInWithFacebook,
  signInWithGoogle,
  signInWithX
} from "@/app/shared/api/auth";
import {authErrorMessages} from "@/app/shared/conts";
import {useForm} from "react-hook-form";
import Link from "next/link";

interface FormData {
  email: string;
}

interface AuthError {
  code: string;
}

const SuccessPaymentModal = () => {
  const {isSuccessPaymentModalActive, setSuccessPaymentModal} = usePaymentStore()
  // const [loading,setLoading] = useState<boolean>(false)
  // const [authError, setAuthError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();


  const onSubmit = async (data: FormData) => {
    console.log('data',data)
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
    <Dialog open={isSuccessPaymentModalActive} as="div" className="relative z-10 focus:outline-none" onClose={() => setSuccessPaymentModal(false)}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto font-lato">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="w-screen h-full flex items-center justify-center flex-col pt-[45px]">
              <div className="w-[690px] h-[550px] mx-auto relative sm:size-full">
                <button
                  onClick={() => setSuccessPaymentModal(false)}
                  className="absolute z-[10] right-[20px] flex items-center justify-center top-[20px] bg-[#191B2C] rounded-[12px] size-[32px] sm:right-auto sm:left-[20px]"
                >
                  <Image
                    src={IconClose.src}
                    width={IconClose.width}
                    height={IconClose.height}
                    alt="icon close"
                  />
                </button>
                <div className="flex justify-between rounded-[24px] overflow-hidden sm:h-full">
                  <div className="w-full bg-[#121423] p-[20px] sm:flex sm:flex-col sm:items-center sm:justify-center sm:h-full">
                    <div className="font-bai-jamjuree mb-[24px] space-y-[8px]">
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
                        <input
                          id="email"
                          type="email"
                          placeholder="Input your E-mail"
                          className={clsx("w-full bg-[#191B2C] px-[16px] rounded-[12px] h-[48px] text-[14px] border border-transparent font-medium leading-[1.5em] transition-all duration-300  focus:border-[#049AEF] placeholder-text:opacity-50 focus:outline-none focus:outline-none outline-offset-0 focus:outline-offset-0", {
                            "!border-[#BD0000]": errors.email
                          })}
                          {...register("email", {
                            required: "Email обязателен",
                            pattern: { value: /^\S+@\S+\.\S+$/, message: "Некорректный email" }
                          })}
                        />
                        <p className="font-bai-jamjuree pt-[8px] px-[8px] text-[12px] font-medium opacity-50 leading-[1.2em]">This email will be used to login to your account. You can change it</p>
                        {errors.email && <p className="text-[#BD0000] text-[12px] absolute right-0 top-0">{errors.email.message}</p>}
                      </div>

                      {/*  Отображение ошибки авторизации */}
                      {/* {authError && <p className="text-[#BD0000] text-[14px]">{authError}</p>} */}


                      {/* Кнопка отправки */}
                      <button
                        type="submit"
                        // disabled={loading}
                        className="w-full main-gradient flex items-center justify-center gap-[10px] text-[20px] h-[40px] font-bold rounded-[12px] disabled:bg-none disabled:bg-[#778899] disabled:pointer-events-none"
                      >
                        <span className="relative z-[5]">Sign in</span>
                        {/* {loading && <Spinner/>} */}
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
                  <div className="w-full h-hull relative sm:hidden">
                    <Image
                      src={ImageModal.src}
                      fill
                      alt="image modal"
                      className="object-cover"
                    />
                    <Link href="/" className="font-bold block text-[34px] tracking-[0.04em] sm:text-[5.33vw] absolute left-[20px] bottom-[20px]">
                      <span className="logo-gradient ">Ai</span>
                      <span className="">Go</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );

};

export default SuccessPaymentModal;