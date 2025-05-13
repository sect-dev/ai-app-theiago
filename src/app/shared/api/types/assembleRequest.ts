export interface AssembledImageResponse {
	url: string;
	nsfw: boolean;
	has_video: boolean;
}

export interface AssembledVideoResponse {
	url: string;
}

export interface AssembledRequestPayload {
	token: string;
	type: string;
	character_id: string;
	request: string;
	censorship: {
		image: string;
		video: string;
	}
}

export interface AssembledRequestProps {
	type: string;
	characterId: number;
	request: string;
	censorship: string;
}

export interface LastAssebledContentProps {
	type: string;
	characterId: number;
}

export interface LastAssembledContentPayload {
	token: string;
	type: string;
	character_id: string;
	count: number;
}

export interface LastAssembledContentResponse {
	created_at: string;
	request: string;
	nsfw: boolean;
	url: string;
}