'use client'
import React, {useState} from 'react';
import Link from "next/link";
import clsx from "clsx";

const Header = () => {
  const [menuModal,setMenuModal] = useState(false)
  return (
    <div className="fixed top-0 left-0 z-50 w-full py-[6px] sm:py-[14px] sm:static">
      <div className="container ">
        <div className="flex justify-between items-center font-bai-jamjuree">
          <div className="flex items-center gap-[14px]">
            <button
              onClick={() => setMenuModal(!menuModal)}
              className="flex-col h-[12px] w-[18px] gap-[4px] hidden md:flex"
            >
              <span
                className={clsx('block h-[2px] w-full rounded-[5px] bg-white transition-transform duration-300', {
                  'origin-[2px] rotate-[45deg] sm:origin-[0.356vw]': menuModal,
                })}
              />
              <span
                className={clsx('block h-[2px] w-full rounded-[5px] bg-white transition-opacity duration-300', {
                  'opacity-0': menuModal,
                })}
              />
              <span
                className={clsx('block h-[2px] w-full rounded-[5px] bg-white transition-transform duration-300', {
                  'origin-[1px] rotate-[-45deg] sm:origin-[0.565vw]': menuModal,
                })}
              />
            </button>
            <Link href="/" className="font-bold block text-[20px] tracking-[0.04em] sm:text-[5.33vw] ">
              <span className="logo-gradient ">Ai</span>
              <span className="">Go</span>
            </Link>
          </div>
          <button className="bg-main-gradient px-[12px] h-[24px] font-bold text-[12px] rounded-[8px] md:px-[12px] md:h-[27px] md:text-[14px]">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;