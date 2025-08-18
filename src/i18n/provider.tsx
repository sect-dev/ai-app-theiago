import { getMessages } from "next-intl/server";
import React from "react";
import { NextIntlClientProvider } from "next-intl";

const I18nProvider: React.FC<React.PropsWithChildren> = async ({
	children
}) => {
	const messages = await getMessages();
	return (
		<NextIntlClientProvider messages={messages}>
			{children}
		</NextIntlClientProvider>
	);
};

export { I18nProvider };
