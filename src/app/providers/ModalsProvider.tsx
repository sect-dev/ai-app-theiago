'use client'
import dynamic from 'next/dynamic'
import { usePaymentStore } from '@/app/shared/store/paymentStore'
import { useAuthStore } from '@/app/shared/store/authStore'
import {useSelectedCardStore} from "@/app/shared/store/publicStore";

const AuthModal = dynamic(() => import('@/app/widgets/Modals/AuthModal'), { ssr: false })
const PaymentModal = dynamic(() => import('@/app/widgets/Modals/PaymentModal'), { ssr: false })
const QrModal = dynamic(() => import('@/app/widgets/Modals/QrModal'), { ssr: false })
const SuccessPaymentModal = dynamic(() => import('@/app/widgets/Modals/SuccessPaymentModal'), { ssr: false })
const TokensModal = dynamic(() => import('@/app/widgets/Modals/TokensModal'), { ssr: false })

export default function ModalsProvider() {
  const { isAuthModalActive } = useAuthStore()
  const { isQrModalActive } = useSelectedCardStore()
  const { isPaymentModalActive, isSuccessPaymentModalActive, isTokensModalActive } = usePaymentStore()

  return (
    <>
      {isAuthModalActive && <AuthModal />}
      {isPaymentModalActive && <PaymentModal />}
      {isSuccessPaymentModalActive && <SuccessPaymentModal />}
      {isQrModalActive && <QrModal />}
      {isTokensModalActive && <TokensModal />}
    </>
  )
}