import React from 'react';
import FavoritesGirls from "@/app/widgets/FavoritesGirls";
import Card from "@/app/widgets/Card";

const HomePage = () => {
  return (
    <div className="animate-fadeIn">
      <div className="container">
        <div className="space-y-[0.63vw]">
          <FavoritesGirls />
          <div className="bg-[#121423] p-[1.88vw] rounded-[1.88vw]">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;