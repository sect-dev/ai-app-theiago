import { apiClient, getCurrentToken } from "@/app/shared/api";
import { useCallback, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { auth } from "@/firebase";
import { safeLocalStorage } from "@/app/shared/helpers";

interface CreatedCharacter {
	id: string;
	name: string;
	description: string;
	age: string;
	params: Param[];
	avatar: string;
}

interface Param {
	id: string;
	title: string;
	url: string;
}

const useAddCharacter = () => {
	const [data, setData] = useState<CreatedCharacter>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { getStoredData } = useLocalStorage();

	const addCharacter = useCallback(async () => {
		const storedData = getStoredData();

		const {
			name,
			ethnicity,
			occupation,
			age,
			personality,
			relationship,
			outfit,
			accessories,
			voice,
			hobbies,
			gender,
			charType,
			bodyType,
			breastType,
			buttType,
			eyesType,
			hairStyle,
			hairColor
		} = storedData;
		
		setIsLoading(true);
		setError(null);
		const user = auth.currentUser;
		const token = await user?.getIdToken();
		try {
			const res = await apiClient.post<CreatedCharacter>(
				"/create_constructor_character_web",
				{
					token: token || "",
					name: name,
					description: relationship,
					style: charType,
					hair_color: hairColor,
					hair_style: hairStyle,
					body_type: bodyType,
					ethnicity: ethnicity,
					breast_type: breastType,
					butt_type: buttType,
					occupation: occupation,
					clothing: accessories,
					age: getAge(age),
					eyes: eyesType,
					receive_voice_messages: true,
					voice_type: voice,
					personality: personality,
					topics_of_interests: hobbies,
					receive_video_messages: true,
					explicit_content: true
				},
				{
					headers: {
						"Content-Type": "application/json",
						accept: "application/json"
					}
				}
			);
			if (res.status === 200) {
				setData(res.data);
				safeLocalStorage.set("createdCharacter", JSON.stringify(res.data));
				return res.data;
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch");
			throw err;
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { data, isLoading, error, addCharacter };
};

const getAge = (age: number | undefined) => {
	if (!age) return "Teenager";
	if (age >= 18 && age <= 19) return "Teenager";
	if (age >= 20 && age <= 25) return "Young adult";
	if (age >= 26 && age <= 35) return "Adult";
	if (age >= 36 && age <= 55) return "MILF";
};

export default useAddCharacter;
