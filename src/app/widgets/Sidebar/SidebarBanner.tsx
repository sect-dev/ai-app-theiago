import React from 'react';

const SidebarBanner = () => {
  return (
    <div className="rounded-[1.25vw] p-[0.94vw] bg-main-gradient">
      <div className="mb-[0.78vw]">
        <span className="text-[1.09vw] font-medium opacity-[60%]">Try now</span>
        <p className="text-[1.56vw] font-semibold tracking-[-0.005vw]">With no limits</p>
      </div>
      <ul className="text-[1.09vw] mb-[1.25vw]">
        <li className="flex gap-[0.47vw]">
          <span>🔥</span> Unlimited photos
        </li>
        <li className="flex gap-[0.47vw]">
          <span>💕</span> Creating bots
        </li>
        <li className="flex gap-[0.47vw]">
          <span>⭐</span> No ads
        </li>
      </ul>
      <button className="text-blue text-[1.09vw] h-[2.19vw] font-semibold bg-white rounded-[1.25vw] w-full ">
        See more
      </button>
    </div>
  );
};

export default SidebarBanner;