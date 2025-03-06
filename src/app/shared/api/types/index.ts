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

export interface Message {
  text: string;
  type: "text" | "image" | "video" | "audio";
  url?: string;
  sender: "user" | "bot";
}

export interface PreparedAvatar {
  id: number,
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
}

export interface SendMessageParam {
  userId: string,
  characterId: string,
  message: string
}