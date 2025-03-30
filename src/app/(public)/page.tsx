import React from 'react';
import HomePage from "@/app/flat-pages/Homepage";
import {getCharactersList} from "@/app/shared/api";
import {Character} from "@/app/shared/api/types";
import {PaymentModalType} from "@/app/shared/store/paymentStore";

interface PageProps {
  searchParams: Promise<{ [key: string]: PaymentModalType | null }>;
  character_id: Promise<{ [key: string]: string | null }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const {action,character_id} = await searchParams;
  const charactersList = await getCharactersList();
  const charactersListData = Object.values(charactersList ?? {}) as Character[];

  return (
    <HomePage avatars={charactersListData} action={action} characterId={character_id} />
  );
};

export default Page;