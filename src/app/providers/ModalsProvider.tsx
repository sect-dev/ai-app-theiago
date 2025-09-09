"use client";
import dynamic from "next/dynamic";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { useAuthStore } from "@/app/shared/store/authStore";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { useAgeVerification } from "@/app/shared/hooks/useAgeVerification";
import { useSubscriptionStore } from "../shared/store/subscriptionStore";
import { useReportStore } from "../shared/store/reportStore";
import { usePathname } from "next/navigation";
import { useGenerateImageStore } from "../shared/store/generateImageStore";
import CharacterChangeModal from "../widgets/Modals/ChangeCharacter";
import { useGeoStore } from "../shared/store/geoStore";

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
const ErrorModal = dynamic(() => import("@/app/widgets/Modals/ErrorModal"), {
	ssr: false
});
const FeedBackModal = dynamic(
	() => import("@/app/widgets/Modals/FeedBackModal"),
	{
		ssr: false
	}
);
const GeoModal = dynamic(() => import("@/app/widgets/Modals/GeoModal"), {
	ssr: false
});
const PaywallModal = dynamic(
	() => import("@/app/widgets/Modals/PaywallModal"),
	{
		ssr: false
	}
);

export default function ModalsProvider() {
	const { isAuthModalActive, paywallModal } = useAuthStore();
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
	const { isReportModalActive, isFeedBackModalActive } = useReportStore();
	const pathname = usePathname();
	const {
		isErrorModalActive,
		isChangeCharacterModalActive,
		isGenerateModalActive
	} = useGenerateImageStore();
	const { isGeoModalActive } = useGeoStore();

	const isAnyOtherModalActive =
		isAuthModalActive ||
		isPaymentModalActive ||
		isSuccessPaymentModalActive ||
		isQrModalActive ||
		isTokensModalActive ||
		isSubscriptionModalActive ||
		isCancelConfirmModalActive ||
		isGeoModalActive;

	const isPaywallPage = pathname === "/paywall" || pathname === "/paywall2";
	const shouldShowAgeVerify =
		showAgeVerify &&
		!isAnyOtherModalActive &&
		!isPaywallPage &&
		!isSuccessPaymentModalActive;

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
			{isErrorModalActive && <ErrorModal />}
			{isFeedBackModalActive && <FeedBackModal />}
			{isGeoModalActive && <GeoModal />}
			{paywallModal && <PaywallModal />}
		</>
	);
}
