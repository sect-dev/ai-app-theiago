import Image, { StaticImageData } from "next/image";
import IconFire from "@/../public/images/icons/icon-fire.webp";
import IconHeart from "@/../public/images/icons/icon-heart.webp";
import IconPinkHearts from "@/../public/images/icons/icon-pink-hearts.webp";
import IconSurprise from "@/../public/images/icons/icon-surprise.webp";

interface advantagesData {
  title: string;
  desc: string;
  id: number;
  image: StaticImageData;
  bg: string;
}

const ITEMS: advantagesData[] = [
  {
    id: 1,
    title: "Hot photos",
    desc: "Get photos of any content and on any theme featuring girls.",
    image: IconFire,
    bg: "linear-gradient(180deg, rgba(255, 214, 65, 0.4) 0%, rgba(254, 75, 26, 0.4) 65%)",
  },
  {
    id: 2,
    title: "Erotic videos",
    desc: "Receive videos from girls where they will show you interesting things.",
    image: IconHeart,
    bg: "linear-gradient(180deg, rgba(255, 8, 230, 0.4) 0%, rgba(255, 8, 127, 0.4) 100%)",
  },
  {
    id: 3,
    title: "Voices",
    desc: "Your favorite characters are happy to voice messages for you.",
    image: IconPinkHearts,
    bg: "linear-gradient(180deg, rgba(8, 152, 255, 0.4) 0%, rgba(33, 8, 255, 0.4) 100%)",
  },
  {
    id: 4,
    title: "Online 24/7",
    desc: "Will be available and respond to your messages at any time",
    image: IconSurprise,
    bg: "linear-gradient(180deg, rgba(74, 255, 8, 0.4) 0%, rgba(23, 198, 0, 0.4) 100%)",
  },
];

const TokenAdvantages = () => {
  return (
    <div className="mb-[8px] grid grid-cols-2 gap-[8px] font-bai-jamjuree">
      {ITEMS.map((i) => (
        <div
          key={i.id}
          className="rounded-[12px] p-[16px]"
          style={{ background: i.bg }}
        >
          <div className="mb-[12px] w-fit rounded-[12px] bg-[#121423] p-[8px]">
            <Image
              src={i.image}
              alt="advantage img"
              width={i.image.width}
              height={i.image.height}
            />
          </div>
          <div className="grid-row-2 grid gap-[7px]">
            <span className="text-[20px] font-bold leading-[24px]">
              {i.title}
            </span>
            <span className="text-[14px] font-semibold leading-[18px]">
              {i.desc}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenAdvantages;
