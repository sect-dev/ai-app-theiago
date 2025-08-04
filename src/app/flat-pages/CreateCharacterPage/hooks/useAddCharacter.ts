import { apiClient, getCurrentToken } from "@/app/shared/api";
import { useCallback, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { auth } from "@/firebase";

interface Character {
	token: string;
	name: string;
	style: string;
	hair_color: string;
	hair_style: string;
	body_type: string;
	ethnicity: string;
	breast_type: string;
	butt_type: string;
	occupation: string;
	legs_clothing: string;
	age: string;
	receive_voice_messages: boolean;
	voice_type: string;
	personality: string;
	topics_of_interests: string[];
	receive_video_messages: boolean;
	explicit_content: boolean;
}

const useAddCharacter = () => {
	const [data, setData] = useState<Character>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { getStoredData } = useLocalStorage();
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

	const addCharacter = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		const user = auth.currentUser;
		const token = await user?.getIdToken();
		try {
			const res = await apiClient.post<Character>(
				"/create_constructor_character_web",
				{
					token: token || "",
					name: name,
					style: charType,
					hair_color: hairColor,
					hair_style: hairStyle,
					body_type: bodyType,
					ethnicity: ethnicity,
					breast_type: breastType,
					butt_type: buttType,
					occupation: occupation,
					legs_clothing: outfit,
					age: getAge(age),
					eyes: eyesType,
					receive_voice_messages: true,
					voice_type: voice,
					personality: personality,
					topics_of_interests: hobbies,
					receive_video_messages: true,
					explicit_content: true,
					relationship: relationship,
					accessories: accessories
				}
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
