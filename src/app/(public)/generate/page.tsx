import CreatePage from "@/app/flat-pages/CreatePage";
import CreatePageSkeleton from "@/app/flat-pages/CreatePage/components/CreatePageSkeleton";
import { Suspense } from "react";

const Page = () => {
	return (
		<Suspense fallback={<CreatePageSkeleton />}>
			<CreatePage />
		</Suspense>
	);
};

export default Page;
