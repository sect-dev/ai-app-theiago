import React, {FC} from 'react';

interface ComponentProps {
  tags: string[]
}

const Tags: FC<ComponentProps> = ({tags}) => {
  const colors = ["#A9FD42", "#426EFD", "#AC42FD", "#42FDED", "#42FD74", "#FD5242"];
  return (
    <>
      {tags.map(item => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return (
          <li key={item} className="rounded-[0.94vw] animate-fadeIn bg-[#1D1F37] border border-transparent transition-border duration-300 hover:border-[#049AEF]">
            <button style={{ color: randomColor }} className="block capitalize font-semibold text-[0.94vw] px-[0.94vw] py-[0.47vw]">
              {item}
            </button>
          </li>
        )
      })}
    </>
  );
};

export default Tags;