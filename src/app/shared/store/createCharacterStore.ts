import { create } from "zustand";

interface CreatedCharacter {
	id: string;
	avatar: string;
	name: string;
	description: string;
	age: string;
	params: Param[];
}

interface Param {
	id: string;
	title: string;
	url: string;
}

interface GenerateImageStore {
	step: number;
	charType: string;
	gender: string;
	ageChar: number;
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
	hobbies: string[];
	name: string;
	relationship: string;
	outfit: string;
	accessories: string;
	isCreatingCharacter: boolean;
	createdCharacter: CreatedCharacter | null;
	createCharacterError: string | null;
	setStep: (step: number) => void;
	setCharType: (charType: string) => void;
	setGender: (gender: string) => void;
	setAge: (age: number) => void;
	setEthnicity: (ethnicity: string) => void;
	setBodyType: (bodyType: string) => void;
	setBreastType: (breastType: string) => void;
	setButtType: (buttType: string) => void;
	setEyesType: (eyesType: string) => void;
	setHairStyle: (hairStyle: string) => void;
	setHairColor: (hairColor: string) => void;
	setPersonality: (personality: string) => void;
	setVoice: (voice: string) => void;
	setOccupation: (occupation: string) => void;
	setHobbies: (hobbies: string[]) => void;
	setName: (name: string) => void;
	setRelationship: (relationship: string) => void;
	setOutfit: (outfit: string) => void;
	setAccessories: (accessories: string) => void;
	setIsCreatingCharacter: (isCreatingCharacter: boolean) => void;
	setCreatedCharacter: (character: CreatedCharacter) => void;
	setCreateCharacterError: (error: string | null) => void;
	resetCreatedCharacter: () => void;
}

export const useGenerateImageStore = create<GenerateImageStore>((set, get) => ({
	step: 1,
	charType: "Real",
	gender: "Female",
	ageChar: 20,
	ethnicity: "Latina",
	bodyType: "Curvy",
	breastType: "Large",
	buttType: "Medium",
	eyesType: "Green",
	hairStyle: "Long",
	hairColor: "Blond",
	personality: "Protector",
	voice: "Mystical",
	occupation: "College Student",
	hobbies: [],
	name: "",
	relationship: "",
	outfit: "",
	accessories: "",
	isCreatingCharacter: false,
	createdCharacter: null,
	createCharacterError: null,
	setRelationship: (newRelationship: string) => {
		if (newRelationship === "reset") {
			set({ relationship: "" });
			return;
		}

		const { relationship } = get();

		if (!relationship || relationship.trim() === "") {
			set({ relationship: newRelationship });
		} else {
			// Иначе добавляем запятую и новое значение
			set({ relationship: `${relationship}, ${newRelationship}` });
		}
	},
	setOutfit: (outfit: string) => set({ outfit }),
	setAccessories: (accessories: string) => set({ accessories }),
	setStep: (step: number) => set({ step }),
	setCharType: (charType: string) => set({ charType }),
	setGender: (gender: string) => set({ gender }),
	setAge: (age: number) => set({ ageChar: age }),
	setEthnicity: (ethnicity: string) => set({ ethnicity }),
	setBodyType: (bodyType: string) => set({ bodyType }),
	setBreastType: (breastType: string) => set({ breastType }),
	setButtType: (buttType: string) => set({ buttType }),
	setEyesType: (eyesType: string) => set({ eyesType }),
	setHairStyle: (hairStyle: string) => set({ hairStyle }),
	setHairColor: (hairColor: string) => set({ hairColor }),
	setPersonality: (personality: string) => set({ personality }),
	setVoice: (voice: string) => set({ voice }),
	setOccupation: (occupation: string) => set({ occupation }),
	setHobbies: (hobbies: string[]) => set({ hobbies }),
	setName: (name: string) => {
		if (name === "reset") {
			set({ name: "" });
		} else {
			set({ name });
		}
	},
	setCreatedCharacter: (character: CreatedCharacter) =>
		set({ createdCharacter: character }),
	setIsCreatingCharacter: (isLoading: boolean) =>
		set({ isCreatingCharacter: isLoading }),
	setCreateCharacterError: (error: string | null) =>
		set({ createCharacterError: error }),
	resetCreatedCharacter: () =>
		set({
			createdCharacter: null,
			isCreatingCharacter: false,
			createCharacterError: null
		})
}));
