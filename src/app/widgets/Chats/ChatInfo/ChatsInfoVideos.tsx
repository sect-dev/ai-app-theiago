import React, {FC} from 'react';

interface ComponentProps {
  content: string[]
}

const ChatsInfoVideos:FC<ComponentProps> = ({content}) => {

  return (
    <div className="animate-fadeIn">
      {content.map(video => {
        return (
          <div key={video} className="relative animate-fadeIn duration-150 overflow-hidden rounded-[12px] w-[134px] h-[157px]">
            <video
              src={video}
              className="size-full"
            />
          </div>
        )
      })}
    </div>
  );
};

export default ChatsInfoVideos;