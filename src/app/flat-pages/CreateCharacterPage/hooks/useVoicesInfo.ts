import { apiClient } from "@/app/shared/api";
import { useEffect, useState } from "react";

interface Voice {
	id: string;
	title: string;
	url: string;
}

const useVoicesInfo = () => {
	const [data, setData] = useState<Voice[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const res = await apiClient.get<Voice[]>("/get_voices_info");
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

export default useVoicesInfo;
