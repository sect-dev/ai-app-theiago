import { create } from "zustand";

interface GeoStore {
	isGeoModalActive: boolean;
	country: string | null;
	setGeoModalActive: (isActive: boolean) => void;
	initializeCountry: (country: string) => void;
}

export const useGeoStore = create<GeoStore>((set, get) => ({
	isGeoModalActive: false,
	country: null,

	setGeoModalActive: (isActive) => set({ isGeoModalActive: isActive }),

	initializeCountry: (country) => {
		const { isGeoModalActive } = get();
		// Показываем модал только если это UK и модал еще не был показан
		if (country === "GB" && !isGeoModalActive) {
			set({
				country,
				isGeoModalActive: true
			});
		} else {
			set({ country });
		}
	}
}));
