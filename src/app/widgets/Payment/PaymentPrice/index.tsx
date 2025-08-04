import React, { FC, useState } from "react";
import Image from "next/image";
import ImageArrow from "@/../public/images/icons/icon-payment-arrow.svg";
import IconMoney from "@/../public/images/icons/icon-money.svg";
import clsx from "clsx";
import { PaymentPlan } from "@/app/shared/api/payment";
import { calculateCostPerDay } from "@/app/shared/helpers";

interface ComponentProps {
	plans: PaymentPlan[] | null;
}

const PaymentPrice: FC<ComponentProps> = ({ plans }) => {
	const currentPlan = plans ? plans[1] : null;
	const [selectedPrice, setSelectedPrice] = useState<PaymentPlan | null>(
		currentPlan
	);

	return (
		<div className="space-y-[8px]">
			<div className="h-[505px] w-[375px] shrink-0 rounded-[32px] bg-[#191B2C] p-[20px]">
				<div className="mb-[24px] space-y-[12px]">
					{plans &&
						plans.map((item) => {
							const days = item.interval_length * 30;
							const fullPricePerDay = calculateCostPerDay(
								+item.amount_recurring,
								days
							);
							const discountPricePerDay = calculateCostPerDay(
								+item.amount_initial,
								days
							);
							const firstLetterDiscountPrice = fullPricePerDay
								.toString()
								.split(".")[0];
							const discountPriceWithoutFirstLetter = discountPricePerDay
								.toString()
								.split(".")[1];

							return (
								<div
									onClick={() => setSelectedPrice(item)}
									key={item.id}
									className={clsx(
										"gradient-border relative cursor-pointer rounded-[16px] bg-[#2B2D44] p-[16px] before:z-[1] before:rounded-[16px] before:opacity-0 hover:shadow-card-shadow hover:before:opacity-100",
										{
											"shadow-card-shadow before:opacity-100":
												selectedPrice?.id === item.id
										}
									)}
								>
									<div
										className={clsx("flex items-center justify-between", {
											"pt-[12px]": item.id === selectedPrice?.id
										})}
									>
										<div>
											<p className="text-[16px] font-semibold leading-[1.5em]">
												{item.interval_length} {item.interval_unit}
											</p>
											{/*{item.description && <p className="text-[11px] opacity-40 font-asap leading-[1.3em]">{item.description}</p>}*/}
											<div className="flex items-center gap-[4px] font-asap text-[12px]">
												<p className="relative">
													<span className="uppercase opacity-40">
														{item.currency} {item.amount_recurring}
													</span>
													<span className="absolute left-0 top-1/2 z-[5] h-[2px] w-full -translate-y-1/2 bg-main-gradient" />
												</p>
												<Image
													src={ImageArrow.src}
													width={ImageArrow.width}
													height={ImageArrow.height}
													alt="arrow"
												/>
												<p>
													<span className="uppercase opacity-40">
														{item.currency} {item.amount_initial}
													</span>
												</p>
											</div>
										</div>
										<div className="flex items-end gap-[6px] font-asap leading-[1.5em]">
											<p className="flex items-center gap-[4px]">
												<span className="text-[12px] font-semibold uppercase">
													{item.currency}
												</span>
												<span className="relative text-[12px]">
													<span className="opacity-40">{fullPricePerDay}</span>
													<span className="absolute left-0 top-1/2 z-[5] h-[2px] w-full -translate-y-1/2 bg-main-gradient" />
												</span>
											</p>
											<p>
												<span className="text-[12px] font-semibold leading-[1.3em]">
													<span className="text-[24px]">
														{firstLetterDiscountPrice}
													</span>
													<span>,{discountPriceWithoutFirstLetter}</span>
												</span>
												<span className="text-[12px] opacity-40"> / day</span>
											</p>
										</div>
									</div>
									{item.id === selectedPrice?.id && (
										<div className="absolute left-0 top-0 flex h-[17px] w-full animate-fadeIn items-center justify-center rounded-t-[16px] bg-main-gradient">
											<span className="text-[11px] font-bold uppercase">
												most popular
											</span>
										</div>
									)}
								</div>
							);
						})}
				</div>
				<button className="main-gradient relative h-[60px] w-full overflow-hidden rounded-[24px] text-center font-noto-sans text-[14px] font-bold">
					<span className="relative z-[5]">Start your relationships</span>
					<span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
				</button>
				<p className="pt-[12px] text-center font-bai-jamjuree text-[12px] font-bold">
					🔥 65,756 people received a girlfriend this week. 🔥
				</p>
			</div>
			<div className="flex items-center justify-center gap-[8px] rounded-[12px] bg-[#191B2C] py-[8px] font-bai-jamjuree">
				<Image
					src={IconMoney.src}
					width={IconMoney.width}
					height={IconMoney.height}
					alt="icon money"
				/>
				<span className="text-[20px] font-bold uppercase leading-[1.2em] tracking-[-0.04em]">
					30 DAYS
				</span>
				<span className="text-[14px] font-semibold leading-[1.2em] tracking-[-0.04em]">
					Money back guarantee
				</span>
			</div>
			<div className="space-y-[8px] text-center font-bai-jamjuree text-[12px] font-medium leading-[0.9em] opacity-15">
				<p className="mx-auto max-w-[275px] tracking-[-0.07em]">
					Without cancellation, before the selected discounted intro plan ends,
					i accept that AiGo will automatically charge USD 9999 every 4 weeks
					until i cancel. Cancel online via the account page on the app.
				</p>
				<p className="tracking-[-0.07em]">
					New Verve Limited <br /> 86–90 Paul Street, London, England, EC2A 4NE
				</p>
			</div>
		</div>
	);
};

export default PaymentPrice;
