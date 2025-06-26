import { create } from "zustand";

interface Character {
	name: string,
	description: string
}

interface GeneratedAsset {
  hasVideo: boolean;
  nsfw: boolean;
  url: string;
}

type ContentType = "video" | "image";

type Censorship = "low" | "high"

interface CharacterStore {
	isChangeCharacterModalActive: boolean;
	characterData: Character[] | null;
  type: ContentType;
  characterId: number | null;
  request: string;
  isLoading: boolean;
  generatedAssets: GeneratedAsset[];
	// openChangeCharacterModal: (data: Character[]) => void;
  setCharacterData: (data: Character[]) => void,
	setChangeCharacterModal: (isChangeCharacterModalActive: boolean) => void,
  setContentType: (type: ContentType) => void; 
  setCharacterId: (id: number | null) => void; 
  setRequest: (request: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setGeneratedAssets: (assets: GeneratedAsset[]) => void;
}

export const useCharacterCreateStore = create<CharacterStore>((set, get) => ({
  isChangeCharacterModalActive: false,
  characterData: null,
  type: "image",
  characterId: null,
  request: "asd",
  isLoading: false,
  generatedAssets: [],

  setCharacterData: (data: Character[]) => {
    set({characterData: data})
  },


  setChangeCharacterModal: (isChangeCharacterModalActive) => {
	  set({isChangeCharacterModalActive})
  },

  setContentType: (type) => {
    set({type: type})
  },

   setCharacterId: (id) => {
    set({ characterId: id });
  },

  setRequest: (newRequest) => {

    if (newRequest === "reset") {
    set({request: ""});
    return;
  }

    const {request} = get();

     if (!request || request.trim() === "") {
    set({request: newRequest});
  } else {
    // Иначе добавляем запятую и новое значение
    set({request: `${request}, ${newRequest}`});
  }
  },

  setIsLoading: (isLoading) => {
    set({isLoading: isLoading})
  },

  setGeneratedAssets: (assets: GeneratedAsset[]) => {
    set({generatedAssets: assets})
  }

}));