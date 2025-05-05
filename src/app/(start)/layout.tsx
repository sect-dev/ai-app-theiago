import React from 'react';
import './styles.css'
import PaymentDiscountBanner from "@/app/widgets/Payment/PaymentDiscountBanner";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="font-bai-jamjuree bg-[#121423] ">
			<div className="fm:hidden">
				<PaymentDiscountBanner />
			</div>
			{children}
		</main>
	);
};

export default Layout;
