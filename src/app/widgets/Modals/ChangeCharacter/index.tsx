import { safeLocalStorage } from "@/app/shared/helpers";
import { useGenerateImageStore } from "@/app/shared/store/generateImageStore";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const CharacterChangeModal = () => {
	const { charactersList } = useSelectedCardStore();
	const charactersArray = charactersList ? Object.values(charactersList) : [];
	const { setCharacterId, setChangeCharacterModal } = useGenerateImageStore();
	const t = useTranslations("ImageGenerator");

	const handleClose = () => {
		console.log("closed modal");
		setChangeCharacterModal(false);
	};

	const handleCharacterChange = (id: number | string) => {
		console.log("changed character", id);
		safeLocalStorage.set("charFromGenerated", id.toString());
		setCharacterId(id);
		setChangeCharacterModal(false);
	};

	return (
		<Dialog
			open={true}
			as="div"
			className="relative z-[60] focus:outline-none"
			onClose={() => {}}
		>
			<div className="font-lato fixed inset-0 z-10 w-screen">
				<div className="flex min-h-full items-center justify-center">
					<DialogPanel
						transition
						className="data-[closed]:transform-[scale(95%)] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0"
					>
						<div className="scroll-hide max-h-[677px] w-[807px] overflow-y-auto rounded-[24px] bg-[#121423] p-[20px] font-bai-jamjuree xs:rounded-[0px]">
							<div className="mb-[20px] flex flex-row items-center justify-between">
								<span className="text-[24px] font-semibold">
									{t("generator_choose_character")}
								</span>
								<button
									onClick={handleClose}
									className="flex items-center justify-center rounded-[12px] bg-[#191B2C] p-[8px]"
								>
									<Image
										src="/images/icons/icon-close-x.svg"
										width={16}
										height={16}
										alt="close"
									/>
								</button>
							</div>
							<div className="grid grid-cols-3 gap-[16px] xs:grid-cols-2">
								{charactersArray.map((char) => (
									<div
										onClick={() => handleCharacterChange(char.id)}
										key={char.id}
										className="card-shadow relative h-[386px] w-full cursor-pointer overflow-hidden rounded-[24px] xs:h-[268px]"
									>
										<div className="relative h-full">
											<Image
												src={`${char?.avatar}?format=webp&quality=100`}
												fill
												sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 300px"
												alt="image"
												className="rounded-[24px] object-cover"
												priority={false}
											/>
										</div>

										<div className="absolute bottom-0 left-0 right-0 z-[10] grid grid-rows-[auto_1fr] gap-[4px] bg-[#2C3355] p-[16px] xs:bg-transparent">
											<span className="w-full text-[16px] font-bold leading-[1.3]">
												{char?.name}
											</span>
											<span className="line-clamp-2 text-[14px] font-normal leading-[1.5] text-[#A8A9B1] xs:text-[#fff] xs:opacity-60">
												{char?.description.en}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default CharacterChangeModal;
