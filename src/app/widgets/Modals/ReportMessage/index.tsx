import { Dialog, DialogPanel } from "@headlessui/react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import IconClose from "@/../public/images/icons/icon-close-x.svg";
import { useReportStore } from "@/app/shared/store/reportStore";

interface FormData {
  message: string;
}

const ReportMessage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { setReportModalActive, setReportSubmitted } = useReportStore();

  const handleCloseModal = () => {
    reset();
    setReportModalActive(false);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    setReportSubmitted(true);
    reset();
    setReportModalActive(false);
  };

  return (
    <Dialog
      open={true}
      onClose={() => {}}
      className="relative z-50 font-bai-jamjuree"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel
          transition
          className="data-[closed]:transform-[scale(95%)] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col rounded-3xl bg-[#121423] p-[20px] sm:h-screen sm:w-screen sm:rounded-none">
              <div>
                <button
                  onClick={handleCloseModal}
                  className="mb-[12px] flex items-center justify-center rounded-[12px] bg-[#191B2C] p-[8px]"
                >
                  <Image
                    src={IconClose.src}
                    width={IconClose.width}
                    height={IconClose.height}
                    alt="close"
                  />
                </button>
              </div>
              <div className="mb-[24px] grid grid-rows-2 gap-[8px]">
                <span className="text-[20px] font-semibold leading-[28px]">
                  Report a message
                </span>
                <span className="text-[14px] font-medium">
                  Tell us more about what you didn&apos;t like
                </span>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-rows-[auto_auto]"
              >
                <TextareaAutosize
                  {...register("message")}
                  placeholder="Your message here"
                  className="mb-[24px] block min-h-[48px] w-full resize-none rounded-[16px] bg-[#21233A] p-[12px] pr-[160px] text-[14px] leading-[1.5em] placeholder:text-[14px] placeholder:font-medium placeholder:opacity-50 focus:outline-none md:pr-[135px] sm:pr-[30px] sm:text-[16px]"
                  minRows={3}
                  maxRows={3}
                />
                <button
                  type="submit"
                  className="h-[40px] rounded-[12px] bg-blue-button-gradient text-[15px] font-bold"
                >
                  Send Report
                </button>
              </form>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ReportMessage;
