import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft, Info } from "lucide-react";
import { Suspense, type Dispatch, type SetStateAction } from "react";

import { Card } from "@/components/cards/card";
import { SidePanelSkeleton } from "@/components/skeletons/side-panel-skeleton";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

import { getAirPollution } from "@/api";
import type { Coords } from "@/types";

type SidePanelProps = {
  coords: Coords;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SidePanel = (props: SidePanelProps) => {
  return (
    <div
      className={cn(
        "fixed top-0 right-0 h-screen w-90 shadow-md bg-sidebar z-1000 py-8 px-4 overflow-y-scroll transition-transform duration-300",
        props.isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <button onClick={() => props.setOpen(false)}>
        <ChevronLeft className="size-8 -ml-2" />
      </button>
      <Suspense fallback={<SidePanelSkeleton />}>
        <AirPollution {...props} />
      </Suspense>
    </div>
  );
};

const AirPollution = (props: SidePanelProps) => {
  const { data } = useSuspenseQuery({
    queryKey: ["pollution", props.coords],
    queryFn: () => getAirPollution(props.coords),
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Air pollution</h1>
      <h1 className="text-5xl font-semibold">{data.list[0].main.aqi}</h1>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">AQI</h1>
        <Tooltip>
          <TooltipTrigger>
            <Info className="size-4" />
          </TooltipTrigger>
          <TooltipContent className="z-1001">
            <p className="max-w-xs">
              Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 =
              Very Poor
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      {Object.entries(data.list[0].components).map(([key, value]) => {
        const pollutlant = airQualityRanges[key.toUpperCase() as keyof typeof airQualityRanges];
        const max = Math.max(pollutlant["Very Poor"].min, value);

        const currentLevel = (() => {
          for (const [level, range] of Object.entries(pollutlant)) {
            if (value >= range.min && (range.max === null || value <= range.max)) {
              return level;
            }
          }

          return "Very Poor";
        })();

        const levelColor = (() => {
          switch (currentLevel) {
            case "Good":
              return "bg-green-500";
            case "Fair":
              return "bg-yellow-500";
            case "Moderate":
              return "bg-orange-500";
            case "Poor":
              return "bg-red-500";
            case "Very Poor":
              return "bg-purple-500";
            default:
              return "bg-zinc-500";
          }
        })();

        return (
          <Card
            className="hover:scale-102 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!"
            childrenClassName="flex flex-col gap-3"
            key={key}
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold capitalize">{key}</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent className="z-1001">
                    <p className="max-w-xs">Concentration of {pollutantNameMapping[key.toUpperCase() as Pollutant]}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-lg font-semibold">{value}</span>
            </div>
            <Progress max={max} value={value} />
            <div className="flex justify-between text-xs">
              <p>0</p>
              <p>{max}</p>
            </div>
            <div className="flex justify-between">
              {Object.keys(pollutlant).map((level) => (
                <span
                  className={cn(
                    "px-2 py-1 rounded-md text-xs font-medium",
                    level === currentLevel ? levelColor : "bg-muted text-muted-foreground"
                  )}
                  key={level}
                >
                  {level}
                </span>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

interface Range {
  min: number;
  max: number | null;
}

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3";

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>;

const airQualityRanges: AirQualityRanges = {
  SO2: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 80 },
    Moderate: { min: 80, max: 250 },
    Poor: { min: 250, max: 350 },
    "Very Poor": { min: 350, max: null },
  },
  NO2: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
  PM10: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 50 },
    Moderate: { min: 50, max: 100 },
    Poor: { min: 100, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
  PM2_5: {
    Good: { min: 0, max: 10 },
    Fair: { min: 10, max: 25 },
    Moderate: { min: 25, max: 50 },
    Poor: { min: 50, max: 75 },
    "Very Poor": { min: 75, max: null },
  },
  O3: {
    Good: { min: 0, max: 60 },
    Fair: { min: 60, max: 100 },
    Moderate: { min: 100, max: 140 },
    Poor: { min: 140, max: 180 },
    "Very Poor": { min: 180, max: null },
  },
  CO: {
    Good: { min: 0, max: 4400 },
    Fair: { min: 4400, max: 9400 },
    Moderate: { min: 9400, max: 12400 },
    Poor: { min: 12400, max: 15400 },
    "Very Poor": { min: 15400, max: null },
  },
  NO: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 40 },
    Moderate: { min: 40, max: 60 },
    Poor: { min: 60, max: 80 },
    "Very Poor": { min: 80, max: null },
  },
  NH3: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
};

const pollutantNameMapping: Record<Pollutant, string> = {
  SO2: "Sulfur dioxide",
  NO2: "Nitrogen dioxide",
  PM10: "Particulate matter 10",
  PM2_5: "Fine particles matter",
  O3: "Ozone",
  CO: "Carbon monoxide",
  NO: "Nitrogen monoxide",
  NH3: "Ammonia",
};

export { SidePanel };
