import React from 'react';

const PaymentPriceSkeleton = () => {
  return (
    <div className="space-y-[8px]">
      <div className="bg-[#191B2C] h-[505px] shrink-0 w-[375px] p-[20px] rounded-[32px]">
        <div className="space-y-[12px] mb-[24px]">
          {Array.from({length:4}).map((_,index) => {
            return (
              <div
                key={index}
                className="gradient-border w-full h-[100px] relative before:z-[1] before:rounded-[16px] before:opacity-0 hover:before:opacity-100 cursor-pointer bg-[#2B2D44] rounded-[16px] p-[16px] hover:shadow-card-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-[5px]">
                    <p className="bg-[#191B2C] w-[100px] h-[24px] rounded-[12px]" />
                    <p className="bg-[#191B2C] w-[130px] h-[16px] rounded-[12px]" />
                  </div>
                  <div className="flex gap-[10px]">
                    <p className="bg-[#191B2C] w-[100px] h-[24px] rounded-[12px]" />
                    <p className="bg-[#191B2C] w-[50px] h-[24px] rounded-[12px]" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default PaymentPriceSkeleton;