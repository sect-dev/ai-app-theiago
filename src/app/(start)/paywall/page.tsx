import React from 'react';
import Initpage from "@/app/flat-pages/Initpage";
import { getPaymentPlans } from "@/app/shared/api/payment";
import { getCharacterInfoById } from "@/app/shared/api";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;
  const character_id = Array.isArray(resolvedParams.character_id)
    ? resolvedParams.character_id[0]
    : resolvedParams.character_id ?? '8';

  const [paymentPlans, character] = await Promise.all([
    getPaymentPlans(),
    getCharacterInfoById(character_id)
  ]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#121423] rounded-[24px] py-[25px] px-[25px] w-[370px] mx-auto">
        <Initpage paymentPlans={paymentPlans} character={character} />
      </div>
    </div>
  );
};

export default Page;