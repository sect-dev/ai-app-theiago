import CharacterType from "./components/CharacterType";

const CreateCharacterPage = () => {
	return (
		<div className="flex h-fit justify-center sm:h-[100vh]">
			<div className="relative mt-[16px] w-[491px] overflow-x-hidden rounded-[24px] bg-[#121423] p-[32px] sm:rounded-none">
				<CharacterType />
			</div>
		</div>
	);
};

export default CreateCharacterPage;
