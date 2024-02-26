import { Skeleton } from '../ui/skeleton';

const MainPagePostSkeleton = () => {
  return (
    <div className="flex gap-[22px] items-center">
      <Skeleton className="w-full h-[315px]" />
    </div>
  );
};

export default MainPagePostSkeleton;
