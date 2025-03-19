import React, {useState} from 'react';
import Image from "next/image";
import { useForm } from "react-hook-form";
import ImageModal from '@/../public/images/img/image-modal.webp';
import IconEye from '@/../public/images/icons/icon-eye.svg';
import IconGoogle from '@/../public/images/icons/icon-google.svg'
import IconDiscord from '@/../public/images/icons/icon-discord.webp';
import IconX from '@/../public/images/icons/icon-x.webp';
import clsx from "clsx";
import {signUpWithEmailAndPassword} from "@/app/shared/api/auth";
import Spinner from "@/app/widgets/Spinner";
import Link from "next/link";
import {authErrorMessages} from "@/app/shared/conts";
import {useAuthStore} from "@/app/shared/store/authStore";

interface FormData {
  email: string;
  password: string;
}
interface AuthError {
  code: string;
}

const Register = () => {
  const {setAuthModal} = useAuthStore();
  const [loading,setLoading] = useState<boolean>(false)
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      setAuthError(null);
      await signUpWithEmailAndPassword(data.email,data.password)
      reset();
      setAuthModal({ modalType: null, isAuthModalActive: false })
    } catch (error) {
      const authError = error as AuthError;
      const errorMessage = authErrorMessages[authError.code] || authErrorMessages["default"];
      setAuthError(errorMessage);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex justify-between rounded-[24px] overflow-hidden sm:h-full">
      <div className="w-full bg-[#121423] p-[20px] sm:flex sm:flex-col sm:items-center sm:justify-center sm:h-full">
        <p className="mb-[24px] leading-[1.2em] font-semibold text-[20px]">Create your account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-[16px] pb-[32px] mb-[32px] border-b border-b-[#3A3F63] sm:w-full">
          {/* Поле Email */}
          <div className="relative">
            <label htmlFor="email" className="block text-[12px] pl-[16px] leading-[1.2em] mb-[8px]">Email</label>
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
            {errors.email && <p className="text-[#BD0000] text-[12px] absolute right-0 top-0">{errors.email.message}</p>}
          </div>

          {/* Поле Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-[12px] pl-[16px] leading-[1.2em] mb-[8px]">Password</label>
            <div className="relative">
              <input
                id="password"
                placeholder="Enter password"
                className={clsx("w-full bg-[#191B2C] px-[16px] rounded-[12px] h-[48px] text-[14px] border border-transparent font-medium leading-[1.5em] transition-all duration-300 focus:border-[#049AEF] placeholder-text:opacity-50 focus:outline-none outline-offset-0 focus:outline-offset-0", {
                  "!border-[#BD0000]": errors.password
                })}
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
              />
              <button
                type="button"
                className="absolute size-[32px] flex items-center justify-center right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword
                  ? <Image src={IconEye.src} width={IconEye.width} height={IconEye.height} alt="icon eye" />
                  : <Image src={IconEye.src} width={IconEye.width} height={IconEye.height} alt="icon eye" />
                }
              </button>
            </div>
            {errors.password && <p className="text-[#BD0000] text-[12px] absolute right-0 top-0">{errors.password.message}</p>}
          </div>

          {/*  Отображение ошибки авторизации */}
          {authError && <p className="text-[#BD0000] text-[14px]">{authError}</p>}

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={loading}
            className="w-full !mt-[28px] main-gradient flex items-center justify-center gap-[10px] text-[20px] h-[40px] font-bold rounded-[12px] disabled:bg-none disabled:bg-[#778899] disabled:pointer-events-none"
          >
            <span className="relative z-[5]">Register</span>
            {loading && <Spinner/>}
          </button>
        </form>
        <div className="flex flex-col justify-center items-center gap-[24px]">
          <p className=" font-medium text-[16px] text-[#B5B5B5]">or continue with</p>
          <div className="flex gap-[20px]">
            <button className="transition-transform duration-300 hover:scale-[1.025]">
              <Image
                src={IconX.src}
                width={IconX.width}
                height={IconX.height}
                alt="icon X"
              />
            </button>
            <button className="transition-transform duration-300 hover:scale-[1.025]">
              <Image
                src={IconDiscord.src}
                width={IconDiscord.width}
                height={IconDiscord.height}
                alt="icon discord"
              />
            </button>
            <button className="transition-transform duration-300 hover:scale-[1.025]">
              <Image
                src={IconGoogle.src}
                width={IconGoogle.width}
                height={IconGoogle.height}
                alt="icon google"
              />
            </button>
          </div>
          <div className="flex gap-[8px] text-[12px] pt-[40px]">
            <p>Dont have an account?</p>
            <button
              onClick={() => setAuthModal({ modalType: "login", isAuthModalActive: true })}
              className="logo-gradient"
            >
              Sign in
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
  );
};

export default Register;