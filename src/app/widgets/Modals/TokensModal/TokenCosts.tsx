import IconTokenPayWall from "@/../public/images/icons/icon-token-paywall.svg";
import Image from "next/image";

const TOKEN_COSTS = [
  {
    id: 1,
    emoji: "💬",
    desc: "1 answer",
    cost: "0.1",
    icon: IconTokenPayWall
  },
  {
    id: 2,
    emoji: "🗣️",
    desc: "1 voice",
    cost: "1",
    icon: IconTokenPayWall
  },
  {
    id: 3,
    emoji: "🖼️",
    desc: "1 image",
    cost: "2",
    icon: IconTokenPayWall
  },
  {
    id: 4,
    emoji: "📹",
    desc: "1 video",
    cost: "5",
    icon: IconTokenPayWall
  },
]


const TokenCosts = () => {




	return (
							  <div className="grid grid-rows-[auto,1fr] p-[16px] gap-y-[8px] bg-[#21233A] rounded-[12px] font-bai-jamjuree">
								<div className=''>
								  <span className="font-bold text-[16px] leading-[24px]">Token Costs</span>
								</div>
								<div>
								  <div className="grid grid-cols-2 gap-x-[24px] gap-y-[8px]">
									{TOKEN_COSTS.map((i) => (
									  <div key={i.id} className="flex justify-between text-[14px] font-medium leading-1">
										<div>
										  <span className="mr-[4px]">{i.emoji}</span>
										  <span className="">{i.desc}</span>
										</div>
		
										<div className="flex flex-no-wrap">
										  <span className="mr-[4px]">{i.cost}</span>
										  <Image
											src={i.icon}
											width={i.icon.width}
											height={i.icon.height}
											alt="costs img"
										  />
										</div>
									  </div>
									))}
								  </div>
								</div>
							  </div>
	)
}

export default TokenCosts;