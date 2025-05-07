import { create } from "zustand";

interface Character {
	name: string,
	description: string
}

type ContentType = "video" | "image";

interface CharacterStore {
	isChangeCharacterModalActive: boolean;
	characterData: Character[] | null;
  type: ContentType;
  character_id: number | null;
  request: string;

	// openChangeCharacterModal: (data: Character[]) => void;
  setCharacterData: (data: Character[]) => void,
	setChangeCharacterModal: (isChangeCharacterModalActive: boolean) => void,
  setContentType: (type: ContentType) => void; 
  setCharacterId: (id: number | null) => void; 
  setRequest: (request: string) => void;
}

export const useCharacterCreateStore = create<CharacterStore>((set) => ({
  isChangeCharacterModalActive: false,
  characterData: null,
  type: "image",
  character_id: null,
  request: " ",

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
    set({ character_id: id });
  },

  setRequest: (request) => {
    set({request: request})
  }

}));