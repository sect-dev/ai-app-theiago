import React, { Suspense } from 'react';
import Initpage from "@/app/flat-pages/Initpage";
import { getPaymentPlans } from "@/app/shared/api/payment";
import { getCharacterInfoById } from "@/app/shared/api";
import Spinner from '@/app/widgets/Spinner';

const Page = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const { character_id } = searchParams;

  const [paymentPlans, character] = await Promise.all([
    getPaymentPlans(),
    getCharacterInfoById(character_id ?? '8')
  ]);

  return (
    <Suspense fallback={<Spinner/>}>
      <Initpage paymentPlans={paymentPlans} character={character} />
    </Suspense>
  );
};

export default Page;