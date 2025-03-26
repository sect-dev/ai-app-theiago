"use client"
import React, { useState } from 'react';
import clsx from "clsx";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export const CustomSelect = ({ options, value, onChange }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative w-full">
      <div
        className="bg-[#21233A] font-bai-jamjuree flex items-center  px-[14px] text-[14px] placeholder:text-[14px] h-[48px] w-full rounded-[16px] fm:text-[3.73vw] fm:placeholder:text-[3.73vw] fm:px-[3.73vw] fm:rounded-[4.27vw] fm:h-[12.80vw]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? <span>{selectedOption?.label}</span> : <span className="opacity-[50%]">Country</span>}
        <div className={clsx("absolute right-[20px] transition-all duration-300  top-[50%] translate-y-[-50%]",{
          "rotate-[180deg]": isOpen
        })}>
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity={selectedOption ? '1' : '0.5'} d="M6.02806 -9.53674e-07C6.32643 -9.53674e-07 6.61258 0.111059 6.82356 0.308747C7.03453 0.506434 7.15306 0.774556 7.15306 1.05413L7.15306 9.40283L10.1081 6.63399C10.3213 6.44778 10.6034 6.34642 10.8948 6.35123C11.1863 6.35605 11.4644 6.46668 11.6705 6.65982C11.8766 6.85295 11.9947 7.11351 11.9998 7.3866C12.005 7.65969 11.8968 7.924 11.6981 8.12382L6.82306 12.6917C6.61212 12.8891 6.32619 13 6.02806 13C5.72994 13 5.444 12.8891 5.23306 12.6917L0.358062 8.12382C0.247532 8.02732 0.158879 7.91094 0.097391 7.78164C0.0359031 7.65233 0.00284026 7.51274 0.000175083 7.37121C-0.00249009 7.22967 0.0252967 7.08908 0.0818782 6.95782C0.13846 6.82656 0.222677 6.70733 0.329505 6.60723C0.436333 6.50713 0.563584 6.42822 0.703666 6.3752C0.843748 6.32218 0.993792 6.29615 1.14485 6.29865C1.2959 6.30114 1.44487 6.33212 1.58287 6.38974C1.72087 6.44735 1.84507 6.53042 1.94806 6.63399L4.90306 9.40283L4.90306 1.05413C4.90306 0.472249 5.40706 -9.53674e-07 6.02806 -9.53674e-07Z" fill="white"/>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-full bg-[#21233A] space-y-[12px] rounded-[16px] p-[12px] z-[20] fm:p-[3.20vw] fm:rounded-[4.27vw] fm:space-y-[3.20vw]">
          {options.map(option => (
            <div
              key={option.value}
              className="text-[14px] cursor-pointer transition-all duration-300 hover:text-[#8F5AFF] fm:text-[3.73vw]"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
