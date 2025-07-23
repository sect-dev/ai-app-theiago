//use server is required
"use server";

import { cookies, headers } from "next/headers";

import { defaultLocale, locales } from "./config";
import { Locale } from "./types";
import { parseAcceptLanguage } from "@/middleware";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

// const getLocale = async () => {
//   // Читаем локаль из cookie, установленного middleware
//   const cookieStore = await cookies();
//   const cookieLocale = cookieStore.get(COOKIE_NAME)?.value;

//   if (cookieLocale && locales.includes(cookieLocale as Locale)) {
//     console.log("Using locale from cookie:", cookieLocale);
//     return cookieLocale as Locale;
//   }

//   return defaultLocale;
// };

const getLocale = async (): Promise<Locale> => {
	const cookieStore = await cookies();
	const cookieLocale = cookieStore.get(COOKIE_NAME)?.value;

	// Приоритет 1: Cookie
	if (cookieLocale && locales.includes(cookieLocale as Locale)) {
		return cookieLocale as Locale;
	}

	// Приоритет 2: Accept-Language заголовок
	const headersList = await headers();
	const acceptLanguage = headersList.get("accept-language");

	if (acceptLanguage) {
		const detectedLocale = parseAcceptLanguage(acceptLanguage);
		if (detectedLocale) {
			// Устанавливаем cookie с определенной локалью
			cookieStore.set(COOKIE_NAME, detectedLocale, {
				path: "/",
				maxAge: 60 * 60 * 24 * 30
			});
			return detectedLocale;
		}
	}

	// Приоритет 3: Локаль по умолчанию
	return defaultLocale;
};

const setLocale = async (locale?: string) => {
	(await cookies()).set(COOKIE_NAME, (locale as Locale) || defaultLocale);
};

export { getLocale, setLocale };
