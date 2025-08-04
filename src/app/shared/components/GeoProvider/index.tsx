"use client";

import { useEffect } from "react";
import { useGeoStore } from "@/app/shared/store/geoStore";

interface GeoProviderProps {
	country: string;
	children: React.ReactNode;
}

export default function GeoProvider({ country, children }: GeoProviderProps) {
	const { initializeCountry } = useGeoStore();

	useEffect(() => {
		console.log("country:: ", country);
		initializeCountry(country);
	}, [country, initializeCountry]);

	return <>{children}</>;
}
