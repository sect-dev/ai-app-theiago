'use client'
import React, { Suspense } from 'react'
import Initpage from "@/app/flat-pages/Initpage"
import { useSearchParams } from "next/navigation"
import { getPaymentPlans } from "@/app/shared/api/payment"
import { getCharacterInfoById } from "@/app/shared/api"
import Spinner from '@/app/widgets/Spinner'

const InitpageContent = () => {
  const searchParams = useSearchParams()
  const character_id = searchParams.get('character_id') || '8'

  const paymentPlans = React.use(getPaymentPlans())
  const character = React.use(getCharacterInfoById(character_id))

  return <Initpage paymentPlans={paymentPlans} character={character} />
}

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <InitpageContent />
    </Suspense>
  )
}

export default Page