import React, {FC} from 'react';

interface ComponentProps {
  content: string[] | null
}

const ChatsInfoVideos:FC<ComponentProps> = ({content}) => {

  if(!content || content.length === 0) {
    return (
      <div className="animate-fadeIn flex flex-wrap gap-[8px] px-[12px] pt-[20px]">
        <p className="text-[14px] opacity-60">No videos yet</p>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn flex gap-[8px]">
      {content.map(video => {
        return (
          <div key={video} className="relative animate-fadeIn duration-150 overflow-hidden rounded-[12px] w-[48%] h-[157px]">
            <video
              src={video}
              className="absolute left-0 top-0 size-full overflow-hidden rounded-[12px] object-cover object-top"
            />
          </div>
        )
      })}
    </div>
  );
};

export default ChatsInfoVideos;