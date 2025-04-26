"use client";
import React, { useEffect, useState, Suspense } from "react";
import Initpage from "@/app/flat-pages/Initpage";
import { getPaymentPlans } from "@/app/shared/api/payment";
import { getCharacterInfoByConstructor } from "@/app/shared/api/getCharacterById";
import { useSearchParams } from "next/navigation";
import { PaymentPlan } from "@/app/shared/api/payment";
import { CharacterByConstructor } from "@/app/shared/api/types";
import InitpageSkeleton from "@/app/flat-pages/Initpage/InitpageSkeleton";

const PageContent = () => {
  const searchParams = useSearchParams();
  const character_id = searchParams.get("character_id");

  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[] | null>(null);
  const [character, setCharacter] = useState<CharacterByConstructor | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plans, characterData] = await Promise.all([
          getPaymentPlans(),
          getCharacterInfoByConstructor(
            character_id ?? "constructor_067eeb24-1b27-7eaf-8000-42bce5d41b10",
          ),
        ]);
        setPaymentPlans(plans);
        setCharacter(characterData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [character_id]);

  if (!paymentPlans || !character) {
    return <InitpageSkeleton />;
  }

  return (
    <div className="bg-[#121423] rounded-[24px] p-[25px] fmLbg-transparent fm:p-0">
      <Initpage paymentPlans={paymentPlans} character={character} />
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<InitpageSkeleton />}>
    <PageContent />
  </Suspense>
);

export default Page;
