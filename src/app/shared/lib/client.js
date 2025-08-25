import { createClient } from "@sanity/client";

export const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	useCdn: true,
	apiVersion: "2025-02-06",
	token: process.env.SANITY_SECRET_TOKEN,
	ignoreBrowserTokenWarning: true
});
