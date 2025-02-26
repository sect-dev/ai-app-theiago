import {IAvatar,PreparedAvatar} from "@/app/shared/api/types";

export const saveCharacterToLocalStorage = (avatar: IAvatar) => {
  if (typeof window !== "undefined") {
    const storedIds = localStorage.getItem("chatStartedCharacters");
    const characters: PreparedAvatar[] = storedIds ? JSON.parse(storedIds) : [];

    if (!characters.some(a => a.id === avatar.id)) {
      const newCharacter = {
        id: avatar.id,
        image: avatar.avatar,
        listMsgs: [],
        name: avatar.name
      };
      characters.push(newCharacter);
      localStorage.setItem("chatStartedCharacters", JSON.stringify(characters));
    }
  }
};