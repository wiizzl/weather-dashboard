import { Card } from "@/components/cards/card";
import { Skeleton } from "@/components/ui/skeleton";

const CurrentSkeleton = () => {
  return (
    <Card title="Current Weather" childrenClassName="flex flex-col items-center gap-6">
      <div className="flex flex-col gap-2 items-center">
        <Skeleton className="w-25 h-16" />
        <Skeleton className="size-14 rounded-full" />
        <Skeleton className="w-36 h-7" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl text-center">Local Time:</p>
        <Skeleton className="w-36 h-10" />
      </div>
      <div className="flex justify-between w-full">
        {subFields.map((field) => (
          <div className="flex flex-col items-center gap-2" key={field}>
            <p className="text-muted-foreground">{field}</p>
            <Skeleton className="w-16 h-4" />
          </div>
        ))}
      </div>
    </Card>
  );
};

const subFields = ["Feels Like", "Humidity", "Wind"];

export { CurrentSkeleton };
