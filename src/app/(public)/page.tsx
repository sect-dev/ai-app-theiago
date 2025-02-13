import React from 'react';
import HomePage from "@/app/flat-pages/Homepage";
import {getCharactersList} from "@/app/shared/api";
import {IAvatar} from "@/app/shared/api/types";

const Page = async () => {
  const charactersList = await getCharactersList();
  const charactersListData = Object.values(charactersList ?? {}) as IAvatar[];

  return (
    <HomePage avatars={charactersListData} />
  );
};

export default Page;