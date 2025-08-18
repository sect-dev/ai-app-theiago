import React, { FC } from "react";

interface ComponentProps {
	content: string[] | null;
}

const ChatsInfoVideos: FC<ComponentProps> = ({ content }) => {
	if (!content || content.length === 0) {
		return (
			<div className="flex animate-fadeIn flex-wrap gap-[8px] px-[12px] pt-[20px]">
				<p className="text-[14px] opacity-60">No videos yet</p>
			</div>
		);
	}

	return (
		<div className="flex animate-fadeIn flex-wrap gap-[8px]">
			{content.map((video) => {
				return (
					<div
						key={video}
						className="relative h-[157px] w-[48%] animate-fadeIn overflow-hidden rounded-[12px] duration-150"
					>
						<video
							src={video}
							className="absolute left-0 top-0 size-full overflow-hidden rounded-[12px] object-cover object-top"
						/>
					</div>
				);
			})}
		</div>
	);
};

export default ChatsInfoVideos;
