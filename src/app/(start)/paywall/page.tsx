import React, { use } from 'react';
import Initpage from "@/app/flat-pages/Initpage";
import { getPaymentPlans } from "@/app/shared/api/payment";
import {getCharacterInfoByConstructor} from "@/app/shared/api/getCharacterById";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const Page = ({ searchParams }: PageProps) => {
  const {character_id} = use(searchParams)
  const paymentPlans = use(getPaymentPlans());
  const character = use(getCharacterInfoByConstructor(character_id ?? ''));

  return (
    <div className="bg-[#121423] rounded-[24px] p-[25px] fmLbg-transparent fm:p-0">
      <Initpage paymentPlans={paymentPlans} character={character} />
    </div>
  );
};

export default Page;