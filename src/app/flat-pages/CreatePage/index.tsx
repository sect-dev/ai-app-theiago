import { getCharactersList } from "@/app/shared/api/characters";
import CharacterBlock from "./components/CharacterBlock";
import CreatedBlock from "./components/CreatedBlock";
import CreateImageBlock from "./components/CreateImageBlock";

const CreatePage = async () => {
	const charactersObj = await getCharactersList();
	const characters = charactersObj
		? Object.values(charactersObj).sort((a, b) => a?.position - b?.position)
		: [];

	return (
		<div className="grid grid-cols-[auto_1fr_auto] gap-[12px] p-[12px] md:grid-cols-none md:grid-rows-[auto_auto_auto] md:p-[16px]">
			<CharacterBlock characters={characters} />

			<CreateImageBlock />

			<CreatedBlock />
		</div>
	);
};

export default CreatePage;
