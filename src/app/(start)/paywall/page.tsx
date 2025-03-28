import React, { Suspense } from 'react';
import Initpage from "@/app/flat-pages/Initpage";
import { getPaymentPlans } from "@/app/shared/api/payment";
import { getCharacterInfoById } from "@/app/shared/api";
import Spinner from '@/app/widgets/Spinner';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const character_id = Array.isArray(resolvedSearchParams.character_id) 
    ? resolvedSearchParams.character_id[0]
    : resolvedSearchParams.character_id;

  const [paymentPlans, character] = await Promise.all([
    getPaymentPlans(),
    getCharacterInfoById(character_id ?? '8')
  ]);

  return (
    <Suspense fallback={<Spinner />}>
      <Initpage paymentPlans={paymentPlans} character={character} />
    </Suspense>
  );
};

export default Page;