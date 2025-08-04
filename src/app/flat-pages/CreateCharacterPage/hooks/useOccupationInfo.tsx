import { apiClient } from "@/app/shared/api";
import { useEffect, useState } from "react";

interface Occupation {
	id: string;
	title: string;
	image: string;
}

const useOccupationInfo = () => {
	const [data, setData] = useState<Occupation[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const res = await apiClient.get<Occupation[]>("/get_occupation_info");
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

export default useOccupationInfo;
