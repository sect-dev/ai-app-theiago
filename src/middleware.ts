import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./i18n/config";
import { Locale } from "./i18n/types";
import createMiddleware from "next-intl/middleware";

// export function middleware(request: NextRequest) {
// 	// Получаем параметр locale из URL
// 	const locale = request.nextUrl.searchParams.get("locale");

// 	// Если параметр locale присутствует и валиден, устанавливаем cookie
// 	if (locale && locales.includes(locale as Locale)) {
// 		const response = NextResponse.next();

// 		// Устанавливаем cookie с локалью
// 		response.cookies.set("NEXT_LOCALE", locale, {
// 			path: "/",
// 			maxAge: 60 * 60 * 24 * 30 // 30 дней
// 		});

// 		return response;
// 	}

// 	return NextResponse.next();
// }

// export const config = {
// 	// Применяем middleware ко всем страницам кроме API routes и статических файлов
// 	matcher: [
// 		/*
// 		 * Match all request paths except for the ones starting with:
// 		 * - api (API routes)
// 		 * - _next/static (static files)
// 		 * - _next/image (image optimization files)
// 		 * - favicon.ico (favicon file)
// 		 */
// 		"/((?!api|_next/static|_next/image|favicon.ico).*)"
// 	]
// };

export function middleware(request: NextRequest) {
	const response = NextResponse.next();

	// Проверяем параметр locale в URL
	const urlLocale = request.nextUrl.searchParams.get("locale");

	if (urlLocale && locales.includes(urlLocale as Locale)) {
		// Устанавливаем cookie с локалью из URL
		response.cookies.set("NEXT_LOCALE", urlLocale, {
			path: "/",
			maxAge: 60 * 60 * 24 * 30 // 30 дней
		});
		return response;
	}

	// Проверяем существующий cookie
	const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

	if (cookieLocale && locales.includes(cookieLocale as Locale)) {
		// Cookie уже установлен и валиден
		return response;
	}

	// Автоопределение по Accept-Language заголовку
	const acceptLanguage = request.headers.get("accept-language");
	const detectedLocale = acceptLanguage
		? parseAcceptLanguage(acceptLanguage)
		: null;

	const localeToSet = detectedLocale || defaultLocale;

	// Устанавливаем cookie с определенной локалью
	response.cookies.set("NEXT_LOCALE", localeToSet, {
		path: "/",
		maxAge: 60 * 60 * 24 * 30 // 30 дней
	});

	return response;
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};

export function parseAcceptLanguage(acceptLanguage: string): Locale | null {
	if (!acceptLanguage) return null;

	// Парсим заголовок Accept-Language
	const languages = acceptLanguage
		.split(",")
		.map((lang) => {
			const [language, quality = "q=1"] = lang.trim().split(";");
			return {
				language: language.toLowerCase(),
				quality: parseFloat(quality.split("=")[1] || "1")
			};
		})
		.sort((a, b) => b.quality - a.quality);

	// Ищем точное совпадение с поддерживаемыми локалями
	for (const { language } of languages) {
		if (locales.includes(language as Locale)) {
			return language as Locale;
		}
	}

	// Ищем совпадение по языку без региона (например, "en-US" -> "en")
	for (const { language } of languages) {
		const shortLang = language.split("-")[0];
		if (locales.includes(shortLang as Locale)) {
			return shortLang as Locale;
		}
	}

	return null;
}
