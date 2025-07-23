"use client";

import { useEffect } from "react";
import { safeLocalStorage } from "../../helpers";

const LocaleSync = () => {
	useEffect(() => {
		const getCookie = (name: string): string | null => {
			if (typeof window === "undefined") return null;

			const value = `; ${document.cookie}`;
			const parts = value.split(`; ${name}=`);
			if (parts.length === 2) {
				return parts.pop()?.split(";").shift() || null;
			}
			return null;
		};

		const cookieLocale = getCookie("NEXT_LOCALE");

		if (cookieLocale) {
			safeLocalStorage.set("locale", cookieLocale);
		}
	}, []);

	return null; // Компонент не рендерит ничего
};

export default LocaleSync;
