import React from 'react';
import HomePage from "@/app/flat-pages/Homepage";
import {getCharactersList} from "@/app/shared/api";

const Page = async () => {
  const charactersList = await getCharactersList();

  return (
    <HomePage avatars={charactersList} />
  );
};

export default Page;