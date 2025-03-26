import React from 'react';
import Image,{StaticImageData} from "next/image";
import Image1 from '@/../public/images/img/initpage/image-init1.webp'
import Image2 from '@/../public/images/img/initpage/image-init2.webp'


interface IData {
  title: string
  subtitle: string
  id: number
  image: StaticImageData
}

const data:IData[] = [
  {
    title: 'Ethity',
    subtitle: 'Caucasian ',
    id: 1,
    image: Image1
  },
  {
    title: 'Breasts',
    subtitle: 'Big',
    id: 2,
    image: Image2
  },
  {
    title: 'Body',
    subtitle: 'Sporty',
    id: 3,
    image: Image1
  },
  {
    title: 'Butt',
    subtitle: 'Large',
    id: 4,
    image: Image2
  },
]

const SectionSelect = () => {
  return (
    <div className="mb-[17px] pt-[20px] fm:mb-[4.36vw] fm:pt-[4.36vw]">
      <h2 className="text-[28px] font-bold sm:text-[9.07vw] leading-[1.2em] fm:mx-auto fm:max-w-full fm:text-[8.72vw] fm:text-center fm:uppercase">Get your girlfriend</h2>
      <div className="grid grid-cols-[repeat(2,minmax(160px,1fr))] gap-[12px] pt-[25px] fm:gap-[5.13vw] fm:pt-[6.41vw]">
        {data.map(item => {
          return (
            <div
              key={item.id}
              className="init-page-select-card bg-[#2B2D44] relative overflow-hidden flex gap-[10px] items-center p-[4px] rounded-[16px] fm:p-[2.56vw] fm:flex-col fm:w-full fm:h-[51.28vw] fm:before:!opacity-100 fm:bg-transparent"
            >
              <div className="size-[84px] rounded-[16px] overflow-hidden fm:size-full">
                <Image
                  src={item.image.src}
                  width={item.image.width}
                  height={item.image.height}
                  alt="image"
                  className="rounded-[16px] object-cover fm:absolute fm:left-0 fm:top-0"
                />
              </div>
              <div className="flex flex-col fm:flex-row fm:gap-[3px] fm:z-[12] fm:absolute fm:left-1/2 fm:bottom-[10px] fm:-translate-x-1/2">
                <p className="text-[14px] font-semibold mb-[4px] fm:text-[3.59vw]">{item.title}</p>
                <p className="text-[14px] font-bold fm:text-[3.59vw]">{item.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default SectionSelect;