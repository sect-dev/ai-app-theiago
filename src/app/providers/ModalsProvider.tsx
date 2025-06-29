"use client";
import dynamic from "next/dynamic";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { useAuthStore } from "@/app/shared/store/authStore";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { useAgeVerification } from "@/app/shared/hooks/useAgeVerification";
import { useSubscriptionStore } from "../shared/store/subscriptionStore";
import { useReportStore } from "../shared/store/reportStore";
import { usePathname } from "next/navigation";
import { useCharacterCreateStore } from "../shared/store/createCharacterStore";
import CharacterChangeModal from "../widgets/Modals/ChangeCharacter";

const AuthModal = dynamic(() => import("@/app/widgets/Modals/AuthModal"), {
	ssr: false
});
const PaymentModal = dynamic(
	() => import("@/app/widgets/Modals/PaymentModal"),
	{ ssr: false }
);
const QrModal = dynamic(() => import("@/app/widgets/Modals/QrModal"), {
	ssr: false
});
const SuccessPaymentModal = dynamic(
	() => import("@/app/widgets/Modals/SuccessPaymentModal"),
	{ ssr: false }
);
const TokensModal = dynamic(() => import("@/app/widgets/Modals/TokensModal"), {
	ssr: false
});
const AgeVerifyModal = dynamic(
	() => import("@/app/widgets/Modals/AgeVerifyModal"),
	{ ssr: false }
);
const AgeVerifySorryModal = dynamic(
	() => import("@/app/widgets/Modals/AgeVerifySorryModal"),
	{ ssr: false }
);
const ReportMessage = dynamic(
	() => import("@/app/widgets/Modals/ReportMessage"),
	{
		ssr: false
	}
);
const SubscriptionModal = dynamic(
	() => import("@/app/widgets/Modals/SubscriptionModal"),
	{
		ssr: false
	}
);
const CancelConfirmModal = dynamic(
	() => import("@/app/widgets/Modals/CancelConfirmModal"),
	{
		ssr: false
	}
);
const GeneratePhotoModal = dynamic(
	() => import("@/app/widgets/Modals/GeneratePhotoModal"),
	{
		ssr: false
	}
);

export default function ModalsProvider() {
	const { isAuthModalActive } = useAuthStore();
	const { isQrModalActive } = useSelectedCardStore();
	const {
		isPaymentModalActive,
		isSuccessPaymentModalActive,
		isTokensModalActive
	} = usePaymentStore();
	const { showAgeVerify, showSorry, handleConfirm, handleDecline } =
		useAgeVerification();
	const { isSubscriptionModalActive, isCancelConfirmModalActive } =
		useSubscriptionStore();
	const { isReportModalActive } = useReportStore();
	const pathname = usePathname();

	const isAnyOtherModalActive =
		isAuthModalActive ||
		isPaymentModalActive ||
		isSuccessPaymentModalActive ||
		isQrModalActive ||
		isTokensModalActive ||
		isSubscriptionModalActive ||
		isCancelConfirmModalActive;

	const isPaywallPage = pathname === "/paywall" || pathname === "/paywall2";
	const shouldShowAgeVerify =
		showAgeVerify &&
		!isAnyOtherModalActive &&
		!isPaywallPage &&
		!isSuccessPaymentModalActive;
	const { isChangeCharacterModalActive, isGenerateModalActive } =
		useCharacterCreateStore();

	return (
		<>
			{isAuthModalActive && <AuthModal />}
			{isPaymentModalActive && <PaymentModal />}
			{isSuccessPaymentModalActive && <SuccessPaymentModal />}
			{isQrModalActive && <QrModal />}
			{isTokensModalActive && <TokensModal />}
			{shouldShowAgeVerify && (
				<AgeVerifyModal onConfirm={handleConfirm} onDecline={handleDecline} />
			)}
			{showSorry && <AgeVerifySorryModal />}
			{isSubscriptionModalActive && <SubscriptionModal />}
			{isCancelConfirmModalActive && <CancelConfirmModal />}
			{isReportModalActive && <ReportMessage />}
			{isChangeCharacterModalActive && <CharacterChangeModal />}
			{isGenerateModalActive && <GeneratePhotoModal />}
		</>
	);
}
