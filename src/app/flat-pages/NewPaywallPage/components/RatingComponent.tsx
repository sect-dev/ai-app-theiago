import IconStar from "@/../public/images/icons/icon-rating-start.svg";
import IconStarBlue from "@/../public/images/icons/icons-rating-star-blue.svg";
import IconLeavesRight from "@/../public/images/img/image-leaves-purple-right.png";
import IconLeavesLeft from "@/../public/images/img/image-leaves-purple-left.png";
import IconLeavesRightBlue from "@/../public/images/img/image-leaves-blue-right.png";
import IconLeavesLeftBlue from "@/../public/images/img/image-leaves-blue-left.png";
import Image from "next/image";
import clsx from "clsx";

interface Props {
  isOrganic?: boolean;
}

const RatingComponent = (props: Props) => {
  const { isOrganic } = props;
  return (
    <div className="mb-[20px]">
      <div className="relative mb-[20px] flex flex-col items-center font-bold">
        <span className="text-[16px]">Loved by</span>
        <span
          className={clsx(
            "bg-clip-text text-[34px] text-transparent",
            isOrganic ? "bg-blue-text-gradient" : "bg-purple-text-gradient",
          )}
        >
          2 MILLION
        </span>
        <span className="text-[16px]">Users</span>

        <Image
          className="absolute left-3/4 top-1/2 -translate-y-1/2"
          src={isOrganic ? IconLeavesRightBlue.src : IconLeavesRight.src}
          alt="icon leaves"
          width={IconLeavesRight.width}
          height={IconLeavesRight.height}
        />
        <Image
          className="absolute right-3/4 top-1/2 -translate-y-1/2"
          src={isOrganic ? IconLeavesLeftBlue.src : IconLeavesLeft.src}
          alt="icon leaves"
          width={IconLeavesLeft.width}
          height={IconLeavesLeft.height}
        />
      </div>
      <div className="flex items-center justify-center text-[20px] font-semibold">
        <span>Thousands of</span>
        <div className="flex gap-[2px] px-[5px]">
          <span
            className={clsx(
              "bg-clip-text text-transparent",
              isOrganic ? "bg-blue-text-gradient" : "bg-purple-text-gradient",
            )}
          >
            5
          </span>
          <Image
            src={isOrganic ? IconStarBlue.src : IconStar.src}
            alt="icon star"
            width={IconStar.width}
            height={IconStar.height}
          />
        </div>
        <span>ratings</span>
      </div>
    </div>
  );
};

export default RatingComponent;
