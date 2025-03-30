import React from 'react';
import HomePage from "@/app/flat-pages/Homepage";
import {getCharactersList} from "@/app/shared/api";
import {Character} from "@/app/shared/api/types";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const {action} = await searchParams;
  const charactersList = await getCharactersList();
  const charactersListData = Object.values(charactersList ?? {}) as Character[];

  return (
    <HomePage avatars={charactersListData} action={action ?? null} />
  );
};

export default Page;