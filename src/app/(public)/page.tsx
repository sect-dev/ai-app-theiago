'use client';

import React, { useEffect, useState, Suspense } from 'react';
import HomePage from "@/app/flat-pages/Homepage";
import { Character } from "@/app/shared/api/types";
import { PaymentModalType } from "@/app/shared/store/paymentStore";
import { getCharactersList } from "@/app/shared/api/characters";
import { useSearchParams } from 'next/navigation';
import FavoritesGirlsSkeleton from "@/app/widgets/FavoritesGirls/FavoritesGirlsSkeleton";
import CardSkeleton from "@/app/widgets/Card/CardSkeleton";
import TagsSkeleton from "@/app/widgets/Tags/TagsSkeleton";

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
      <div className="animate-fadeIn overflow-y-auto h-[calc(100vh-60px)]">
        <div className="container !px-0">
          <div className="space-y-[8px] sm:space-y-0">
            <div className="bg-[#121423] p-[24px] rounded-l-[24px] overflow-hidden md:p-[16px] md:rounded-none">
              <p className="text-[20px] font-semibold tracking-[0.02vw] mb-[16px] sm:hidden">They crave to chat with you!</p>
              <div className="flex gap-[12px]">
                {[...Array(6)].map((_, index) => (
                  <FavoritesGirlsSkeleton key={index} />
                ))}
              </div>
            </div>
            <div className="bg-[#121423] p-[24px] rounded-l-[24px] md:p-[16px] sm:pt-0 md:rounded-none">
              <p className="text-[20px] font-semibold tracking-[0.02vw] mb-[12px] sm:hidden">Explore hottest AI Characters</p>
              <div className="flex gap-[4px] mb-[16px] sm:overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <TagsSkeleton key={i} seed={i} />
                ))}
              </div>
              <div className="gap-[16px] cards-list sm:gap-[8px]">
                {[...Array(6)].map((_, index) => (
                  <CardSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <HomePage avatars={characters} action={action} />;
};

const Page = () => {
  return (
    <Suspense fallback={
      <div className="h-[calc(100vh-60px)] flex items-center justify-center">
        Loading...
      </div>
    }>
      <PageContent />
    </Suspense>
  );
};

export default Page;