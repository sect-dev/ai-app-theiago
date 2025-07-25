"use client";

import Script from "next/script";

const CookieScriptComponent = () => {
	// Отображаем только в production среде
	if (process.env.NEXT_PUBLIC_ENV == "stage") {
		return null;
	}

	return (
		<Script
			id="cookie-script"
			src="//cdn.cookie-script.com/s/b4f1c3cd2a24711dfe623a5f4ee8f543.js"
			strategy="beforeInteractive"
			data-charset="UTF-8"
		/>
	);
};

export default CookieScriptComponent;
