import React, {FC} from 'react';
import FavoritesGirls from "@/app/widgets/FavoritesGirls";
import Card from "@/app/widgets/Card";
import {IAvatar} from "@/app/shared/api/types";
import CardSkeleton from "@/app/widgets/Card/CardSkeleton";

interface ComponentProps {
  avatars: IAvatar[]
}

const HomePage:FC<ComponentProps> = ({avatars}) => {
  const charactersListData = Object.values(avatars)
  const favoriteAvatars = charactersListData.filter(item => item.isPremium)
  const simpleAvatars = charactersListData.filter(item => !item.isPremium)
  const tags = [...new Set(charactersListData.flatMap(avatar => avatar.tags))];

  return (
    <div className="animate-fadeIn">
      <div className="container !px-0">
        <div className="space-y-[0.63vw]">
          <FavoritesGirls tags={tags} avatars={favoriteAvatars} />
          <div className="bg-[#121423] p-[1.88vw] rounded-l-[1.88vw] ">
            <div className="flex flex-wrap gap-[1.25vw]">
              {(!simpleAvatars || simpleAvatars.length === 0)
                ? <CardSkeleton />
                : simpleAvatars.map(avatar => <Card avatar={avatar} />)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;