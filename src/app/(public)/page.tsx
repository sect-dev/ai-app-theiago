'use client';

import React, { useEffect, useState, Suspense } from 'react';
import HomePage from "@/app/flat-pages/Homepage";
import { Character } from "@/app/shared/api/types";
import { PaymentModalType } from "@/app/shared/store/paymentStore";
import { getCharactersList } from "@/app/shared/api/characters";
import { useSearchParams } from 'next/navigation';
import HomepageSkeleton from "@/app/flat-pages/Homepage/HomepageSkeleton";

const PageContent = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const action = searchParams.get('action') as PaymentModalType | null;


  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const charactersList = await getCharactersList();
        const charactersListData = Object.values(charactersList ?? {}) as Character[];
        setCharacters(charactersListData);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return (
     <HomepageSkeleton />
    );
  }

  return <HomePage avatars={characters} action={action} />;
};

const Page = () => {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
};

export default Page;