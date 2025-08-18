import React from "react";
import Image from "next/image";
import ImageError from "@/../public/images/img/payment/image-payment-error.webp";

const PaymentError = () => {
	return (
		<>
			<Image
				src={ImageError.src}
				width={ImageError.width}
				height={ImageError.height}
				alt="error image"
				className="mx-auto"
			/>
			<div className="mx-auto mb-[34px] max-w-[275px] space-y-[12px] pt-[32px] text-center">
				<p className="text-[24px] font-semibold leading-[1.2em]">
					Payment Cancelled
				</p>
				<p className="text-[17px] font-medium">
					We were unable to process this payment, please try again
				</p>
			</div>
			<button className="main-gradient h-[52px] w-full rounded-[12px] text-center text-[15px] font-bold">
				<span className="relative z-[5]">Try again</span>
			</button>
		</>
	);
};

export default PaymentError;
