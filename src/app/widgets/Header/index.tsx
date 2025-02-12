'use client'
import React, {useState} from 'react';
import Link from "next/link";
import clsx from "clsx";

const Header = () => {
  const [menuModal,setMenuModal] = useState(false)
  return (
    <div className="fixed top-0 left-0 z-50 w-full py-[0.63vw] sm:py-[3.20vw] sm:static">
      <div className="container ">
        <div className="flex justify-between items-center font-bai-jamjuree">
          <div className="flex items-center gap-[3.20vw]">
            <button
              onClick={() => setMenuModal(!menuModal)}
              className="flex-col h-[3.20vw] w-[4.80vw] gap-[1.011vw] hidden sm:flex"
            >
              <span
                className={clsx('block h-[2px] w-full rounded-[5px] bg-white transition-transform duration-300', {
                  'origin-[0.156vw] rotate-[45deg] sm:origin-[0.356vw]': menuModal,
                })}
              />
              <span
                className={clsx('block h-[2px] w-full rounded-[5px] bg-white transition-opacity duration-300', {
                  'opacity-0': menuModal,
                })}
              />
              <span
                className={clsx('block h-[2px] w-full rounded-[5px] bg-white transition-transform duration-300', {
                  'origin-[0.365vw] rotate-[-45deg] sm:origin-[0.565vw]': menuModal,
                })}
              />
            </button>
            <Link href="/" className="font-bold block text-[1.56vw] tracking-[0.04em] sm:text-[5.33vw] ">
              <span className="logo-gradient ">Ai</span>
              <span className="">Go</span>
            </Link>
          </div>
          <button className="bg-main-gradient px-[0.94vw] h-[1.88vw] font-bold text-[0.94vw] rounded-[0.63vw] sm:px-[3.20vw] sm:h-[7.20vw] sm:rounded-[2.13vw] sm:text-[3.73vw]">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;