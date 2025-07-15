"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const TRACKDESK_ACCOUNT = "aigo";

interface TrackdeskConversionData {
	conversionType: string;
	amount: {
		value: string;
	};
	externalCid?: string;
	revenueOriginId?: string;
}

declare global {
	interface Window {
		trackdesk: (
			account: string,
			action: string,
			data?: TrackdeskConversionData
		) => void;
		TrackdeskObject: unknown[];
	}
}

const TrackdeskComponent = () => {
	const [loaded, setLoaded] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		if (!loaded) return;

		// Отправляем click событие для всех страниц
		if (typeof window !== "undefined" && window.trackdesk) {
			window.trackdesk(TRACKDESK_ACCOUNT, "click");
		}
	}, [pathname, loaded]);

	return (
		<>
			<Script
				src="//cdn.trackdesk.com/tracking.js"
				strategy="afterInteractive"
				onLoad={() => setLoaded(true)}
			/>
			<Script
				id="trackdesk-init"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
              (function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");
            `
				}}
			/>
		</>
	);
};

export default TrackdeskComponent;
