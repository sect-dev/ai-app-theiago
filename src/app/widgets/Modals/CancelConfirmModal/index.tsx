import { useSubscriptionStore } from "@/app/shared/store/subscriptionStore";
import { Dialog, DialogPanel } from "@headlessui/react";
import IconClose from "@/../public/images/icons/icon-close-x.svg";
import Image from "next/image";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { useRouter } from "next/navigation";

const CancelConfirmModal = () => {
  const { recentChats, confirmCancelSubscription, declineCancelSubscription } =
    useSubscriptionStore();
  const { setSelectedCharacterId } = useSelectedCardStore();
  const router = useRouter();

  const handleChatChange = (chatId: number | string) => {
    declineCancelSubscription();
    setSelectedCharacterId(chatId);
    router.push(`/chats`);
  };

  if (!recentChats) {
    console.log("could load recent chats");
    return null;
  }

  return (
    <Dialog
      open={true}
      onClose={() => {}}
      className="relative z-10 font-bai-jamjuree"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel
          transition
          className="w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
        >
          <div className="flex items-center justify-center flex-col">
            <div className="fm:p-0 fm:h-screen fm:w-screen flex items-center rounded-3xl justify-center flex-col relative bg-[#121423] p-[20px] fm:rounded-none">
              <div className="flex items-start">
                <div className="flex flex-col items-center justify-center mb-[16px]">
                  <span className="fm:mt-[12px] text-[32px] font-semibold flex items-start">
                    You&apos;re leaving us?
                  </span>
                  <span className="text-[16px] font-normal opacity-50">
                    {recentChats[0].name} will be sad
                  </span>
                </div>
                <button
                  onClick={declineCancelSubscription}
                  className="fm:hidden right-0 top-0 mr-[20px] mt-[20px] absolute p-[8px] bg-[#191B2C] rounded-[12px] flex items-center justify-center"
                >
                  <Image
                    src={IconClose.src}
                    width={IconClose.width}
                    height={IconClose.height}
                    alt="close"
                  />
                </button>
              </div>
              <div className="fm:pl-[16px] fm:w-full flex w-[688px]  mb-[27px] overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-[8px]">
                {recentChats &&
                  recentChats.map((char) => (
                    <div
                      key={char.id}
                      className="w-[282px] h-[332px] relative flex-shrink-0 "
                    >
                      <Image
                        src={`${char.image}?format=webp&quality=100&width=282&height=332&fit=crop`}
                        width={282}
                        height={332}
                        alt="Character"
                        className="object-cover w-full h-full rounded-[24px]"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-card-gradient rounded-[24px]" />

                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-medium text-lg truncate">
                          {char.name}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="px-[16px] w-full flex items-center justify-center mb-[20px]">
                <button
                  onClick={() => handleChatChange(recentChats[0].id)}
                  className="button-gradient main-gradient fm:w-full w-[308px] rounded-[24px] h-[60px] text-[14px] font-bold"
                >
                  <span className="relative z-[5]">Go to chat</span>
                </button>
              </div>

              <button onClick={confirmCancelSubscription}>
                <span className="text-[14px] font-bold font-noto-sans">
                  Cancel anyway
                </span>
              </button>
              {/* <div className="w-full h-full flex">
					{recentCharacters.map((char) => (
						<div key={char.id} className=" card-shadow card overflow-hidden cursor-grab group animate-fadeIn flex items-end relative p-[12px] h-full rounded-[20px] md:rounded-[24px]">
							<Image
								src={`${char.image}?format=webp&quality=85&width=282&height=332`}
								// sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 300px"
								// fill
								height={332}
								width={282}
								alt="image"
								loading="lazy"
								className=""
							/>
						</div>
					))}
				</div> */}

              {/* <button onClick={declineCancelSubscription}>
					Вернуться
				</button>
				<button 
					onClick={confirmCancelSubscription}
					className="confirm-button"
				>
					Да, отменить
				</button> */}
            </div>
            {/* {recentChats?.map((item) => (<li key={item.id}>{item.id}</li>))} */}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CancelConfirmModal;
