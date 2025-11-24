import { SideCardSkeleton } from "@/components/skeletons/side-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const SidePanelSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Air pollution</h1>
      <Skeleton className="size-12" />
      <h1 className="text-2xl font-semibold">AQI</h1>
      {Array.from({ length: 8 }).map((_, index) => (
        <SideCardSkeleton key={index} />
      ))}
    </div>
  );
};

export { SidePanelSkeleton };
