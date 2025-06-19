"use client";

import { useSearchParams } from "next/navigation";
import AdPage from "./pages/AdPage";
import OrganicPage from "./pages/OrganicPage";
import { useEffect } from "react";
import { saveClickId } from "@/app/shared/helpers/clickTracker";
import { safeLocalStorage } from "@/app/shared/helpers";

const NewPaywallPage = () => {
  const searchParams = useSearchParams();
  const characterId = searchParams.get("character_id");
  const locale = searchParams.get("locale") ?? "en";
  const clickId = searchParams.get("clickid");

  useEffect(() => {
    safeLocalStorage.set("locale", locale);
    if (clickId) {
      saveClickId(clickId);
    }
  }, [clickId, locale]);

  if (characterId) {
    return <AdPage characterId={characterId} />;
  }

  return <OrganicPage />;
};

export default NewPaywallPage;
