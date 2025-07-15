import AffiliateBanner from "./components/AffiliateBanner";
import HowItWorks from "./components/HowItWorks";
import WhyJoinProgram from "./components/WhyJoinProgram";

const AffiliatePage = () => {
	return (
		<div className="flex flex-col overflow-x-hidden md:px-[16px]">
			<AffiliateBanner className="mb-[12px] md:mb-[16px]" />

			<HowItWorks className="mb-[12px] md:mb-[16px]" />

			<WhyJoinProgram className="mb-[133px]" />
		</div>
	);
};

export default AffiliatePage;
