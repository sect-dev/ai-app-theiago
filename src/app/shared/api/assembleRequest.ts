import { apiClient, getCurrentToken } from "@/app/shared/api/index";
import { AssembledImageResponse, AssembledRequestPayload, AssembledRequestProps, AssembledVideoResponse } from "./types/assembleRequest";

export const assembleRequest = async (props: AssembledRequestProps): Promise<AssembledImageResponse | AssembledVideoResponse | null> => {
	const {censorship, characterId, request, type} = props
	const token = await getCurrentToken();


	const payload: AssembledRequestPayload = {
		token: token || "",
		type: type,
		character_id: characterId?.toString() ?? "",
		request: request,
		censorship: {
			image: censorship,
			video: censorship,
		}
	}

	try {
		const response = await apiClient.post<AssembledImageResponse | AssembledVideoResponse>(
			"/assemble_content",
			payload
		)

		if (response.data) {
			return response.data
		}

		return null;
	} catch (error) {
		console.log(error)
		return null;
	}
}