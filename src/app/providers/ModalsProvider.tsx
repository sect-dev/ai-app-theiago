"use client";
import dynamic from "next/dynamic";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { useAuthStore } from "@/app/shared/store/authStore";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { useAgeVerification } from "@/app/shared/hooks/useAgeVerification";
import { useSubscriptionStore } from "../shared/store/subscriptionStore";
import SubscriptionModal from "../widgets/Modals/SubscriptionModal";
import CancelConfirmModal from "../widgets/Modals/CancelConfirmModal";

const AuthModal = dynamic(() => import("@/app/widgets/Modals/AuthModal"), {
  ssr: false,
});
const PaymentModal = dynamic(
  () => import("@/app/widgets/Modals/PaymentModal"),
  { ssr: false },
);
const QrModal = dynamic(() => import("@/app/widgets/Modals/QrModal"), {
  ssr: false,
});
const SuccessPaymentModal = dynamic(
  () => import("@/app/widgets/Modals/SuccessPaymentModal"),
  { ssr: false },
);
const TokensModal = dynamic(() => import("@/app/widgets/Modals/TokensModal"), {
  ssr: false,
});
const AgeVerifyModal = dynamic(
  () => import("@/app/widgets/Modals/AgeVerifyModal"),
  { ssr: false },
);
const AgeVerifySorryModal = dynamic(
  () => import("@/app/widgets/Modals/AgeVerifySorryModal"),
  { ssr: false },
);

export default function ModalsProvider() {
  const { isAuthModalActive } = useAuthStore();
  const { isQrModalActive } = useSelectedCardStore();
  const {
    isPaymentModalActive,
    isSuccessPaymentModalActive,
    isTokensModalActive,
  } = usePaymentStore();
  const { showAgeVerify, showSorry, handleConfirm, handleDecline } =
    useAgeVerification();
  const { isSubscriptionModalActive, isCancelConfirmModalActive } =
    useSubscriptionStore();

  return (
    <>
      {isAuthModalActive && <AuthModal />}
      {isPaymentModalActive && <PaymentModal />}
      {isSuccessPaymentModalActive && <SuccessPaymentModal />}
      {isQrModalActive && <QrModal />}
      {isTokensModalActive && <TokensModal />}
      {showAgeVerify && (
        <AgeVerifyModal onConfirm={handleConfirm} onDecline={handleDecline} />
      )}
      {showSorry && <AgeVerifySorryModal />}
      {isSubscriptionModalActive && <SubscriptionModal />}
      {isCancelConfirmModalActive && <CancelConfirmModal />}
    </>
  );
}
