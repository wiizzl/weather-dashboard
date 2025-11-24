import { Card } from "@/components/cards/card";
import { Skeleton } from "@/components/ui/skeleton";

const DailySkeleton = () => {
  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4 2xl:justify-between">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="flex justify-between" key={index}>
          <Skeleton className="w-9 h-8" />
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8" />
          <Skeleton className="size-8" />
          <Skeleton className="size-8" />
        </div>
      ))}
    </Card>
  );
};

export { DailySkeleton };
