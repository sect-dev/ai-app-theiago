import { apiClient, getCurrentToken } from "@/app/shared/api/index";
import { AssembledRequestPayload, AssembledRequestProps, LastAssebledContentProps, LastAssembledContentPayload, LastAssembledContentResponse } from "./types/assembleRequest";

export const assembleRequest = async <T>(props: AssembledRequestProps): Promise<T | null> => {
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
		const response = await apiClient.post<T>(
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

export const lastAssembledRequest = async (props: LastAssebledContentProps): Promise<LastAssembledContentResponse[] | null> => {
 const {type, characterId} = props;

 const token = await getCurrentToken();

 const payload: LastAssembledContentPayload = {
	token: token || "",
	type: type,
	character_id: characterId?.toString() ?? "",
	count: 20
 }

 try {
  const response = await apiClient.post<LastAssembledContentResponse[]>("/last_assembled_content", payload)

  if (response.data) {return response.data}

  return null
 } catch (e) {
	console.log(e)
	return null
 }
}