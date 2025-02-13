import React, {FC} from 'react';
import FavoritesGirls from "@/app/widgets/FavoritesGirls";
import {IAvatar} from "@/app/shared/api/types";
import CardsList from "@/app/widgets/CardsList";

interface ComponentProps {
  avatars: IAvatar[]
}

const HomePage:FC<ComponentProps> = ({avatars}) => {
  const favoriteAvatars = avatars.filter(item => item.top_horizontal_list_position).sort((a,b) => a.top_horizontal_list_position - b.top_horizontal_list_position)
  const simpleAvatars = avatars.filter(item => !item.isPremium)
  const tags: string[] = Array.from(new Set(simpleAvatars.flatMap(avatar => avatar.tags ?? [])));

  return (
    <div className="animate-fadeIn">
      <div className="container !px-0">
        <div className="space-y-[0.63vw] sm:space-y-0">
          <FavoritesGirls avatars={favoriteAvatars} />
          <div className="bg-[#121423] p-[1.88vw] rounded-l-[1.88vw] sm:p-[4.27vw] sm:pt-0">
            <CardsList tags={tags} avatars={simpleAvatars} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;