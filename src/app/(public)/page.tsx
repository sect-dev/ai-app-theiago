import React from 'react';
import HomePage from "@/app/flat-pages/Homepage";
import {Character} from "@/app/shared/api/types";
import {PaymentModalType} from "@/app/shared/store/paymentStore";
import {getCharactersList} from "@/app/shared/api/characters";

interface PageProps {
  searchParams: Promise<{ action: PaymentModalType | null }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const {action} = await searchParams;
  const charactersList = await getCharactersList();
  const charactersListData = Object.values(charactersList ?? {}) as Character[];

  return (
    <HomePage avatars={charactersListData} action={action} />
  );
};

export default Page;