import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import ImageModal from "@/../public/images/img/image-modal.webp";
import clsx from "clsx";
import Spinner from "@/app/widgets/Spinner";
import { resetPasswordHandler } from "@/app/shared/api/auth";
import Link from "next/link";
// import {useAuthStore} from "@/app/shared/store/authStore";

interface FormData {
	email: string;
	password: string;
}

const ForgotPassword = () => {
	// const {setAuthModal} = useAuthStore()
	const [loading, setLoading] = useState<boolean>(false);
	const [result, setResult] = useState<string>("");
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>();

	const onSubmit = async (data: FormData) => {
		try {
			setLoading(true);
			const resp = await resetPasswordHandler(data.email);
			setResult(resp.message);

			reset();
			// setAuthModal({ modalType: null, isAuthModalActive: false })
		} catch (error) {
			console.log("error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex h-full justify-between overflow-hidden rounded-[24px]">
			<div className="w-full bg-[#121423] p-[20px] sm:flex sm:h-full sm:flex-col sm:items-center sm:justify-center">
				<p className="mb-[24px] text-[20px] font-semibold leading-[1.2em]">
					Recover your password
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
								required: "Email is required",
								pattern: { value: /^\S+@\S+\.\S+$/, message: "Wrong email" }
							})}
						/>
						{errors.email && (
							<p className="absolute right-0 top-0 text-[12px] text-[#BD0000]">
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Кнопка отправки */}
					<button
						type="submit"
						disabled={loading}
						className="main-gradient !mt-[28px] flex h-[40px] w-full items-center justify-center gap-[10px] rounded-[12px] text-[20px] font-bold disabled:pointer-events-none disabled:bg-[#778899] disabled:bg-none"
					>
						<span className="relative z-[5]">Recover</span>
						{loading && <Spinner />}
					</button>
					{result && <p className="animate-fadeIn text-center">{result}</p>}
				</form>
				{/* <div className="flex flex-col items-center justify-center gap-[24px]">
          <div className="flex gap-[8px] text-[12px]">
            <p>Dont have an account?</p>
            <Link
              href={process.env.NEXT_PUBLIC_QUIZ_URL ?? ""}
              className="logo-gradient"
            >
              Register now
            </Link>
          </div>
        </div> */}
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

export default ForgotPassword;
