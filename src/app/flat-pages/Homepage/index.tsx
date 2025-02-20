import React, {FC} from 'react';
import FavoritesGirls from "@/app/widgets/FavoritesGirls";
import {IAvatar} from "@/app/shared/api/types";
import CardsList from "@/app/widgets/CardsList";

interface ComponentProps {
  avatars: IAvatar[]
}

const HomePage:FC<ComponentProps> = ({avatars}) => {
  const favoriteAvatars = avatars.filter(item => item.top_horizontal_list_position).sort((a,b) => a.top_horizontal_list_position - b.top_horizontal_list_position)
  /**
   * После того как вернут теги на все карточки - убрать фильтр
   */
  const simpleAvatars = avatars.filter(item => item.tags).filter(item => !item.top_horizontal_list_position)
  const tags: string[] = Array.from(new Set(simpleAvatars.flatMap(avatar => avatar.tags ?? [])));

  return (
    <div className="animate-fadeIn">
      <div className="container !px-0">
        <div className="space-y-[8px] sm:space-y-0">
          <FavoritesGirls avatars={favoriteAvatars} />
          <div className="bg-[#121423] p-[24px] rounded-l-[24px] md:p-[16px] sm:pt-0 md:rounded-none">
            <CardsList tags={tags} avatars={simpleAvatars} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;