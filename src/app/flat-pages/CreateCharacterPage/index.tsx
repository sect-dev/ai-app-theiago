import CharacterType from "./components/CharacterType";

const CreateCharacterPage = () => {
	return (
		<div className="flex h-fit justify-center">
			<div className="w-[491px] rounded-[24px] bg-[#121423] p-[32px]">
				<CharacterType />
			</div>
		</div>
	);
};

export default CreateCharacterPage;
