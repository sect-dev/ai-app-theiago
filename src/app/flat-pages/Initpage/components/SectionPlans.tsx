'use client'
import React, {useState} from 'react';
import Image from "next/image";
import clsx from "clsx";
import ImageArrow from "@/../public/images/icons/icon-payment-arrow.svg";
import IconExpand from '@/../public/images/icons/icon-expand-white.svg';

interface PriceData {
  title: string
  fullPrice: string
  discountPrice: string
  fullPricePerDay: string
  discountPricePerDay: string
  id: number
  currency: string
  isPopular: boolean
  additionalInfo: string[]
}

const priceData:PriceData[] = [
  {
    title: "1 month",
    fullPrice: "24,99",
    discountPrice: "15,99",
    fullPricePerDay: "8,79",
    discountPricePerDay: "0,50",
    id: 1,
    currency: "usd",
    isPopular: false,
    additionalInfo: [
    '💬 Unlimited dialogues on any topics',
    '🔥 300 photos in any poses',
    '🍓 NSFW support for 18+ users',
    '❤️ Create your own girlfriends',
    '💕️ Video and audio content',
   ]
  },
  {
    title: "3 month",
    fullPrice: "49,99",
    discountPrice: "24,99",
    fullPricePerDay: "8,79",
    discountPricePerDay: "0,28",
    id: 2,
    currency: "usd",
    isPopular: true,
    additionalInfo: [
      '💬 Unlimited dialogues on any topics',
      '🔥 300 photos in any poses',
      '🍓 NSFW support for 18+ users',
      '❤️ Create your own girlfriends',
      '💕️ Video and audio content',
    ]
  },
  {
    title: "6 month",
    fullPrice: "79,99",
    discountPrice: "49,99",
    fullPricePerDay: "8,79",
    discountPricePerDay: "0,28",
    id: 3,
    currency: "usd",
    isPopular: false,
    additionalInfo: [
      '💬 Unlimited dialogues on any topics',
      '🔥 300 photos in any poses',
      '🍓 NSFW support for 18+ users',
      '❤️ Create your own girlfriends',
      '💕️ Video and audio content',
    ]
  }
]

const SectionPlans = () => {
  const [selectedPrice,setSelectedPrice] = useState<PriceData>(priceData[1])

  return (
    <div>
      <div className="space-y-[12px] mb-[24px]">
        {priceData.map(item => {
          const firstLetterDiscountPrice = item.discountPricePerDay.split(',')[0]
          const discountPriceWithoutFirstLetter = item.discountPricePerDay.split(',')[1]
          return (
            <div
              onClick={() => setSelectedPrice(item)}
              key={item.id}
              className={clsx("init-page-gradient-border relative before:z-[1] before:rounded-[16px] before:opacity-0 hover:before:opacity-100 cursor-pointer bg-[#2B2D44] rounded-[16px] p-[16px] hover:shadow-card-shadow", {
                "before:opacity-100 shadow-card-shadow": selectedPrice.id === item.id
              })}
            >
              <div className={clsx("flex items-center justify-between ", {
                "pt-[12px]": item.isPopular
              })}>
                <div>
                  <p className="font-semibold leading-[1.5em] text-[16px]">{item.title}</p>
                  <div className="flex items-center gap-[4px] text-[12px] font-asap">
                    <p className="relative">
                      <span className="uppercase opacity-40">{item.currency} {item.fullPrice}</span>
                      <span className="w-full absolute bg-button-gradient h-[2px] z-[5] left-0 top-1/2 -translate-y-1/2" />
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
                    <span className="w-full absolute bg-button-gradient h-[2px] z-[5] left-0 top-1/2 -translate-y-1/2" />
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
              <div className="pt-[12px]">
                <button className="text-[13px] w-full font-asap flex items-center justify-between">
                  Learn more
                  <Image
                    src={IconExpand.src}
                    width={IconExpand.width}
                    height={IconExpand.height}
                    alt="icon arrow"

                  />
                </button>
                {selectedPrice.id === item.id && (
                  <div className="animate-fadeIn">
                    <ul className="py-[12px] space-y-[6px]">
                      {item.additionalInfo.map((item,index) => {
                        return (
                          <li key={index} className="text-[14px] font-medium">
                            {item}
                          </li>
                        )
                      })}
                    </ul>

                    <button className="relative overflow-hidden bg-button-gradient rounded-[24px] w-full h-[60px] text-white text-center">
                      <span className="uppercase  font-bold font-noto text-[14px]">get your girlfriend</span>
                      <span className="bg-white-gradient  animate-[moveRight_4.25s_ease-in_infinite_forwards] block rotate-[20deg] size-[125px] absolute -left-1/2 top-1/2 -translate-y-1/2" />
                    </button>
                    <p className="text-center font-bold text-center text-[12px] pt-[12px]">🔥 65,756 people received a girlfriend this week. 🔥</p>
                  </div>
                )}
              </div>
              {(item.isPopular && item.id === selectedPrice.id) && (
                <div className="absolute animate-fadeIn w-full h-[17px] left-0 top-0 flex items-center justify-center rounded-t-[16px] bg-button-gradient">
                    <span className="uppercase font-bold text-[11px]">
                      most popular
                    </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default SectionPlans;