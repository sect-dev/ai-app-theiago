'use client';

import React, { useEffect, Suspense } from 'react';
import HomePage from "@/app/flat-pages/Homepage";
import { Character } from "@/app/shared/api/types";
import { PaymentModalType } from "@/app/shared/store/paymentStore";
import { getCharactersList } from "@/app/shared/api/characters";
import { useSearchParams } from 'next/navigation';
import HomepageSkeleton from "@/app/flat-pages/Homepage/HomepageSkeleton";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";

const PageContent = () => {
  const {charactersList,setCharactersList} = useSelectedCardStore()
  const searchParams = useSearchParams();
  const action = searchParams.get('action') as PaymentModalType | null;

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const charactersList = await getCharactersList();
        const charactersListData = Object.values(charactersList ?? {}) as Character[];
        setCharactersList(charactersListData);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };
    if(!charactersList) {
      fetchCharacters();
    }

  }, [charactersList]);

  if (!charactersList) {
    return (
     <HomepageSkeleton />
    );
  }

  return <HomePage avatars={charactersList} action={action} />;
};

const Page = () => {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
};

export default Page;