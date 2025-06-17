import { useState } from "react";
import IconArrowDown from "@/../public/images/icons/icon-arrow-bottom-white.svg";
import IconArrowUp from "@/../public/images/icons/icon-arrow-up-white.svg";
import Image from "next/image";

const FAQS = [
  {
    question: "What is an AI girl and how does it work?",
    answer:
      "AI girl is a virtual character created using artificial intelligence. You can customize her appearance and personality, after which she will communicate with you via text messages, adapting to your preferences.",
  },
  {
    question: "Can I customize the appearance and character of the AI girl?",
    answer:
      "Yes, you can adjust her looks and personality traits to suit your preferences.",
  },
  {
    question: "How realistic is the AI girl?",
    answer:
      "The AI girl uses advanced natural language processing and machine learning to simulate realistic conversations and reactions.",
  },
  {
    question: "Can I chat with an AI girl 24/7?",
    answer:
      "Yes, she is always available to chat, any time of the day or night.",
  },
  {
    question: "Is it safe to chat with an AI girl?",
    answer:
      "Yes, it is safe. Your conversations are private and the AI follows strict safety protocols.",
  },
];

const QuestionsComponent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mb-[16px] space-y-3 text-white">
      <h2 className="mb-[16px] text-center text-[20px] font-semibold leading-[120%]">
        Any questions left?
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
