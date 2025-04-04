'use client'
import React, {FC, useEffect} from 'react';
import Spinner from "@/app/widgets/Spinner";
import {PaymentStatus} from "@/app/(payment)/payment/page";
import {useRouter} from "next/navigation";
import {usePaymentStore} from "@/app/shared/store/paymentStore";

interface ComponentProps {
  status?: PaymentStatus | null
}

const PaymentLoading:FC<ComponentProps> = ({status}) => {
  const navigate = useRouter();
  const {setSuccessPaymentModal} = usePaymentStore()

  useEffect(() => {
    if(status && status === 'success') {
      setTimeout(() => {
        navigate.push('/')
        setSuccessPaymentModal({isSuccessPaymentModalActive:true,successPaymentModalType:"subscription_success"})
      }, 1000)
    }
  }, [])

  return (
    <div className="py-[25px]">
      <Spinner className="border-[#007AFF] border-t-transparent border-[6px] rounded-[12px] w-[90px] h-[90px] mx-auto" />
      <div className="pt-[70px] text-center space-y-[12px]">
        <p className="text-[24px] font-semibold leading-[1.2em]">
          Payment is being processed
        </p>
        <p className="text-[17px] font-medium">
          Wait a little while for the payment system to process your payment. You&apos;ll be up and running soon!
        </p>
      </div>
    </div>
  );
};

export default PaymentLoading;