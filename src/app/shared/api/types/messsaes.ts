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
	is_premium: boolean;
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
	tokens_remaining: number;
	is_premium: boolean;
}

// TODO: Типы для функции генерации изображений. Костыль на место /assemble_content в генераторе. Удалить.
export interface GenerateImagePayload {
	type: string;
	user_id: string | null;
	character_id: string;
	message: string;
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

export interface GenerateImageResponse {
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
	tokens_remaining: number;
	is_premium: boolean;
	forbidden?: boolean;
}