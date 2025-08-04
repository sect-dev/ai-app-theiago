import { apiClient } from "@/app/shared/api";
import { useCallback, useEffect, useState } from "react";

const useRandomName = () => {
	const [data, setData] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchRandomName = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await apiClient.get<string>("/get_random_name");
			if (res.status === 200) {
				setData(res.data);
				return res.data;
			}
		} catch (err: any) {
			setError(err.message || "Failed to fetch");
			throw err;
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { data, isLoading, error, fetchRandomName };
};

export default useRandomName;
