import { create } from "zustand";

interface GenerateImageStore {
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
	hobbies: string[];
	name: string;
	relationship: string;
	outfit: string;
	accessories: string;
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
}

export const useGenerateImageStore = create<GenerateImageStore>((set, get) => ({
	step: 1,
	charType: "Realistic",
	gender: "Female",
	age: 0,
	ethnicity: "",
	bodyType: "",
	breastType: "",
	buttType: "",
	eyesType: "",
	hairStyle: "",
	hairColor: "",
	personality: "Protector",
	voice: "",
	occupation: "",
	hobbies: [],
	name: "",
	relationship: "",
	outfit: "",
	accessories: "",
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
	setAge: (age: number) => set({ age }),
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
	}
}));
