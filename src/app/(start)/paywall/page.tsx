"use client";
import React, { useEffect, useState, Suspense } from "react";
import Initpage from "@/app/flat-pages/Initpage";
import { sendGTMEvent } from "@next/third-parties/google";
import { getPaymentPlans } from "@/app/shared/api/payment";
import { getCharacterInfoByConstructor } from "@/app/shared/api/getCharacterById";
import { useSearchParams } from "next/navigation";
import { PaymentPlan } from "@/app/shared/api/payment";
import { CharacterByConstructor } from "@/app/shared/api/types";
import InitpageSkeleton from "@/app/flat-pages/Initpage/InitpageSkeleton";
import * as fbq from "@/app/shared/lib/fbPixel";
import ym from "react-yandex-metrika";
import { saveClickId } from "@/app/shared/helpers/clickTracker";
import * as amplitude from "@amplitude/analytics-browser";
import log from "@/app/shared/lib/logger";

const PageContent = () => {
  const searchParams = useSearchParams();
  const character_id = searchParams.get("character_id");
  const locale = searchParams.get("locale") ?? "en";
  const clickId = searchParams.get("clickid");

  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[] | null>(null);
  const [character, setCharacter] = useState<CharacterByConstructor | null>(
    null,
  );

  useEffect(() => {
    if (character_id && typeof window !== "undefined") {
      log.debug(
        "PageContent.tsx",
        "sending analytics to paywall_show:: ",
        character_id,
      );
      sendGTMEvent({ event: "paywall_show", placement: "quiz" });
      fbq.event("AddtoCart");
      ym("reachGoal", "paywall_show", { placement: "quiz" });
      amplitude.track("paywall_show", {
        placement: "quiz",
        domain: window.location.hostname,
      });
    }
  }, []);

  useEffect(() => {
    if (clickId) {
      saveClickId(clickId);
    }
  }, [clickId]);

  useEffect(() => {
    const fetchData = async () => {
      log.debug("PageContent.tsx", "fetching paywall data:: ", character_id);
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
        log.error("PageContent.tsx", "error fetching paywall data:: ", error);
      }
    };

    fetchData();
  }, [character_id]);

  if (!paymentPlans || !character) {
    return <InitpageSkeleton />;
  }

  return (
    <div className="fmLbg-transparent rounded-[24px] bg-[#121423] p-[25px] fm:p-0">
      <Initpage
        locale={locale}
        paymentPlans={paymentPlans}
        character={character}
      />
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<InitpageSkeleton />}>
    <PageContent />
  </Suspense>
);

export default Page;
