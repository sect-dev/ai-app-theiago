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
        className="relative w-full h-[1040px] bg-white rounded-[20px] overflow-hidden"
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
  },
);

export default TokensPayForm;
