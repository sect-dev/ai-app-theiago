import { apiClient } from "@/app/shared/api";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import { useCallback, useEffect, useState } from "react";

const useRandomDesc = () => {
	const [data, setData] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { occupation } = useGenerateImageStore();

	const fetchRandomDesc = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await apiClient.get<string>(
				`/get_random_description?occupation=${occupation}`
			);
			if (res.status === 200) {
				setData(res.data);
				return res.data;
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch");
			throw err;
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { data, isLoading, error, fetchRandomDesc };
};

export default useRandomDesc;
