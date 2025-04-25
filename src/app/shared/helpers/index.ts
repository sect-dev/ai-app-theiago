import {Character, Message, PreparedAvatar} from "@/app/shared/api/types";

export const saveCharacterToLocalStorage = (avatar: Character | null, messages: Message[],tokens: number) => {
  if (typeof window !== "undefined") {
    const storedIds = localStorage.getItem("chatStartedCharacters");
    const characters: PreparedAvatar[] = storedIds ? JSON.parse(storedIds) : [];
    const currentTime = new Date();

    const startImage = messages.find(item => item.type === 'image')

    const startImageUrl = typeof startImage?.url === "string" 
      ? startImage.url 
      : startImage?.url?.en ?? '';

      const photos = [...(avatar?.listProfilePhoto || []), startImageUrl].filter(Boolean);

    if (!characters.some(a => a.id === avatar?.id)) {
      const newCharacter = {
        id: avatar?.id ?? '',
        image: avatar?.avatar ?? '',
        listMsgs: messages,
        name: avatar?.name ?? '',
        photos,
        videos: [],
        lastMessageTime: currentTime,
        startPhotosCount: 0,
      };
      characters.push(newCharacter);
    }
    localStorage.setItem("chatStartedCharacters", JSON.stringify(characters));
    localStorage.setItem("tokens", JSON.stringify(tokens));
    return characters
  }
};

export function getMessageSize(size: number, position: number): string {
  const maxSize = 399000;
  const minSize = 51000;

  if (size === 1) return (maxSize / 1000).toFixed(1) + "k";

  const step: number = (maxSize - minSize) / (size - 1);
  const index: number = (position - 10) / (10000 - 10) * (size - 1);
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

export function calculateCostPerDay(totalCost: number, daysCount: number): number {
  const costPerDay = totalCost / daysCount;
  return parseFloat(costPerDay.toFixed(2));
}

export const setAccessTokenCookie = (token: string) => {
  if (typeof window !== 'undefined') {
    const maxAge = 3600;
    document.cookie = `accessToken=${token}; path=/; max-age=${maxAge}; secure; samesite=strict`;
  }
};

export const clearAccessTokenCookie = () => {
  if (typeof window !== 'undefined') {
    document.cookie = `accessToken=; path=/; max-age=0`;
  }
};

export const formatISODate = (
  isoString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
): string => {
  try {
    const date = new Date(isoString);
    
    // Проверка валидности даты
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string');
    }
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch (error) {
    console.error('Failed to format date:', error);
    return 'Invalid date';
  }
}