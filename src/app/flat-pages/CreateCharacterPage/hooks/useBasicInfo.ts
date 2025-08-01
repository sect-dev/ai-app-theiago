import { apiClient } from "@/app/shared/api";
import { useEffect, useState } from "react";

export interface Option {
	id: string;
	label: string;
	image: string;
}

export interface Category {
	category: string;
	title: string;
	options: Option[];
}

export const useBasicInfo = () => {
	const [data, setData] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const res = await apiClient.get<Category[]>("/get_basic_info");
				setData(res.data);
			} catch (err: any) {
				setError(err.message || "Failed to fetch");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return { data, isLoading, error };
};
