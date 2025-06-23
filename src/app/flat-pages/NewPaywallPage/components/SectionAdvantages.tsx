import { CharacterByConstructor } from "@/app/shared/api/types";
import { BASE_URL_PRECREATED_TYPES } from "@/app/shared/consts";
import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

// TODO: Bad design issue, burn hardcode with fire when possible

interface Props {
  character?: CharacterByConstructor | null;
  isOrganic?: boolean;
  onButtonClick?: () => void;
  // isStickyVisible?: boolean;
}

const IMAGE_PARAMS = "?quality=100";

const SectionAdvantages = (props: Props) => {
  const { character, isOrganic, onButtonClick } = props;
  const t = useTranslations("Paywall");
  // const [isSticky, setIsSticky] = useState(false);

    // Эффект для определения когда кнопка должна стать sticky
    // useEffect(() => {
    //   const handleScroll = () => {
    //     const scrollPosition = window.scrollY;
    //     const viewportHeight = window.innerHeight;
        
    //     // Кнопка становится sticky когда пользователь прокрутил больше высоты экрана
    //     if (scrollPosition > viewportHeight * 0.5) {
    //       setIsSticky(true);
    //     } else {
    //       setIsSticky(false);
    //     }
    //   };
  
    //   window.addEventListener('scroll', handleScroll);
    //   return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    const handleButtonClick = () => {
      if (onButtonClick) {
        onButtonClick();
      }
    };

  const CHARACTER_ADVANTAGES = [
    {
      title: t("advantages_body"),
      value: character?.body_type,
      image: `${BASE_URL_PRECREATED_TYPES}/${character?.style}/body/${character?.body_type}.png${IMAGE_PARAMS}`,
    },
    {
      title: t("advantages_breast"),
      value: character?.breast_type,
      image: `${BASE_URL_PRECREATED_TYPES}/${character?.style}/breasts/${character?.breast_type}.png${IMAGE_PARAMS}`,
    },
    {
      title: t("advantages_butt"),
      value: character?.butt_type,
      image: `${BASE_URL_PRECREATED_TYPES}/${character?.style}/butt/${character?.butt_type}.png${IMAGE_PARAMS}`,
    },
    {
      title: t("advantages_ethnicity"),
      value: character?.ethnicity,
      image: `${BASE_URL_PRECREATED_TYPES}/${character?.style}/race/${character?.ethnicity}.png${IMAGE_PARAMS}`,
    },
  ];

  return (
    <>
    <div className="mb-[32px]">
      {/* Put in a component */}
      <div className="mb-[16px] flex flex-col items-center justify-center">
        <h2 className="mb-[12px] text-center text-[26px] font-bold leading-[120%]">
          {isOrganic
            ? t("advantages_our_girls_are_waiting_for_you")
            : t("advantages_your_girlfriend_is_ready")}
        </h2>
        <ul className="flex flex-col items-center justify-center">
          <li className="mb-[4px] rounded-[18px] bg-[#2B2D44] px-[7px] py-[4px] text-[14px] font-normal">
            {t("advantages_sends_nsfw_photos_and_videos")}
          </li>
          <div className="flex gap-[4px]">
            <li className="rounded-[18px] bg-[#2B2D44] px-[7px] py-[4px] text-[14px] font-normal">
              {t("advantages_sends_sexy_voices")}
            </li>
            <li className="rounded-[18px] bg-[#2B2D44] px-[7px] py-[4px] text-[14px] font-normal">
              {t("advantages_can_be_undressed")}
            </li>
          </div>
        </ul>
      </div>

      {character && (
        <div className="mb-[16px] grid grid-cols-2 grid-rows-2 gap-[8px]">
          {CHARACTER_ADVANTAGES.map((advantage) => (
            <div
              key={advantage.title}
              className="flex items-center rounded-[24px] bg-[#2B2D44] p-[12px]"
            >
              <div className="relative mr-[12px] size-[40px]">
                <Image
                  src={advantage.image}
                  alt={advantage.title}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-medium opacity-50">
                  {advantage.title}
                </span>
                <span className="text-[14px] font-bold">{advantage.value}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className={clsx(
          "relative mb-[8px] flex h-[60px] w-full items-center justify-center gap-[5px] overflow-hidden rounded-[24px] text-center text-white before:opacity-100 disabled:opacity-50 fm:h-[16vw] fm:rounded-[6.40vw]",
          isOrganic
            ? "bg-blue-button-gradient shadow-blue-shadow"
            : "bg-button-gradient shadow-pink-shadow",
        )}
        onClick={handleButtonClick}
      >
        <span className="font-noto-sans text-[14px] font-bold uppercase fm:text-[3.73vw]">
          {isOrganic
            ? t("advantages_get_closer_with_them")
            : t("advantages_get_your_girlfriend")}
        </span>
        <span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
      </button>

    {/* Sticky кнопка - показывается только на xs разрешении */}
    {/* {isSticky && isStickyVisible && (
        <button
          onClick={handleButtonClick}
          className={clsx(
            "fixed bottom-4 max-w-[343px] inset-x-4 z-[100] mb-[8px] hidden xs:flex h-[60px] items-center justify-center gap-[5px] overflow-hidden rounded-[24px] text-center text-white before:opacity-100 disabled:opacity-50 shadow-lg transition-all duration-300 ease-in-out transform-none fm:h-[16vw] fm:rounded-[6.40vw]",
            isOrganic
              ? "bg-blue-button-gradient shadow-blue-shadow"
              : "bg-button-gradient shadow-pink-shadow",
          )}
        >
          <span className="font-noto-sans text-[14px] font-bold uppercase fm:text-[3.73vw]">
            {isOrganic
              ? t("advantages_get_closer_with_them")
              : t("advantages_get_your_girlfriend")}
          </span>
          <span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
        </button>
    )} */}

      <div className="flex items-center justify-center">
        <span className="text-[12px] font-semibold">
          {t("plan_get_your_girlfriend_description")}
        </span>
      </div>
    </div>

    </>
  );
};

export default SectionAdvantages;
