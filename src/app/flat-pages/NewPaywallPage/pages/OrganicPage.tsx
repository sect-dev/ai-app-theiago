import Image from "next/image";
import SectionAdvantages from "../components/SectionAdvantages";
import OrganicImage from "@/../public/images/img/image-paywall-organic.png";
import SectionPlans from "../../Initpage/components/SectionPlans";
import { getPaymentPlans, PaymentPlan } from "@/app/shared/api/payment";
import { useEffect, useState } from "react";
import { safeLocalStorage } from "@/app/shared/helpers";
import PaywallSkeleton from "../components/Skeleton";
import DiscountComponent from "../components/DiscountComponent";
import BestGirlsComponent from "../components/BestGirlsComponent";
import RatingComponent from "../components/RatingComponent";
import SectionReviews from "../../Initpage/components/SectionReviews";
import EvaluatedComponent from "../components/EvaluatedComponent";
import AdvantagesComponent from "../components/AdvantagesComponent";
import SafePayment from "../components/SafePayment";
import QuestionsComponent from "../components/QuestionsComponent";
import FooterComponent from "../components/FooterComponent";

const OrganicPage = () => {
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = safeLocalStorage.get("locale") ?? "en";

  const fetchData = async () => {
    try {
      const [plans] = await Promise.all([getPaymentPlans(locale)]);
      setPaymentPlans(plans);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <PaywallSkeleton />;
  }

  return (
    <div>
      <div>
        <Image src={OrganicImage} alt="organic image" className="mb-[20px]" />
      </div>

      <SectionAdvantages isOrganic={true} />
      <SectionPlans paymentPlans={paymentPlans} isOrganic={true} />
      <DiscountComponent isOrganic={true} />
      <RatingComponent isOrganic={true} />
      <SectionReviews isOrganic={true} />
      <EvaluatedComponent />
      <BestGirlsComponent isOrganic={true} />
      <AdvantagesComponent />
      <SectionPlans paymentPlans={paymentPlans} isOrganic={true} />
      <SafePayment isOrganic={true} />
      <QuestionsComponent />
      <FooterComponent paymentPlans={paymentPlans} isOrganic={true} />
    </div>
  );
};

export default OrganicPage;
