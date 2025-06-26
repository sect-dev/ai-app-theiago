import { safeLocalStorage } from '@/app/shared/helpers';
import { useCharacterCreateStore } from '@/app/shared/store/createCharacterStore';
import { useSelectedCardStore } from '@/app/shared/store/publicStore';
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";

const CharacterChangeModal = () => {
	const {charactersList} = useSelectedCardStore();
	const {setChangeCharacterModal} = useCharacterCreateStore();
	const charactersArray = charactersList ? Object.values(charactersList) : []
	const {characterId, setCharacterId} = useCharacterCreateStore();

	console.log("modal", characterId)

	const handleClose = () => {
		console.log("closed modal");
		setChangeCharacterModal(false)
	}

	const handleCharacterChange = (id: number) => {
		console.log("changed character", id)
		safeLocalStorage.set("charFromGenerated", id.toString())
		setCharacterId(id)
		setChangeCharacterModal(false)
	}

	return (
		<Dialog
			open={true}
			as="div"
			className="relative z-10 focus:outline-none"
			onClose={() => { }}
		>
			<div className="font-lato fixed inset-0 z-10 w-screen overflow-y-auto ">
				<div className="flex min-h-full items-center justify-center">
					<DialogPanel
						transition
						className="data-[closed]:transform-[scale(95%)] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0"
					>
						<div className="bg-[#121423] p-[20px] rounded-[24px] font-bai-jamjuree w-[807px] max-h-[677px] overflow-y-auto scroll-hide">
							<div className="flex flex-row justify-between items-center mb-[20px]">
								<span className="text-[24px] font-semibold">Choose character</span>
								<button
									onClick={handleClose}
									className="flex items-center justify-center rounded-[12px] bg-[#191B2C] p-[8px] fm:hidden"
								>
									<Image
									src="/images/icons/icon-close-x.svg"
									width={16}
									height={16}
									alt="close"
									/>
								</button>
							</div>
							<div className='grid grid-cols-3 gap-[16px]'>

								{charactersArray.map((char) => (
									<div onClick={() => handleCharacterChange(Number(char.id))} key={char.id} className="w-full h-[386px] cursor-pointer relative">
										<div className="h-full relative">
											<Image
												src={`${char?.avatar}?format=webp&quality=100`}
												fill
												sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 300px"
												alt="image"
												className="object-cover rounded-[24px]"
												priority={false}
											/>
										</div>
										<div className="absolute grid grid-rows-[auto_1fr] bottom-0 left-0 right-0 p-[16px] gap-[4px] bg-[#2C3355] rounded-b-[20px]">
											<span className="text-[16px] leading-[1.3] font-bold">{char?.name}</span>
											<span className="text-[14px] leading-[1.5] font-normal text-[#A8A9B1]">{char?.description.en}</span>
										</div>
								    </div>
								))}
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}

export default CharacterChangeModal