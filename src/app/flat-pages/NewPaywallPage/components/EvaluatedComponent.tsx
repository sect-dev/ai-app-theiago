import ImageEvaluated from "@/../public/images/img/image-evaluated-us.png";
import Image from "next/image";

const EvaluatedComponent = () => {
  return (
    <div className="mb-[24px] flex flex-col items-center gap-[15px] rounded-[16px] bg-[#2B2D44] p-[20px]">
      <span className="text-[18px] font-semibold">Also evaluated us</span>
      <Image
        src={ImageEvaluated.src}
        alt="evaluated us"
        width={ImageEvaluated.width}
        height={ImageEvaluated.height}
      />
    </div>
  );
};

export default EvaluatedComponent;
