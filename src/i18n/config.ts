export const defaultLocale = "en";

export const timeZone = "Europe/Amsterdam";

export const locales = [defaultLocale, "es"] as const;

export const localesMap = [
	{ key: "en", title: "English" },
	{ key: "es", title: "Español" }
];
