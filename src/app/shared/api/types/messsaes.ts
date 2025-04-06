export interface GenerateUserTextPayload {
  type: string;
  user_id: string | null;
  character_id: string | null;
  locale: string;
  allowed_response_types: string[];
  censorship: {
    text: string;
    image: string;
    audio: string;
    video: string;
  };
  token: string;
}

export interface ApiResponse {
  request_nsfw: boolean;
  response: string[];
  tokens_remaining: number;
}

export interface StartRequest {
  type: string;
  user_id: string | null;
  character_id: string | null;
  locale: string;
  allowed_response_types: string[];
  censorship: {
    text: string;
    image: string;
    audio: string;
    video: string;
  };
  token: string;
}

export interface StartResponse {
  request_nsfw: boolean;
  character_id: string;
  response: Array<{
    type: string;
    message: string;
    url?: string;
    row_id: number;
    timestamp: number;
    nsfw: boolean;
  }>;
  tokens_remaining: number
}