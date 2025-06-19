import { useState } from "react";
import IconArrowDown from "@/../public/images/icons/icon-arrow-bottom-white.svg";
import IconArrowUp from "@/../public/images/icons/icon-arrow-up-white.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

const QuestionsComponent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = useTranslations("Paywall");

  const FAQS = [
    {
      question: t("what_is_an_ai_girl_and_how_does_it_work"),
      answer: t("what_is_an_ai_girl_and_how_does_it_work_description"),
    },
    {
      question: t(
        "can_i_customize_the_appearance_and_character_of_the_ai_girl",
      ),
      answer: t(
        "can_i_customize_the_appearance_and_character_of_the_ai_girl_description",
      ),
    },
    {
      question: t("how_realistic_is_the_ai_girl"),
      answer: t("how_realistic_is_the_ai_girl_description"),
    },
    {
      question: t("can_i_chat_with_an_ai_girl_24_7"),
      answer: t("can_i_chat_with_an_ai_girl_24_7_description"),
    },
    {
      question: t("is_it_safe_to_chat_with_an_ai_girl"),
      answer: t("is_it_safe_to_chat_with_an_ai_girl_description"),
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mb-[16px] space-y-3 text-white">
      <h2 className="mb-[16px] text-center text-[20px] font-semibold leading-[120%]">
        {t("any_questions_left")}
      </h2>
      {FAQS.map((faq, index) => (
        <div
          key={index}
          className="animate-fadeIn cursor-pointer rounded-[20px] bg-[#2b2c34] p-[16px]"
        >
          <div
            className="flex items-center justify-between"
            onClick={() => toggle(index)}
          >
            <h3 className="mb-[12px] mr-[24px] text-[18px] font-bold leading-[120%]">
              {faq.question}
            </h3>
            {openIndex === index ? (
              <Image
                src={IconArrowUp.src}
                alt="icon arrow up"
                width={IconArrowUp.width}
                height={IconArrowUp.height}
                className="animate-fadeIn"
              />
            ) : (
              <Image
                src={IconArrowDown.src}
                alt="icon arrow down"
                width={IconArrowDown.width}
                height={IconArrowDown.height}
                className="animate-fadeIn"
              />
            )}
          </div>
          {openIndex === index && (
            <p className="text-[14px] font-medium leading-[24px] opacity-60">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionsComponent;
