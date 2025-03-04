import {IAvatar, Message, PreparedAvatar} from "@/app/shared/api/types";

export const saveCharacterToLocalStorage = (avatar: IAvatar, messages: Message[]) => {
  if (typeof window !== "undefined") {
    const storedIds = localStorage.getItem("chatStartedCharacters");
    const characters: PreparedAvatar[] = storedIds ? JSON.parse(storedIds) : [];
    const currentTime = new Date();

    if (!characters.some(a => a.id === avatar.id)) {
      const newCharacter = {
        id: avatar.id,
        image: avatar.avatar,
        listMsgs: messages,
        name: avatar.name,
        lastMessageTime: currentTime
      };
      characters.push(newCharacter);
      localStorage.setItem("chatStartedCharacters", JSON.stringify(characters));
    }
  }
};

export function getMessageSize(size: number, position: number): string {
  const maxSize = 399000;
  const minSize = 51000;

  if (size === 1) return (maxSize / 1000).toFixed(1) + "k";

  let step: number = (maxSize - minSize) / (size - 1);
  let index: number = (position - 10) / (10000 - 10) * (size - 1);
  let currentSize: number = Math.round(maxSize - step * index);

  // Ограничиваем в пределах допустимых значений
  currentSize = Math.max(minSize, Math.min(maxSize, currentSize));

  // Преобразуем в формат "xxx.xk"
  return (currentSize / 1000).toFixed(1) + "k";
}

interface BackendMessage {
  type: string;
  message: string;
  url?: string;
  row_id: number;
  timestamp: number;
  nsfw: boolean;
}

export const mapBackendMessagesToMessages = (backendMessages: BackendMessage[]): Message[] => {
  return backendMessages.map((backendMessage) => {
    const message: Message = {
      text: backendMessage.message,
      type: backendMessage.type as "text" | "image" | "video" | "audio",
      sender: "bot",
    };

    if (backendMessage.type !== "text" && backendMessage.url) {
      message.url = backendMessage.url;
    }

    return message;
  });
};