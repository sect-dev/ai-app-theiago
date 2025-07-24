import { create } from "zustand";

interface Character {
	name: string;
	description: string;
}

export interface GeneratedAsset {
	hasVideo: boolean;
	nsfw: boolean;
	url: string;
}

type ContentType = "video" | "image";

type Censorship = "low" | "high";

interface CharacterStore {
	isChangeCharacterModalActive: boolean;
	isGenerateModalActive: boolean;
	recentlyGeneratedImage: string | null;
	characterData: Character[] | null;
	type: ContentType;
	characterId: number | string | null;
	request: string;
	isLoading: boolean;
	generatedAssets: GeneratedAsset[];
	isErrorModalActive: boolean;
	// openChangeCharacterModal: (data: Character[]) => void;
	setCharacterData: (data: Character[]) => void;
	setChangeCharacterModal: (isChangeCharacterModalActive: boolean) => void;
	setIsGenerateModalActive: (isGenerateModalActive: boolean) => void;
	setRecentlyGeneratedImage: (recentlyGeneratedImage: string | null) => void;
	setContentType: (type: ContentType) => void;
	setCharacterId: (id: number | string | null) => void;
	setRequest: (request: string) => void;
	setIsLoading: (isLoading: boolean) => void;
	setGeneratedAssets: (assets: GeneratedAsset[]) => void;
	setIsErrorModalActive: (isErrorModalActive: boolean) => void;
}

export const useGenerateImageStore = create<CharacterStore>((set, get) => ({
	isChangeCharacterModalActive: false,
	isGenerateModalActive: false,
	recentlyGeneratedImage: null,
	characterData: null,
	type: "image",
	characterId: null,
	request: "",
	isLoading: false,
	generatedAssets: [],
	isErrorModalActive: false,

	setCharacterData: (data: Character[]) => {
		set({ characterData: data });
	},

	setChangeCharacterModal: (isChangeCharacterModalActive) => {
		set({ isChangeCharacterModalActive });
	},

	setIsGenerateModalActive: (isGenerateModalActive) => {
		set({ isGenerateModalActive });
	},

	setRecentlyGeneratedImage: (recentlyGeneratedImage) => {
		set({ recentlyGeneratedImage });
	},

	setContentType: (type) => {
		set({ type: type });
	},

	setCharacterId: (id) => {
		set({ characterId: id });
	},

	setRequest: (newRequest) => {
		if (newRequest === "reset") {
			set({ request: "" });
			return;
		}

		const { request } = get();

		if (!request || request.trim() === "") {
			set({ request: newRequest });
		} else {
			// Иначе добавляем запятую и новое значение
			set({ request: `${request}, ${newRequest}` });
		}
	},

	setIsLoading: (isLoading) => {
		set({ isLoading: isLoading });
	},

	setGeneratedAssets: (assets: GeneratedAsset[]) => {
		set({ generatedAssets: assets });
	},

	setIsErrorModalActive: (isErrorModalActive) => {
		set({ isErrorModalActive });
	},	
}));
