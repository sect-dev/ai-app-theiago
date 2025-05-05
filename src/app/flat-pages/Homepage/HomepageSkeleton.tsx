import FavoritesGirlsSkeleton from "@/app/widgets/FavoritesGirls/FavoritesGirlsSkeleton";
import CardSkeleton from "@/app/widgets/Card/CardSkeleton";
import TagsSkeleton from "@/app/widgets/Tags/TagsSkeleton";

const HomePageSkeleton = () => (
  <div className="h-[calc(100vh-60px)] animate-fadeIn overflow-y-auto">
    <div className="container !px-0">
      <div className="space-y-[8px] sm:space-y-0">
        <div className="overflow-hidden rounded-l-[24px] bg-[#121423] p-[24px] md:rounded-none md:p-[16px]">
          <p className="mb-[16px] text-[20px] font-semibold tracking-[0.02vw] sm:hidden">
            They crave to chat with you!
          </p>
          <div className="flex gap-[12px]">
            {Array.from({ length: 6 }).map((_, index) => (
              <FavoritesGirlsSkeleton key={index} />
            ))}
          </div>
        </div>
        <div className="rounded-l-[24px] bg-[#121423] p-[24px] md:rounded-none md:p-[16px] sm:pt-0">
          <p className="mb-[12px] text-[20px] font-semibold tracking-[0.02vw] sm:hidden">
            Explore hottest AI Characters
          </p>
          <div className="mb-[16px] flex gap-[4px] sm:overflow-hidden">
            {Array.from({ length: 6 }).map((_, index) => (
              <TagsSkeleton key={index} seed={index} />
            ))}
          </div>
          <div className="cards-list gap-[16px] sm:gap-[8px]">
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
