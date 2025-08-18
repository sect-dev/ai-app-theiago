const TagsSkeleton = ({ seed }: { seed: number }) => {
	const width = 50 + (seed % 25); // 50-75px
	const mobileWidth = 60 + (seed % 20); // 60-80px

	return (
		<>
			<div
				style={{ width: `${width}px` }}
				className="block h-[30px] animate-pulse rounded-[12px] bg-[#1D1F37] sm:hidden"
			/>
			<div
				style={{ width: `${mobileWidth}px` }}
				className="hidden h-[7.47vw] shrink-0 animate-pulse rounded-[2.94vw] bg-[#1D1F37] sm:block"
			/>
		</>
	);
};

export default TagsSkeleton;
