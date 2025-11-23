import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUp, CircleGauge, Cloud, Sparkle, Sunrise, Sunset, Wind } from "lucide-react";

import { Card } from "@/components/cards/card";

import { getWeather } from "@/api";
import type { Coords } from "@/types";

const rows = [
  { label: "Cloudiness", value: "clouds", icon: Cloud },
  { label: "UV Index", value: "uvi", icon: Sparkle },
  { label: "Wind Direction", value: "wind_deg", icon: Wind },
  { label: "Pressure", value: "pressure", icon: CircleGauge },
  { label: "Sunrise", value: "sunrise", icon: Sunrise },
  { label: "Sunset", value: "sunset", icon: Sunset },
] as const;

const formatRows = (value: string, number?: number) => {
  if (!number) return "N/A";

  switch (value) {
    case "sunrise":
    case "sunset":
      return new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", hour12: true }).format(
        new Date(number * 1000)
      );

    case "clouds":
      return `${number}%`;

    case "pressure":
      return `${number} hPa`;

    case "wind_deg":
      return <ArrowUp className="stroke-[1.5]" style={{ transform: `rotate(${number}deg)` }} />;

    default:
      return number;
  }
};

type AdditionalInfoCardProps = {
  coords: Coords;
};

const AdditionalInfoCard = (props: AdditionalInfoCardProps) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", props.coords],
    queryFn: () => getWeather(props.coords),
  });

  return (
    <Card title="Additional Weather Info" childrenClassName="flex flex-col gap-8">
      {rows.map((row) => (
        <div className="flex justify-between" key={row.label}>
          <div className="flex items-center gap-2 text-muted-foreground">
            <row.icon className="size-5" />
            <span>{row.label}</span>
          </div>
          <span>{formatRows(row.value, data.current[row.value])}</span>
        </div>
      ))}
    </Card>
  );
};

export { AdditionalInfoCard };
