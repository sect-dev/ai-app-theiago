import { forwardRef } from "react";
interface Props {
	fullUrl: string;
}

const TokensPayForm = forwardRef<HTMLDivElement, Props>(
	function TokensPayForm(props, ref) {
		const { fullUrl } = props;

		return (
			<div
				ref={ref}
				className="relative h-[1040px] w-full overflow-hidden rounded-[20px] bg-white"
			>
				<iframe
					loading="eager"
					width="100%"
					height="100%"
					src={fullUrl}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
					className="animate-fadeIn"
				/>
			</div>
		);
	}
);

export default TokensPayForm;
