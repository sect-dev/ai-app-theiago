import React from "react";
import HomePage from "@/app/flat-pages/Homepage";
import { Character } from "@/app/shared/api/types";
import { PaymentModalType } from "@/app/shared/store/paymentStore";
import { getCharactersList } from "@/app/shared/api/characters";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "NSFW Character AI Chat - No Filter | AiGO",
	description:
		"Dive into immersive AI chats, create beautiful content, and build a deep connection with your dream partner — all with AiGO, your personal AI companion."
};

interface PageProps {
	searchParams: Promise<{
		action: PaymentModalType | null;
		character_id: string;
		order_number: string | null;
		product: string | null;
		price?: string | null;
	}>;
}

const Page = async ({ searchParams }: PageProps) => {
	const { action, character_id, order_number, product, price } =
		await searchParams;
	const charactersList = await getCharactersList();
	const charactersListData = Object.values(charactersList ?? {}) as Character[];

	return (
		<HomePage
			product={product}
			orderNumber={order_number}
			characterId={character_id ?? null}
			avatars={charactersListData}
			action={action}
			price={price}
		/>
	);
};

export default Page;
