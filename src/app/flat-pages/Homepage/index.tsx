import React, {FC} from 'react';
import FavoritesGirls from "@/app/widgets/FavoritesGirls";
import {IAvatar} from "@/app/shared/api/types";
import CardsList from "@/app/widgets/CardsList";

interface ComponentProps {
  avatars: IAvatar[]
}

const HomePage:FC<ComponentProps> = ({avatars}) => {
  const charactersListData = Object.values(avatars)
  const favoriteAvatars = charactersListData.filter(item => !item.isPremium)
  const simpleAvatars = charactersListData.filter(item => !item.isPremium)
  const tags:string[] = [...new Set(simpleAvatars.flatMap(avatar => avatar.tags ?? [])) as string];

  return (
    <div className="animate-fadeIn">
      <div className="container !px-0">
        <div className="space-y-[0.63vw] sm:space-y-[4.27vw]">
          <FavoritesGirls tags={tags} avatars={favoriteAvatars} />
          <div className="bg-[#121423] p-[1.88vw] rounded-l-[1.88vw] sm:p-[4.27vw]">
            <CardsList avatars={simpleAvatars} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;