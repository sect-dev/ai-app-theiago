import React from "react";

const SuggestionAnswerSkeleton = () => {
  return (
    <div className="mb-[8px] w-[365px] animate-fadeIn rounded-[12px] bg-[#1F2237] p-[8px] md:w-full">
      <p className="mb-[4px] h-[34px] w-[90%] rounded-[20px] bg-[#121423]" />
      <p className="h-[19px] w-1/2 rounded-[20px] bg-[#121423]" />
    </div>
  );
};

export default SuggestionAnswerSkeleton;
