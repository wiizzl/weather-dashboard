import { Card } from "@/components/cards/card";
import { Skeleton } from "@/components/ui/skeleton";

const AdditionalInfoSkeleton = () => {
  return (
    <Card title="Additional Weather Info" childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="flex justify-between" key={index}>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="w-20 h-8" />
          </div>
          <Skeleton className="size-8" />
        </div>
      ))}
    </Card>
  );
};

export { AdditionalInfoSkeleton };
