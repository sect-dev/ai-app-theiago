//use server is required
"use server";

import { cookies, headers } from "next/headers";

import { defaultLocale, locales } from "./config";
import { Locale } from "./types";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

const getLocale = async () => {
  const cookieLocale = (await cookies()).get(COOKIE_NAME)?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  if (acceptLanguage) {
    // Парсим Accept-Language заголовок (например: "ru,en-US;q=0.9,en;q=0.8")
    const preferredLanguages = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase())
      .map((lang) => lang.split("-")[0]);

    // Находим первый поддерживаемый язык
    const supportedLanguage = preferredLanguages.find((lang) =>
      locales.includes(lang as Locale),
    );

    if (supportedLanguage) {
      return supportedLanguage as Locale;
    }
  }

  return defaultLocale;
};

const setLocale = async (locale?: string) => {
  (await cookies()).set(COOKIE_NAME, (locale as Locale) || defaultLocale);
};

export { getLocale, setLocale };
