import React from 'react';
import HomePage from "@/app/flat-pages/Homepage";
import {Character} from "@/app/shared/api/types";
import {PaymentModalType} from "@/app/shared/store/paymentStore";
import {getCharactersList} from "@/app/shared/api/characters";

interface PageProps {
  searchParams: Promise<{ action: PaymentModalType | null, character_id: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const {action,character_id} = await searchParams;
  const charactersList = await getCharactersList();
  const charactersListData = Object.values(charactersList ?? {}) as Character[];

  return (
    <HomePage characterId={character_id ?? null} avatars={charactersListData} action={action} />
  );
};

export default Page;