'use client'
import React, {FC} from 'react';
import CardSkeleton from "@/app/widgets/Card/CardSkeleton";
import Card from "@/app/widgets/Card";
import {IAvatar} from "@/app/shared/api/types";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";

interface ComponentProps {
  avatars: IAvatar[]
}

const CardsList:FC<ComponentProps> = ({avatars}) => {
  const { selectedTag } = useSelectedCardStore();

  const filteredAvatars = selectedTag
    ? avatars.filter((avatar) => avatar.tags.includes(selectedTag))
    : avatars;

  return (
    <div className="flex flex-wrap gap-[1.25vw] sm:gap-[2.13vw]">
      {(!avatars || avatars.length === 0)
        ? <CardSkeleton />
        : filteredAvatars.map(avatar => <Card key={avatar.id} avatar={avatar} />)
      }
    </div>
  );
};

export default CardsList;