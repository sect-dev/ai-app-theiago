"use client";

import { useEffect, useRef, useState } from "react";
import SectionAdvantages from "../components/SectionAdvantages";
import { CharacterByConstructor } from "@/app/shared/api/types";
import { getCharacterInfoByConstructor } from "@/app/shared/api/getCharacterById";
import SectionPlans from "@/app/flat-pages/Initpage/components/SectionPlans";
import { getPaymentPlans, PaymentPlan } from "@/app/shared/api/payment";
import { safeLocalStorage } from "@/app/shared/helpers";
import DiscountComponent from "../components/DiscountComponent";
import RatingComponent from "../components/RatingComponent";
import SectionReviews from "../../Initpage/components/SectionReviews";
import EvaluatedComponent from "../components/EvaluatedComponent";
import BestGirlsComponent from "../components/BestGirlsComponent";
import AdvantagesComponent from "../components/AdvantagesComponent";
import SafePayment from "../components/SafePayment";
import QuestionsComponent from "../components/QuestionsComponent";
import FooterComponent from "../components/FooterComponent";
import GalleryComponent from "../components/GalleryComponent";
import PaywallSkeleton from "../components/Skeleton";

interface Props {
  characterId: string;
}

const AdPage = (props: Props) => {
  const { characterId } = props;
  const [character, setCharacter] = useState<CharacterByConstructor | null>(
    null,
  );
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isStickyVisible, setIsStickyVisible] = useState(true);


  const firstSectionPlansRef = useRef<HTMLDivElement>(null);
  const locale = safeLocalStorage.get("locale") ?? "en";

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (firstSectionPlansRef.current) {
  //       const sectionTop = firstSectionPlansRef.current.offsetTop;
  //       const sectionHeight = firstSectionPlansRef.current.offsetHeight;
  //       const sectionBottom = sectionTop + sectionHeight;
  //       const scrollPosition = window.scrollY;
  //       const windowHeight = window.innerHeight;
  //       const viewPortBottom = scrollPosition + windowHeight;

  //       if (scrollPosition >= sectionTop && viewPortBottom < sectionBottom) {
  //         setIsStickyVisible(false);
  //       } else {
  //         setIsStickyVisible(true);
  //       }


  //       console.log({
  //         scrollPosition,
  //         sectionTop,
  //         sectionBottom,
  //         viewPortBottom,
  //         sectionHeight,
  //         windowHeight,
  //         isVisible: !(scrollPosition >= sectionTop && viewPortBottom < sectionBottom)
  //       })
  //     }

  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }
  // }, [paymentPlans])


  const scrollToSectionPlans = () => {
    if (firstSectionPlansRef.current) {
      firstSectionPlansRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const fetchData = async () => {
    try {
      const [plans, characterData] = await Promise.all([
        getPaymentPlans(locale),
        getCharacterInfoByConstructor(
          characterId ?? "constructor_067eeb24-1b27-7eaf-8000-42bce5d41b10",
          locale,
        ),
      ]);
      setPaymentPlans(plans);
      setCharacter(characterData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [characterId, locale]);

  if (isLoading) {
    return <PaywallSkeleton />;
  }

  return (
    <div>
      {character && <GalleryComponent character={character} />}
      <SectionAdvantages character={character} onButtonClick={scrollToSectionPlans} />
      <div ref={firstSectionPlansRef}>
        <SectionPlans paymentPlans={paymentPlans} />
      </div>
      <DiscountComponent />
      <RatingComponent />
      <SectionReviews />
      <EvaluatedComponent />
      <BestGirlsComponent />

      {/* <div className="mb-[16px] flex flex-col items-center justify-center">
        <span className="text-center text-[20px] font-semibold leading-[120%]">
          Choose a convenient <br /> payment method
        </span>
      </div> */}

      <AdvantagesComponent />
      <SectionPlans paymentPlans={paymentPlans} />
      <SafePayment />
      <QuestionsComponent />
      <FooterComponent paymentPlans={paymentPlans} />
    </div>
  );
};

export default AdPage;
