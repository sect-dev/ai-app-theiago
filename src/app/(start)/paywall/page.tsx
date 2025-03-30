import React from 'react';
import Initpage from "@/app/flat-pages/Initpage";
import { getPaymentPlans } from "@/app/shared/api/payment";
import { getCharacterInfoById } from "@/app/shared/api";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const {character_id} = await searchParams;
  const paymentPlans =  await getPaymentPlans();
  const character = await getCharacterInfoById(character_id ?? '8')

  return (
    <div className="bg-[#121423] rounded-[24px] p-[25px] fmLbg-transparent fm:p-0">
      <Initpage paymentPlans={paymentPlans} character={character} />
    </div>
  );
};

export default Page;