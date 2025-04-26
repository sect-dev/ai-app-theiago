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
    <div className="w-full p-[20px] space-y-[16px]">
      <div className="bg-[#191B2C] font-bai-jamjuree flex flex-col items-center justify-center rounded-[24px] space-y-[12px] px-[16px] py-[40px]">
        <Image
          src={SuccessEmailIcon.src}
          width={SuccessEmailIcon.width}
          height={SuccessEmailIcon.height}
          alt="success email sent icon"
        />
        <p className="text-[24px] font-semibold">E-mail sent</p>
        <p className="text-[16px] font-medium max-w-[270px] mx-auto text-center">
          We have sent you an email to {emailSent}. To activate your
          subscription, please click the link in the email. Don&apos;t forget to
          check the &quot;Spam&quot; folder.
        </p>
      </div>
      <div className="text-center text-[12px]">
        Did the email not arrive?{" "}
        <button onClick={changeEmailHandler} className="logo-gradient ">
          Change email
        </button>
      </div>
    </div>
  );
};

export default SuccessEmailSent;
