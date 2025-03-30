import React from 'react';
import HomePage from "@/app/flat-pages/Homepage";
import {getCharactersList} from "@/app/shared/api";
import {Character} from "@/app/shared/api/types";
import {PaymentModalType} from "@/app/shared/store/paymentStore";

interface PageProps {
  searchParams: Promise<{ action: PaymentModalType | null, character_id: string | null }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const {action,character_id} = await searchParams;
  const charactersList = await getCharactersList();
  const charactersListData = Object.values(charactersList ?? {}) as Character[];

  return (
    <HomePage avatars={charactersListData} action={action} characterId={character_id ?? null} />
  );
};

export default Page;