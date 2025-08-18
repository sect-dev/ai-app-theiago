import CreatePage from "@/app/flat-pages/CreatePage";
import CreatePageSkeleton from "@/app/flat-pages/CreatePage/components/CreatePageSkeleton";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create Your NSFW AI Images [No Filter] | AiGo",
	description:
		"Turn your imagination into reality with our next-gen AI image generator. Create custom visuals in seconds — no design skills needed. Start with AiGO today!"
};

const Page = () => {
	return (
		<Suspense fallback={<CreatePageSkeleton />}>
			<CreatePage />
		</Suspense>
	);
};

export default Page;
