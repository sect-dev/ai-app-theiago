//use server is required
"use server";

import { cookies, headers } from "next/headers";

import { defaultLocale, locales } from "./config";
import { Locale } from "./types";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

const getLocale = async () => {
  // Читаем локаль из cookie, установленного middleware
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(COOKIE_NAME)?.value;
  
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    console.log("Using locale from cookie:", cookieLocale);
    return cookieLocale as Locale;
  }
  
  return defaultLocale;
};

const setLocale = async (locale?: string) => {
  (await cookies()).set(COOKIE_NAME, (locale as Locale) || defaultLocale);
};

export { getLocale, setLocale };
