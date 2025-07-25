"use client";
import Script from "next/script";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		const interval = setInterval(() => {
			const target = document.getElementById("cookie-report-target");

			if (!target) return;

			// Найдём один из уникальных элементов, чтобы от него подняться к контейнеру
			const someBlock = document.querySelector(
				"._CookieScriptReportPageCheckboxes"
			);

			if (
				someBlock &&
				someBlock.parentElement &&
				!target.contains(someBlock.parentElement)
			) {
				const container = someBlock.parentElement;

				// Переместим весь внешний контейнер
				target.appendChild(container);
				clearInterval(interval);
			}
		}, 300);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<Script
				id="cookie-report-script"
				src="https://report.cookie-script.com/r/e2b35c686a2d57d0df62dc4caccbf9d3.js"
				data-cookiescriptreport="report"
				data-cs-lang="en"
				strategy="afterInteractive"
				data-target="#cookie-report-target"
			/>
			{children}
		</>
	);
};

export default Layout;
