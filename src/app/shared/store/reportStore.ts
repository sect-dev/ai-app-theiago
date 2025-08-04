import { create } from "zustand";

interface ReportStore {
	isReportModalActive: boolean;
	isReportSubmitted: boolean;
	setReportModalActive: (isActive: boolean) => void;
	setReportSubmitted: (isSubmitted: boolean) => void;
	resetReportSubmitted: () => void;

	isFeedBackModalActive: boolean;
	setFeedBackModalActive: (isActive: boolean) => void;
	selectedStar: number | undefined;
	setSelectedStar: (star: number) => void;
}

export const useReportStore = create<ReportStore>((set) => ({
	isReportModalActive: false,
	isReportSubmitted: false,
	setReportModalActive: (isActive) => set({ isReportModalActive: isActive }),
	setReportSubmitted: (isSubmitted) => set({ isReportSubmitted: isSubmitted }),
	resetReportSubmitted: () => set({ isReportSubmitted: false }),

	isFeedBackModalActive: false,
	setFeedBackModalActive: (isActive) =>
		set({ isFeedBackModalActive: isActive }),
	selectedStar: 4,
	setSelectedStar: (star) => set({ selectedStar: star })
}));
