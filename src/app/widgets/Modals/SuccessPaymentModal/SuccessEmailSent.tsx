import React, { FC } from "react";
import Image from "next/image";
import SuccessEmailIcon from "@/../public/images/img/image-email-sent.webp";

interface ComponentProps {
  changeEmailHandler: () => void;
  emailSent: string;
}

const SuccessEmailSent: FC<ComponentProps> = ({
  changeEmailHandler,
  emailSent,
}) => {
  return (
    <div className="w-full space-y-[16px] p-[20px]">
      <div className="flex flex-col items-center justify-center space-y-[12px] rounded-[24px] bg-[#191B2C] px-[16px] py-[40px] font-bai-jamjuree">
        <Image
          src={SuccessEmailIcon.src}
          width={SuccessEmailIcon.width}
          height={SuccessEmailIcon.height}
          alt="success email sent icon"
        />
        <p className="text-[24px] font-semibold">E-mail sent</p>
        <p className="mx-auto max-w-[270px] text-center text-[16px] font-medium">
          We have sent you an email to {emailSent}. To activate your
          subscription, please click the link in the email. Don&apos;t forget to
          check the &quot;Spam&quot; folder.
        </p>
      </div>
      <div className="text-center text-[12px]">
        Did the email not arrive?{" "}
        <button onClick={changeEmailHandler} className="logo-gradient">
          Change email
        </button>
      </div>
    </div>
  );
};

export default SuccessEmailSent;
