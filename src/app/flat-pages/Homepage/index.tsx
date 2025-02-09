import React, {FC} from 'react';
import FavoritesGirls from "@/app/widgets/FavoritesGirls";
import Card from "@/app/widgets/Card";
import {IAvatar} from "@/app/shared/api/types";

interface ComponentProps {
  avatars: IAvatar[]
}

const HomePage:FC<ComponentProps> = ({avatars}) => {
  const charactersListData = Object.values(avatars)
  const favoriteAvatars = charactersListData.filter(item => item.isPremium)
  const tags = [...new Set(charactersListData.flatMap(avatar => avatar.tags))];
  return (
    <div className="animate-fadeIn">
      <div className="container">
        <div className="space-y-[0.63vw]">
          <FavoritesGirls tags={tags} avatars={favoriteAvatars} />
          <div className="bg-[#121423] p-[1.88vw] rounded-[1.88vw]">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;