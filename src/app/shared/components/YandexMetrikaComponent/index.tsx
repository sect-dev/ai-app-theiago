"use client";

import { Router } from "next/router";
import React, { useEffect } from "react";
import ym, { YMInitializer } from "react-yandex-metrika";

const YM_COUNTER_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_COUNTER_ID;

const YandexMetrikaContainer: React.FC = () => {
  const hit = (url: string) => ym("hit", url);

  useEffect(() => {
    hit(window.location.pathname + window.location.search);
    Router.events.on("routeChangeComplete", (url: string) => hit(url));
  }, [hit]);

  return (
    <YMInitializer
      accounts={[Number(YM_COUNTER_ID)]}
      options={{
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      }}
      version="2"
    />
  );
};

export default YandexMetrikaContainer;
