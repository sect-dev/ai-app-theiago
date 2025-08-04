import { Field, Label, Select } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import { FC } from "react";

import { setLocale } from "@/i18n/locale";
import { localesMap } from "@/i18n/config";
import { Locale } from "@/i18n/types";
import clsx from "clsx";
import { safeLocalStorage } from "@/app/shared/helpers";

export const LocaleSwitcher: FC = () => {
	const locale = useLocale();

	const onChange = (value: string) => {
		const locale = value as Locale;
		setLocale(locale);
		safeLocalStorage.set("locale", locale);
	};

	return (
		<div className="relative">
			<Field>
				<Select
					onChange={({ target }) => onChange(target.value)}
					value={locale}
					className={clsx(
						"mt-1 block w-full appearance-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
						"outline-none focus:border-transparent focus:outline-none focus:ring-0 focus:ring-transparent",
						// Make the text of each option black on Windows
						"*:text-black"
					)}
				>
					{localesMap.map((locale) => (
						<option key={locale.key} value={locale.key}>
							{locale.title}
						</option>
					))}
				</Select>
			</Field>
		</div>
	);
};
