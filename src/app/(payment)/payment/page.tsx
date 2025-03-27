'use client'
import React from 'react'
import PaymentLoading from "@/app/(payment)/payment/PaymentLoading"
import PaymentError from "@/app/(payment)/payment/PaymentError"
import PaymentExpired from "@/app/(payment)/payment/PaymentExpired"
import { useSearchParams } from "next/navigation"

export type PaymentStatus = 'error' | 'success' | 'expiry' | 'sale'

const Page = () => {
  const searchParams = useSearchParams()
  const params: Record<string, string> = Object.fromEntries(searchParams.entries())

  const action = params.action
  const status: PaymentStatus = 
    action && ['error', 'success', 'expiry'].includes(action) 
      ? action as PaymentStatus 
      : 'sale'

  const renderContent = () => {
    switch (status) {
      case "success":
        return <PaymentLoading status={status} />
      case "error":
        return <PaymentError />
      case "expiry":
        return <PaymentExpired />
      default:
        return <PaymentLoading />
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#121423] rounded-[24px] py-[25px] px-[25px] w-[370px] mx-auto">
        {renderContent()}
      </div>
    </div>
  )
}

export default Page