import { create } from "zustand";

interface ReportStore {
  isReportModalActive: boolean;
  isReportSubmitted: boolean;
  setReportModalActive: (isActive: boolean) => void;
  setReportSubmitted: (isSubmitted: boolean) => void;
  resetReportSubmitted: () => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  isReportModalActive: false,
  isReportSubmitted: false,
  setReportModalActive: (isActive) => set({ isReportModalActive: isActive }),
  setReportSubmitted: (isSubmitted) => set({ isReportSubmitted: isSubmitted }),
  resetReportSubmitted: () => set({ isReportSubmitted: false }),
}));
