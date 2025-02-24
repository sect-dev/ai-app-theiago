import React, {FC, useState} from 'react';
import Image from "next/image";
import IconReload from '@/../public/images/icons/icon-reload.svg';
import Spinner from "@/app/widgets/Spinner";
import clsx from "clsx";

const answersData = [
  "Hey there! What’s on your mind tonight?",
  "You have such an interesting vibe. Tell me more about yourself.",
  "If we were on a date right now, where would you take me?",
  "What’s your biggest turn-on in a conversation?",
  "Do you like to take control, or do you prefer to be led?",
  "What’s the most adventurous thing you’ve ever done?",
  "If I whispered something naughty in your ear, how would you react?",
  "Tell me a secret you’ve never shared with anyone before.",
  "Describe your ideal romantic night in just three words.",
  "Do you believe in love at first sight, or should I walk by again?",
  "What’s your wildest fantasy?",
  "If I were right next to you, what would you do to me?",
  "What’s something you wish your partner would do more often?",
  "Do you prefer slow and sensual or wild and passionate?",
  "If I asked you to close your eyes and imagine us together, what do you see?",
  "What’s your guilty pleasure when it comes to romance?",
  "If we could escape anywhere together right now, where would we go?",
  "Would you rather have a night of deep conversation or passionate silence?",
  "What’s one question you’ve always wanted to ask your partner but never did?",
  "If I kissed you right now, how would you react?",
  "What’s the most unexpected place you’ve ever had a romantic moment?",
  "How do you like to be seduced?",
  "What do you find most attractive in a partner?",
  "Describe the last time someone made your heart race.",
  "What’s the most exciting compliment you’ve ever received?",
  "If we were trapped in an elevator for an hour, how would we pass the time?",
  "What’s your go-to move when you want to impress someone?",
  "Do you believe in soulmates, or do we make our own destiny?",
  "What’s the most unforgettable night you’ve ever had with someone?",
  "If you could experience one night of pure passion, no strings attached, would you?"
];

interface ComponentProps {
  onSelectMessage: (text: string) => void;
}

const SuggestionAnswer:FC<ComponentProps> = ({onSelectMessage}) => {
  const [answer, setAnswer] = useState<string>(answersData[0]);
  const [loading, setLoading] = useState<boolean>(false);

  const getRandomAnswer = () => {
    setLoading(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * answersData.length);
      setAnswer(answersData[randomIndex]);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="animate-fadeIn bg-[#21233A] p-[8px] rounded-[12px] w-[365px] mb-[8px]">
      {loading
        ? <div className="h-[32px]"><Spinner /> </div>
        : <button
          onClick={() => onSelectMessage(answer)}
          className="logo-gradient text-left text-[14px] font-medium line-clamp-2 leading-[1.2em] transition-text duration-300 hover:text-white"
        >
          {answer}
        </button>
      }
      <button
        className={clsx("flex items-center gap-[4px] group", {
          "pointer-events-none opacity-20": loading
        })}
        onClick={getRandomAnswer}
        disabled={loading}
      >
        <span className="text-[12px]">✨</span>
        <span className="text-[12px] font-semibold tracking-[-0.04em] opacity-50 transition-border border-b border-b-transparent duration-300 group-hover:border-b-white"> Suggestion answer</span>
        <Image
          src={IconReload.src}
          width={IconReload.width}
          height={IconReload.height}
          alt="reload image"
        />
      </button>
    </div>
  );
};

export default SuggestionAnswer;
