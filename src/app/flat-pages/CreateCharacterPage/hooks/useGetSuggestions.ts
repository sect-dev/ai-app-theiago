import { apiClient } from "@/app/shared/api";
import { useEffect, useState } from "react";

interface Suggestion {
	id: string;
	type: string;
	label: string;
	image: string;
}

const useGetSuggestions = () => {
	const [data, setData] = useState<Suggestion[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const res = await apiClient.get<Suggestion[]>("/get_suggestions_info");
				if (res.status === 200) {
					setData(res.data);
				}
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

export default useGetSuggestions;
