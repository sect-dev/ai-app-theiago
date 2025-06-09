export const defaultLocale = "en";

export const timeZone = "Europe/Amsterdam";

export const locales = [defaultLocale, "es", "ru", "tr"] as const;

export const localesMap = [
  { key: "en", title: "English" },
  { key: "es", title: "Español" },
  { key: "ru", title: "Russian" },
  { key: "tr", title: "Turkish" },
];
