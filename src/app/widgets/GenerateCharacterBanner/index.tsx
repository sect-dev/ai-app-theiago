const GenerateCharacterBanner = () => {
	return (
		<div className="mx-[16px] mb-[18px] mt-[9px] rounded-[32px]">
			<div className="flex h-[225px] w-full justify-between rounded-[32px] bg-[#A1003D] p-[40px] sm:h-[175px]">
				<div className="z-[1] flex flex-col">
					<span className="text-[32px] font-bold leading-[120%]">
						Create Your Own AI Girlfriend
					</span>
					<span className="mb-[24px]">Make Your Own AI Partner</span>

					<div className="flex max-w-[178px] items-center justify-center rounded-[24px] bg-[#FFFFFF] px-[32px] py-[15px]">
						<span className="text-[20px] font-bold text-[#BD006B]">
							Try For Free
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GenerateCharacterBanner;
