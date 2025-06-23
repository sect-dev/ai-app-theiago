import { getCharactersList } from '@/app/shared/api/characters';
import CharacterBlock from './components/CharacterBlock';
import CreatedBlock from './components/CreatedBlock';
import CreateImageBlock from './components/CreateImageBlock';


const CreatePage = async () => {

	console.log("asds")

	const charactersObj = await getCharactersList();
	const characters = charactersObj ? Object.values(charactersObj).sort((a, b) => a?.position - b?.position) : [];

	return (
		<div className="grid grid-cols-[auto_1fr_auto] xs:grid-rows-3 xs:grid-cols-none xs:p-[16px] p-[12px] gap-[12px]">

			<CharacterBlock characters={characters} />

			<CreateImageBlock />

			<CreatedBlock />

		</div>
	);
};

export default CreatePage;