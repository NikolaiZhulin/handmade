import { Skeleton } from '../ui/skeleton';

const MainPagePostSkeleton = () => {
  return (
    <div className="flex gap-[22px] rounded-[6px] items-center">
      <Skeleton className="w-[160px] h-[126px] rounded-[6px] shrink-0" />
      <div className="w-full flex flex-col gap-[6px]">
        <Skeleton className="h-[18px] w-1/2 rounded-[30px]" />
        <Skeleton className="h-[18px] w-1/2 rounded-[30px]" />
        <Skeleton className="h-[18px] w-1/2 rounded-[30px]" />
      </div>
    </div>
  );
};

export default MainPagePostSkeleton;
