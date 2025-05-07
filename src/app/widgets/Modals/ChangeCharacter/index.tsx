import { useCharacterCreateStore } from '@/app/shared/store/createCharacterStore';
import { useSelectedCardStore } from '@/app/shared/store/publicStore';
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { useId } from 'react';

const CharacterChangeModal = () => {
	const {charactersList} = useSelectedCardStore();
	const {setChangeCharacterModal} = useCharacterCreateStore();
	const charactersArray = charactersList ? Object.values(charactersList) : []

	console.log("modal", charactersList)

	const handleClose = () => {
		console.log("closed modal");
		setChangeCharacterModal(false)
	}

	return (
		<Dialog
			open={true}
			as="div"
			className="relative z-10 focus:outline-none"
			onClose={() => { }}
		>
			<div className="font-lato fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center">
					<DialogPanel
						transition
						className="data-[closed]:transform-[scale(95%)] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0"
					>
						<div className="bg-[#121423] p-[20px] rounded-[24px] font-bai-jamjuree">
							<div className="flex flex-row justify-between items-center">
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
							<div>
								
								{/* {charactersArray.map((char) => (
									<div key={char.id}>
										<span>{char.name}</span>
										<span>{char.age}</span>
									</div>
								))} */}
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}

export default CharacterChangeModal