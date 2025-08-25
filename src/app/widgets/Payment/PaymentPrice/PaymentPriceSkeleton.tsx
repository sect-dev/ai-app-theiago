import React from "react";

const PaymentPriceSkeleton = () => {
	return (
		<div className="space-y-[8px]">
			<div className="h-[505px] w-[375px] shrink-0 rounded-[32px] bg-[#191B2C] p-[20px]">
				<div className="mb-[24px] space-y-[12px]">
					{Array.from({ length: 4 }).map((_, index) => {
						return (
							<div
								key={index}
								className="gradient-border relative h-[100px] w-full cursor-pointer rounded-[16px] bg-[#2B2D44] p-[16px] before:z-[1] before:rounded-[16px] before:opacity-0 hover:shadow-card-shadow hover:before:opacity-100"
							>
								<div className="flex items-center justify-between">
									<div className="space-y-[5px]">
										<p className="h-[24px] w-[100px] rounded-[12px] bg-[#191B2C]" />
										<p className="h-[16px] w-[130px] rounded-[12px] bg-[#191B2C]" />
									</div>
									<div className="flex gap-[10px]">
										<p className="h-[24px] w-[100px] rounded-[12px] bg-[#191B2C]" />
										<p className="h-[24px] w-[50px] rounded-[12px] bg-[#191B2C]" />
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default PaymentPriceSkeleton;
