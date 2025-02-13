'use client'
import React, {FC} from 'react';
import CardSkeleton from "@/app/widgets/Card/CardSkeleton";
import Card from "@/app/widgets/Card";
import {IAvatar} from "@/app/shared/api/types";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import TagsSkeleton from "@/app/widgets/Tags/TagsSkeleton";
import Tags from "@/app/widgets/Tags";

interface ComponentProps {
  avatars: IAvatar[]
  tags: string[]
}

const CardsList:FC<ComponentProps> = ({avatars,tags}) => {
  const { selectedTag } = useSelectedCardStore();

  const filteredAvatars = selectedTag
    ? avatars.filter((avatar,tags) => avatar.tags.includes(selectedTag))
    : avatars;

  return (
    <>
      <p className="text-[1.56vw] font-semibold tracking-[0.02vw] mb-[0.94vw] sm:hidden">Explore hottest AI Characters</p>
      <div className="flex gap-[0.31vw] mb-[1.36vw] sm:mb-[4.27vw] sm:gap-[1.07vw] sm:overflow-hidden">
        {(!tags || tags.length === 0)
          ? <TagsSkeleton />
          : <Tags tags={tags} />
        }
      </div>
      <div className="flex flex-wrap gap-[1.25vw] sm:gap-[2.13vw]">
        {(!avatars || avatars.length === 0)
          ? <CardSkeleton />
          : filteredAvatars.map(avatar => <Card key={avatar.id} avatar={avatar} />)
        }
      </div>
    </>
  );
};

export default CardsList;