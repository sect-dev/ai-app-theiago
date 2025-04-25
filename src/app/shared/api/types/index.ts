export interface IAvatar {
  avatar: string
  image: string
  description: {
    en: string
  }
  name: string
  shortDescription: {
    en: string
  }
  visible: boolean
  id: number
  position: number
  gender: string
  isPremium: boolean
  tags: string[]
  voice: string
  style: string
  listMsgs: ListMsgs[]
  listImage: string[]
  top_horizontal_list_position: number
}

interface ListMsgs {
  en: string
}

interface Localization {
  en: string;
}

export interface Character {
  isAds: boolean;
  dataVersion: number;
  type: string;
  listVideo: string[];
  shortDescription: Localization;
  imageZero: string;
  apps: string;
  voice: string;
  sdName: string;
  video: string;
  name: string;
  audioZeroToken: Localization;
  isPremium: boolean;
  position: number;
  badge: Localization;
  listProfilePhoto: string[];
  created: number;
  description: Localization;
  visible: boolean;
  tags: string[];
  id: number;
  vitrinaMsg2: Localization;
  modelDs: string;
  image: string;
  modelGpt: string;
  groupImg: string;
  listImage: string[];
  avatar: string;
  listMsgs: Message[];
  audioHello: Localization;
  vitrinaMsg1: Localization;
  gender: string;
  style: string;
  ethnicity: string;
  height: number;
  age: string;
  final_age: number;
  body_type: string;
  breast_type: string;
  butt_type: string;
  hair_style: string;
  occupation: string;
  clothes: string[];
  top_horizontal_list_position: number;
}

export interface CharacterByConstructor {
  created_at: number;
  name: string;
  style: string;
  hair_color: string;
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
  generation_complete: boolean;
  extra: {
    avatar: string;
    sdName: string;
    imageZero: string;
    audioHello: {
      [key: string]: string;
    };
    character_age: number;
    final_occupation: string;
    generation_start: number;
    listProfilePhoto: string[];
  };
  character_id: string;
}

type UrlType = string | { en: string };

export interface Message {
  text: string;
  type: "text" | "image" | "video" | "audio" | "audio_paywall" | "video_paywall" | "text_paywall" | "image_paywall";
  url?: UrlType;
  sender: "user" | "bot";
}

export interface PreparedAvatar {
  id: number | string,
  image: string,
  listMsgs: Message[]
  name: string
  photos: string[]
  videos: string[]
  lastMessageTime: Date
  startPhotosCount: number
}

export interface MessageResponse {
  type: "text" | "video" | "audio" | "image";
  message: string;
  url?: string;
  row_id: number;
  timestamp: number;
  nsfw: boolean;
}

export interface SendMessageResponse {
  request_nsfw: boolean;
  character_id: string;
  response: MessageResponse[];
  tokens_remaining: number;
  is_premium: boolean
}

export interface SendMessageParam {
  userId: string,
  characterId: string,
  message: string
}

export interface UserStatus {
  subscription?: {
    active: boolean,
    cancelled: boolean,
    end: string,
    start: string,
    orderNumber: string,
    originalOrderNumber: string,
    price: number,
    product_id: string,
  },
  tokens: number;
}