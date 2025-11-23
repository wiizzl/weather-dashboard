import { Card } from "@/components/cards/card";
import { Skeleton } from "@/components/ui/skeleton";

const HourlySkeleton = () => {
  return (
    <Card title="Hourly Forecast (48 Hours)" childrenClassName="flex gap-6 overflow-x-scroll">
      {Array.from({ length: 48 }).map((_, index) => (
        <div className="flex flex-col gap-2 items-center p-2" key={index}>
          <Skeleton className="w-18 h-6" />
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="w-8 h-6" />
        </div>
      ))}
    </Card>
  );
};

export { HourlySkeleton };
