import React from 'react';
import Initpage from "@/app/flat-pages/Initpage";
import {getPaymentPlans} from "@/app/shared/api/payment";

const Page = async () => {
  const paymentPlans = await getPaymentPlans()

  return (
    <Initpage paymentPlans={paymentPlans} />
  );
};

export default Page;