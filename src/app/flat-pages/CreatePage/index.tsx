import { getCharactersList } from '@/app/shared/api/characters';
import CharacterBlock from './components/CharacterBlock';
import CreatedBlock from './components/CreatedBlock';
import CreateImageBlock from './components/CreateImageBlock';


const CreatePage = async () => {

	const characters = await getCharactersList()

	return (
		<div className="grid grid-cols-[auto_1fr_auto] p-[12px] gap-[12px]">

			<CharacterBlock characters={characters}  />

			<CreateImageBlock />

			<CreatedBlock />
			
		</div>
	);
};

export default CreatePage;