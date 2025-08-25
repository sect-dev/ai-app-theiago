import NewPaywallPage from "@/app/flat-pages/NewPaywallPage";
import PaywallSkeleton from "@/app/flat-pages/NewPaywallPage/components/Skeleton";
import { Suspense } from "react";
import * as Sentry from "@sentry/nextjs";

const Page = () => {
	return (
		<div className="mx-auto flex max-w-[475px] justify-center px-[16px]">
			<NewPaywallPage />
		</div>
	);
};

export default Page;
