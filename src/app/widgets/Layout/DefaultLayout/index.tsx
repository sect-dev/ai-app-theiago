import React from "react";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="h-[100svh] overflow-visible font-bai-jamjuree">
			{children}
		</main>
	);
};

export default DefaultLayout;
