import React from 'react';
import Link from "next/link";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full py-[0.63vw]">
      <div className="container ">
        <div className="flex justify-between items-center font-bai-jamjuree">
          <Link href="/" className="font-bold block text-[1.56vw] tracking-[0.04em]">
            <span className="logo-gradient ">Ai</span>
            <span className="">Go</span>
          </Link>
          <button className="bg-main-gradient px-[0.94vw] h-[1.88vw] font-bold text-[0.94vw] rounded-[0.63vw]">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;