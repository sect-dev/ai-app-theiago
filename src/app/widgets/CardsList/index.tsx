'use client'
import React, {FC} from 'react';
import Card from "@/app/widgets/Card";
import {Character} from "@/app/shared/api/types";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import TagsSkeleton from "@/app/widgets/Tags/TagsSkeleton";
import Tags from "@/app/widgets/Tags";

interface ComponentProps {
  avatars: Character[]
  tags: string[]
}

const CardsList:FC<ComponentProps> = ({avatars,tags}) => {
  const { selectedTag } = useSelectedCardStore();

  const filteredAvatars = selectedTag
    ? avatars.filter(avatar => avatar.tags.includes(selectedTag))
    : avatars;

  return (
    <>
      <p className="text-[20px] font-semibold tracking-[0.02vw] mb-[12px] sm:hidden">Explore hottest AI Characters</p>
      <div className="flex gap-[4px] mb-[16px] sm:overflow-hidden">
        {(!tags || tags.length === 0)
          ? <TagsSkeleton />
          : <Tags tags={tags} />
        }
      </div>
      <div className="gap-[16px] cards-list sm:gap-[8px]">
        {filteredAvatars.map(avatar => <Card key={avatar.id} avatar={avatar} />)}
      </div>
    </>
  );
};

export default CardsList;