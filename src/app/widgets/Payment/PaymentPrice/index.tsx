import React, {useState} from 'react';
import Image from "next/image";
import ImageArrow from '@/../public/images/icons/icon-payment-arrow.svg';
import IconMoney from '@/../public/images/icons/icon-money.svg';
import clsx from "clsx";

interface PriceData {
  title: string
  description?: string
  fullPrice: string
  discountPrice: string
  fullPricePerDay: string
  discountPricePerDay: string
  id: number
  currency: string
  isPopular: boolean
}

const priceData:PriceData[] = [
  {
    title: "1-Week Trial",
    description: "4-week relationships",
    fullPrice: "59,99",
    discountPrice: "29,99",
    fullPricePerDay: "8,79",
    discountPricePerDay: "0,19",
    id: 1,
    currency: "usd",
    isPopular: false
  },
  {
    title: "4-Week Relationships",
    fullPrice: "59,99",
    discountPrice: "29,99",
    fullPricePerDay: "8,79",
    discountPricePerDay: "0,19",
    id: 2,
    currency: "usd",
    isPopular: true
  },
  {
    title: "12-Week Relationships",
    fullPrice: "59,99",
    discountPrice: "29,99",
    fullPricePerDay: "8,79",
    discountPricePerDay: "0,19",
    id: 3,
    currency: "usd",
    isPopular: false
  }
]

const PaymentPrice = () => {
  const [selectedPrice,setSelectedPrice] = useState<PriceData>(priceData[1])

  return (
    <div className="space-y-[8px]">
      <div className="bg-[#191B2C] h-[415px] shrink-0 w-[375px] p-[20px] rounded-[32px]">
        <div className="space-y-[12px] mb-[24px]">
          {priceData.map(item => {
            const firstLetterDiscountPrice = item.discountPricePerDay.split(',')[0]
            const discountPriceWithoutFirstLetter = item.discountPricePerDay.split(',')[1]
            return (
              <div
                onClick={() => setSelectedPrice(item)}
                key={item.id}
                className={clsx("gradient-border relative before:z-[1] before:rounded-[16px] before:opacity-0 hover:before:opacity-100 cursor-pointer bg-[#2B2D44] rounded-[16px] p-[16px] hover:shadow-card-shadow", {
                  "before:opacity-100 shadow-card-shadow": selectedPrice.id === item.id
                })}
              >
                <div className={clsx("flex items-center justify-between ", {
                  "pt-[12px]": item.isPopular
                })}>
                  <div>
                    <p className="font-semibold leading-[1.5em] text-[16px]">{item.title}</p>
                    {item.description && <p className="text-[11px] opacity-40 font-asap leading-[1.3em]">{item.description}</p>}
                    <div className="flex items-center gap-[4px] text-[12px] font-asap">
                      <p className="relative">
                        <span className="uppercase opacity-40">{item.currency} {item.fullPrice}</span>
                        <span className="w-full absolute bg-main-gradient h-[2px] z-[5] left-0 top-1/2 -translate-y-1/2" />
                      </p>
                      <Image
                        src={ImageArrow.src}
                        width={ImageArrow.width}
                        height={ImageArrow.height}
                        alt="arrow"
                      />
                      <p>
                        <span className="uppercase opacity-40">{item.currency} {item.discountPrice}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-end gap-[6px] leading-[1.5em] font-asap">
                    <p className="flex items-center gap-[4px] ">
                      <span className="text-[12px] font-semibold uppercase">{item.currency}</span>
                      <span className="relative text-[12px]">
                    <span className="opacity-40">{item.fullPricePerDay}</span>
                    <span className="w-full absolute bg-main-gradient h-[2px] z-[5] left-0 top-1/2 -translate-y-1/2" />
                  </span>
                    </p>
                    <p>
                  <span className="text-[12px] font-semibold leading-[1.3em]">
                    <span className="text-[24px]">{firstLetterDiscountPrice}</span>
                    <span>,{discountPriceWithoutFirstLetter}</span>
                  </span>
                      <span className="opacity-40 text-[12px]"> / day</span>
                    </p>
                  </div>
                </div>
                {(item.isPopular && item.id === selectedPrice.id) && (
                  <div className="absolute animate-fadeIn w-full h-[17px] left-0 top-0 flex items-center justify-center rounded-t-[16px] bg-main-gradient">
                    <span className="uppercase font-bold text-[11px]">
                      most popular
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <button className="relative main-gradient overflow-hidden w-full h-[60px] font-bold font-noto-sans text-[14px] text-center rounded-[24px]">
          <span className="relative z-[5]">Start your relationships</span>
          <span className="bg-white-gradient animate-[moveRight_4.25s_ease-in_infinite_forwards] block rotate-[20deg] size-[125px] absolute -left-1/2 top-1/2 -translate-y-1/2" />
        </button>
        <p className="font-bai-jamjuree pt-[12px] text-[12px] text-center font-bold">
          🔥 65,756 people received a girlfriend this week. 🔥
        </p>
      </div>
      <div className="bg-[#191B2C] py-[8px] font-bai-jamjuree rounded-[12px] flex justify-center items-center gap-[8px]">
        <Image
          src={IconMoney.src}
          width={IconMoney.width}
          height={IconMoney.height}
          alt="icon money"
        />
        <span className="text-[20px] leading-[1.2em] font-bold uppercase tracking-[-0.04em]">
          30 DAYS
        </span>
        <span className="text-[14px] leading-[1.2em] font-semibold tracking-[-0.04em]">
          Money back guarantee
        </span>
      </div>
      <div className="text-[12px] space-y-[8px] leading-[0.9em] font-bai-jamjuree opacity-15 font-medium text-center">
        <p className="tracking-[-0.07em] max-w-[275px] mx-auto ">
          Without cancellation, before the selected discounted intro plan ends, i accept that AiGo will automatically charge
          USD 9999 every 4 weeks until i cancel. Cancel online via the account page on the app.
        </p>
        <p className="tracking-[-0.07em]">
          DevSect FZE LLC BLB-BC5-840 <br/> AMC - BOULEVARD-B BUILDING, Ajman, United Arab Emirates
        </p>
      </div>
    </div>
  );
};

export default PaymentPrice;