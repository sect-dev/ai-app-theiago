import React from 'react';
import FavoritesGirlsCard from "@/app/widgets/FavoritesGirls/FavoritesGirlsCard";

const FavoritesGirls = () => {
  return (
    <div className="bg-[#121423] p-[1.88vw] rounded-[1.88vw]">
      <p className="text-[1.56vw] font-semibold tracking-[0.02vw] mb-[0.94vw]">Explore hottest AI Characters</p>
      <ul className="flex gap-[0.31vw] mb-[1.56vw]">
        <li className="rounded-[0.94vw] bg-[#1D1F37] text-[0.94vw] px-[0.94vw] py-[0.47vw] font-semibold">
          <button>
            Model
          </button>
        </li>
        <li className="rounded-[0.94vw] bg-[#1D1F37] text-[0.94vw] px-[0.94vw] py-[0.47vw] font-semibold">
          <button>
            Femdom
          </button>
        </li>
      </ul>
      <div>
        <FavoritesGirlsCard />
      </div>
    </div>
  );
};

export default FavoritesGirls;