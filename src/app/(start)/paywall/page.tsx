import React from 'react';
import Initpage from "@/app/flat-pages/Initpage";
import {getPaymentPlans} from "@/app/shared/api/payment";
import {getCharacterInfoById} from "@/app/shared/api";

const Page = async ({searchParams}:{searchParams:Promise<{character_id: string}>}) => {
  const {character_id} = await searchParams;

  const paymentPlans = await getPaymentPlans()
  const character = await getCharacterInfoById(character_id ?? '8');

  return (
    <Initpage paymentPlans={paymentPlans} character={character} />
  );
};

export default Page;