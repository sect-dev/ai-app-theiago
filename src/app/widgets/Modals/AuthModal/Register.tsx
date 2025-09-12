import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import ImageModal from "@/../public/images/img/image-modal.webp";
import IconEye from "@/../public/images/icons/icon-eye.svg";
import IconGoogle from "@/../public/images/icons/icon-google.svg";
import IconFacebook from "@/../public/images/icons/icon-fb.webp";
import IconX from "@/../public/images/icons/icon-x.webp";
import clsx from "clsx";
import {
	signInWithX,
	signInWithFacebook,
	signInWithGoogle,
	signUpWithEmailAndPassword
} from "@/app/shared/api/auth";
import Spinner from "@/app/widgets/Spinner";
import Link from "next/link";
import { authErrorMessages } from "@/app/shared/consts";
import { useAuthStore } from "@/app/shared/store/authStore";

interface FormData {
	email: string;
	password: string;
}
interface AuthError {
	code: string;
}

const Register = () => {
	const { setAuthModal, setPaywallModal, shouldOpenPaymentModalThen, } = useAuthStore();
	const [loading, setLoading] = useState<boolean>(false);
	const [authError, setAuthError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>();

	const onSubmit = async (data: FormData) => {
		try {
			setLoading(true);
			setAuthError(null);
			await signUpWithEmailAndPassword(data.email, data.password);
			reset();
			setAuthModal({ modalType: null, isAuthModalActive: false });
		} catch (error) {
			const authError = error as AuthError;
			const errorMessage =
				authErrorMessages[authError.code] || authErrorMessages["default"];
			setAuthError(errorMessage);
		} finally {
			setLoading(false);
      if (shouldOpenPaymentModalThen) {
        setPaywallModal(true);
      }
		}
	};

	const onGoogleSignInHandler = async () => {
		try {
			await signInWithGoogle();
		} catch (error) {
			console.log("error", error);
		}
	};

	const onFacebookSignInHandler = async () => {
		try {
			await signInWithFacebook();
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

	return (
		<div className="flex justify-between overflow-hidden rounded-[24px] sm:h-full">
			<div className="w-full bg-[#121423] p-[20px] sm:flex sm:h-full sm:flex-col sm:items-center sm:justify-center sm:pt-[60px]">
				<p className="mb-[24px] text-[20px] font-semibold leading-[1.2em]">
					Create your account
				</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="mb-[32px] space-y-[16px] border-b border-b-[#3A3F63] pb-[32px] sm:w-full"
				>
					{/* Поле Email */}
					<div className="relative">
						<label
							htmlFor="email"
							className="mb-[8px] block pl-[16px] text-[12px] leading-[1.2em]"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							placeholder="Input your E-mail"
							className={clsx(
								"placeholder-text:opacity-50 h-[48px] w-full rounded-[12px] border border-transparent bg-[#191B2C] px-[16px] text-[14px] font-medium leading-[1.5em] outline-offset-0 transition-all duration-300 focus:border-[#049AEF] focus:outline-none focus:outline-offset-0",
								{
									"!border-[#BD0000]": errors.email
								}
							)}
							{...register("email", {
								required: "Email обязателен",
								pattern: {
									value: /^\S+@\S+\.\S+$/,
									message: "Некорректный email"
								}
							})}
						/>
						{errors.email && (
							<p className="absolute right-0 top-0 text-[12px] text-[#BD0000]">
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Поле Password */}
					<div className="relative">
						<label
							htmlFor="password"
							className="mb-[8px] block pl-[16px] text-[12px] leading-[1.2em]"
						>
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								placeholder="Enter password"
								className={clsx(
									"placeholder-text:opacity-50 h-[48px] w-full rounded-[12px] border border-transparent bg-[#191B2C] px-[16px] text-[14px] font-medium leading-[1.5em] outline-offset-0 transition-all duration-300 focus:border-[#049AEF] focus:outline-none focus:outline-offset-0",
									{
										"!border-[#BD0000]": errors.password
									}
								)}
								type={showPassword ? "text" : "password"}
								{...register("password", {
									required: "Password is required",
									minLength: { value: 6, message: "Min 6 characters" }
								})}
							/>
							<button
								type="button"
								className="text-gray-400 hover:text-gray-200 absolute right-2 top-1/2 flex size-[32px] -translate-y-1/2 items-center justify-center"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<Image
										src={IconEye.src}
										width={IconEye.width}
										height={IconEye.height}
										alt="icon eye"
									/>
								) : (
									<Image
										src={IconEye.src}
										width={IconEye.width}
										height={IconEye.height}
										alt="icon eye"
									/>
								)}
							</button>
						</div>
						{errors.password && (
							<p className="absolute right-0 top-0 text-[12px] text-[#BD0000]">
								{errors.password.message}
							</p>
						)}
					</div>

					{/*  Отображение ошибки авторизации */}
					{authError && (
						<p className="text-[14px] text-[#BD0000]">{authError}</p>
					)}

					{/* Кнопка отправки */}
					<button
						type="submit"
						disabled={loading}
						className="main-gradient !mt-[28px] flex h-[40px] w-full items-center justify-center gap-[10px] rounded-[12px] text-[20px] font-bold disabled:pointer-events-none disabled:bg-[#778899] disabled:bg-none"
					>
						<span className="relative z-[5]">Register</span>
						{loading && <Spinner />}
					</button>
				</form>
				<div className="flex flex-col items-center justify-center gap-[24px]">
					<p className="text-[16px] font-medium text-[#B5B5B5]">
						or continue with
					</p>
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
					{/* <div className="flex gap-[8px] pt-[40px] text-[12px]">
            <p>Dont have an account?</p>
            <button
              onClick={() =>
                setAuthModal({ modalType: "login", isAuthModalActive: true })
              }
              className="logo-gradient"
            >
              Sign in
            </button>
          </div> */}
				</div>
			</div>
			<div className="h-hull relative w-full sm:hidden">
				<Image
					src={ImageModal.src}
					fill
					alt="image modal"
					className="object-cover"
				/>
				<Link
					href="/"
					className="absolute bottom-[20px] left-[20px] block text-[34px] font-bold tracking-[0.04em] sm:text-[5.33vw]"
				>
					<span className="logo-gradient">Ai</span>
					<span className="">Go</span>
				</Link>
			</div>
		</div>
	);
};

export default Register;
