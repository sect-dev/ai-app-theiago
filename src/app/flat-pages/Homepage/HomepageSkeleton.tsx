import FavoritesGirlsSkeleton from "@/app/widgets/FavoritesGirls/FavoritesGirlsSkeleton";
import CardSkeleton from "@/app/widgets/Card/CardSkeleton";
import TagsSkeleton from "@/app/widgets/Tags/TagsSkeleton";

const HomePageSkeleton = () => (
  <div className="animate-fadeIn overflow-y-auto h-[calc(100vh-60px)]">
    <div className="container !px-0">
      <div className="space-y-[8px] sm:space-y-0">
        <div className="bg-[#121423] p-[24px] rounded-l-[24px] overflow-hidden md:p-[16px] md:rounded-none">
          <p className="text-[20px] font-semibold tracking-[0.02vw] mb-[16px] sm:hidden">
            They crave to chat with you!
          </p>
          <div className="flex gap-[12px]">
            {Array.from({ length: 6 }).map((_, index) => (
              <FavoritesGirlsSkeleton key={index} />
            ))}
          </div>
        </div>
        <div className="bg-[#121423] p-[24px] rounded-l-[24px] md:p-[16px] sm:pt-0 md:rounded-none">
          <p className="text-[20px] font-semibold tracking-[0.02vw] mb-[12px] sm:hidden">
            Explore hottest AI Characters
          </p>
          <div className="flex gap-[4px] mb-[16px] sm:overflow-hidden">
            {Array.from({ length: 6 }).map((_, index) => (
              <TagsSkeleton key={index} seed={index} />
            ))}
          </div>
          <div className="gap-[16px] cards-list sm:gap-[8px]">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePageSkeleton;
