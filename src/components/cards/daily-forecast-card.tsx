import { useSuspenseQuery } from "@tanstack/react-query";

import { Card } from "@/components/cards/card";
import { WeatherIcon } from "@/components/weather-icon";

import { getWeather } from "@/api";
import type { Coords } from "@/types";

type DailyForecastCardProps = {
  coords: Coords;
};

const DailyForecastCard = (props: DailyForecastCardProps) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", props.coords],
    queryFn: () => getWeather(props.coords),
  });

  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
      {data?.daily.map((day, index) => {
        const weather = day.weather[0]; // TODO: handle multiple weather conditions

        return (
          <div className="flex justify-between" key={index}>
            <p className="w-9">
              {new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(new Date(day.dt * 1000))}.
            </p>
            <WeatherIcon label={weather.main} src={weather.icon} />
            <p>{Math.round(day.temp.day)}°C</p>
            <p className="text-muted-foreground/75">{Math.round(day.temp.min)}°C</p>
            <p className="text-muted-foreground/75">{Math.round(day.temp.max)}°C</p>
          </div>
        );
      })}
    </Card>
  );
};

export { DailyForecastCard };
