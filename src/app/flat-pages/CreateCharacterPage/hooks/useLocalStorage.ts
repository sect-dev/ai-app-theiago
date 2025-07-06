import { safeLocalStorage } from "@/app/shared/helpers";
import { useCallback, useEffect, useState } from "react";

interface Props {
	step: number;
	charType: string;
	gender: string;
	age: number;
	ethnicity: string;
	bodyType: string;
	breastType: string;
	buttType: string;
	eyesType: string;
	hairStyle: string;
	hairColor: string;
	personality: string;
	voice: string;
	occupation: string;
	hobbies: string;
	name: string;
	relationship: string;
	outfit: string;
	accessories: string;
}

const STORAGE_KEY = "CREATED_CHAR_PARAMS";

const useLocalStorage = (props: Partial<Props>) => {
	const {
		step,
		charType,
		gender,
		age,
		ethnicity,
		bodyType,
		breastType,
		buttType,
		eyesType,
		hairStyle,
		hairColor,
		personality,
		voice,
		occupation,
		hobbies,
		name,
		relationship,
		outfit,
		accessories
	} = props;

	const [storedData, setStoredData] = useState<Partial<Props>>({});

	// Функция для получения данных из localStorage
	const getStoredData = useCallback((): Partial<Props> => {
		try {
			const data = safeLocalStorage.get(STORAGE_KEY);
			return data ? JSON.parse(data) : {};
		} catch (error) {
			console.error("Ошибка при чтении localStorage:", error);
			return {};
		}
	}, []);

	// Функция для сохранения данных в localStorage
	const saveToStorage = useCallback(
		(newData: Partial<Props>) => {
			try {
				const existingData = getStoredData();
				const updatedData = { ...existingData, ...newData };
				safeLocalStorage.set(STORAGE_KEY, JSON.stringify(updatedData));
				setStoredData(updatedData);
			} catch (error) {
				console.error("Ошибка при сохранении в localStorage:", error);
			}
		},
		[getStoredData]
	);

	// Функция для очистки localStorage
	const clearStorage = useCallback(() => {
		try {
			localStorage.removeItem(STORAGE_KEY);
			setStoredData({});
		} catch (error) {
			console.error("Ошибка при очистке localStorage:", error);
		}
	}, []);

	// Загрузка данных при первом рендере
	useEffect(() => {
		const data = getStoredData();
		setStoredData(data);
	}, [getStoredData]);

	// Сохранение при изменении любого из параметров
	useEffect(() => {
		const allParams = {
			step,
			charType,
			gender,
			age,
			ethnicity,
			bodyType,
			breastType,
			buttType,
			eyesType,
			hairStyle,
			hairColor,
			personality,
			voice,
			occupation,
			hobbies,
			name,
			relationship,
			outfit,
			accessories
		};

		// Собираем только определенные параметры (не undefined)
		const currentParams = Object.fromEntries(
			Object.entries(allParams).filter(([_, value]) => value !== undefined)
		);

		// Сохраняем только если есть хотя бы один параметр
		if (Object.keys(currentParams).length > 0) {
			saveToStorage(currentParams);
		}
	}, [
		step,
		charType,
		gender,
		age,
		ethnicity,
		bodyType,
		breastType,
		buttType,
		eyesType,
		hairStyle,
		hairColor,
		personality,
		voice,
		occupation,
		hobbies,
		name,
		relationship,
		outfit,
		accessories,
		saveToStorage
	]);

	return {
		storedData,
		saveToStorage,
		clearStorage,
		getStoredData
	};
};

export default useLocalStorage;
