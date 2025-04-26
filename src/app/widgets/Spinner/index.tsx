import React, { FC } from "react";
import clsx from "clsx";

interface ComponentProps {
  className?: string;
}

const Spinner: FC<ComponentProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        "w-4 h-4 border-2 border-gray-200 border-t-[#007AFF] rounded-full animate-spin",
        className,
      )}
    />
  );
};

export default Spinner;
