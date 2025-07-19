import { Dialog, DialogPanel } from "@headlessui/react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import IconClose from "@/../public/images/icons/icon-close-x.svg";
import { useReportStore } from "@/app/shared/store/reportStore";
import Star1 from "@/../public/images/img/feedbackModal/star1.png";
import Star2 from "@/../public/images/img/feedbackModal/star2.png";
import Star3 from "@/../public/images/img/feedbackModal/star3.png";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface FormData {
	message: string;
}

const STARS = [
	{
		id: 0,
		src: Star1
	},
	{
		id: 1,
		src: Star2
	},
	{
		id: 2,
		src: Star3
	},
	{
		id: 3,
		src: Star3
	},
	{
		id: 4,
		src: Star3
	}
];

const FeedBackModal = () => {
	const { register, handleSubmit, reset } = useForm<FormData>();
	const t = useTranslations("FeedBackModal");
	const { setFeedBackModalActive, setSelectedStar, selectedStar } =
		useReportStore();

	const handleCloseModal = () => {
		reset();
		setFeedBackModalActive(false);
	};

	const handleSelectStar = (star: number) => {
		setSelectedStar(star);
	};

	const onSubmit = (data: FormData) => {
		reset();
		setFeedBackModalActive(false);
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
					<div className="flex max-w-[328px] flex-col items-center justify-center">
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
									{t("feedback_title")}
								</span>
								<span className="text-[14px] font-medium tracking-wide">
									{t("feedback_description")}
								</span>
							</div>

							<div className="mb-[8px] flex gap-[8px]">
								{STARS.map((star) => (
									<button
										key={star.id}
										className={clsx(
											"relative flex h-[38px] w-[51px] items-center justify-center rounded-[16px] bg-[#191B2C] px-[19px] py-[12px] transition-all duration-300 ease-out",
											selectedStar === star.id && "border-main-gradient"
										)}
										onClick={() => handleSelectStar(star.id)}
									>
										<Image
											src={star.src}
											alt="star"
											width={star.src.width}
											height={star.src.height}
											className="absolute"
										/>
									</button>
								))}
							</div>

							<div className="mb-[24px] flex items-center justify-between">
								<span className="text-[12px] font-medium tracking-wide opacity-50">
									{t("feedback_ididnt_like")}
								</span>
								<span className="text-[12px] font-medium tracking-wide opacity-50">
									{t("feedback_like")}
								</span>
							</div>

							<form
								onSubmit={handleSubmit(onSubmit)}
								className="grid grid-rows-[auto_auto]"
							>
								<TextareaAutosize
									{...register("message")}
									placeholder={t("feedback_placeholder")}
									className="mb-[24px] block min-h-[48px] w-full resize-none rounded-[16px] bg-[#21233A] p-[12px] text-[14px] leading-[1.5em] placeholder:text-[14px] placeholder:font-medium placeholder:opacity-50 focus:outline-none md:pr-[135px] sm:pr-[30px] sm:text-[16px]"
									minRows={3}
									maxRows={6}
								/>
								<button
									type="submit"
									className="h-[40px] rounded-[12px] bg-blue-button-gradient text-[15px] font-bold"
								>
									{t("feedback_button")}
								</button>
							</form>
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default FeedBackModal;
