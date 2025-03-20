import React from 'react';

const SuggestionAnswerSkeleton = () => {
  return (
    <div className="animate-fadeIn  bg-[#1F2237] p-[8px] rounded-[12px] w-[365px] mb-[8px] md:w-full">
      <p className="w-[90%] h-[34px] bg-[#121423] rounded-[20px] mb-[4px]" />
      <p className="w-1/2 h-[19px] rounded-[20px] bg-[#121423]" />
    </div>
  );
};

export default SuggestionAnswerSkeleton;