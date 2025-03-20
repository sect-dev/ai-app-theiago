import React, {useState} from 'react';
import Image from "next/image";
import { useForm } from "react-hook-form";
import ImageModal from '@/../public/images/img/image-modal.webp';
import clsx from "clsx";
import Spinner from "@/app/widgets/Spinner";
import {resetPasswordHandler} from "@/app/shared/api/auth";
import Link from "next/link";
import {useAuthStore} from "@/app/shared/store/authStore";

interface FormData {
  email: string;
  password: string;
}

const ForgotPassword = () => {
  const {setAuthModal} = useAuthStore()
  const [loading,setLoading] = useState<boolean>(false)
  const [result,setResult] = useState<string>('')
  const { register, reset, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {

    try {
      setLoading(true)
      const resp = await resetPasswordHandler(data.email)
      setResult(resp.message)

      reset();
      // setAuthModal({ modalType: null, isAuthModalActive: false })
    } catch (error) {
      console.log('error')
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex justify-between rounded-[24px] overflow-hidden h-full">
      <div className="w-full bg-[#121423] p-[20px] sm:flex sm:flex-col sm:items-center sm:justify-center sm:h-full">
        <p className="mb-[24px] leading-[1.2em] font-semibold text-[20px]">Recover your password</p>
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
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Wrong email" }
              })}
            />
            {errors.email && <p className="text-[#BD0000] text-[12px] absolute right-0 top-0">{errors.email.message}</p>}
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={loading}
            className="w-full !mt-[28px] main-gradient flex items-center justify-center gap-[10px] text-[20px] h-[40px] font-bold rounded-[12px] disabled:bg-none disabled:bg-[#778899] disabled:pointer-events-none"
          >
            <span className="relative z-[5]">Recover</span>
            {loading && <Spinner/>}
          </button>
          {result && <p className="animate-fadeIn text-center">{result}</p>}
        </form>
        <div className="flex flex-col justify-center items-center gap-[24px]">
          <div className="flex gap-[8px] text-[12px]">
            <p>Dont have an account?</p>
            <button
              onClick={() => setAuthModal({ modalType: "register", isAuthModalActive: true })}
              className="logo-gradient"
            >
              Register now
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

export default ForgotPassword;