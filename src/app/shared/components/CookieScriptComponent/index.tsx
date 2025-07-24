"use client";

import Script from "next/script";

const CookieScriptComponent = () => {
	// Отображаем только в production среде
	if (process.env.NODE_ENV !== "production") {
		return null;
	}

	return (
		<Script
			id="cookie-script"
			src="//cdn.cookie-script.com/s/e2b35c686a2d57d0df62dc4caccbf9d3.js"
			strategy="beforeInteractive"
			data-charset="UTF-8"
		/>
	);
};

export default CookieScriptComponent;
