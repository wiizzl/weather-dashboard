import { useSuspenseQuery } from "@tanstack/react-query";

import { WeatherIcon } from "../weather-icon";
import { Card } from "./card";

import { getWeather } from "../../api";

import type { Coords } from "../../types";

type HourlyForecastCardProps = {
  coords: Coords;
};

const HourlyForecastCard = (props: HourlyForecastCardProps) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", props.coords],
    queryFn: () => getWeather(props.coords),
  });

  return (
    <Card title="Hourly Forecast (48 Hours)" childrenClassName="flex gap-6 overflow-x-scroll">
      {data?.hourly.map((hour, index) => {
        const weather = hour.weather[0]; // TODO: handle multiple weather conditions

        return (
          <div className="flex flex-col gap-2 items-center p-2" key={index}>
            <p className="whitespace-nowrap">
              {new Intl.DateTimeFormat(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }).format(new Date(hour.dt * 1000))}
            </p>
            <WeatherIcon label={weather.main} src={weather.icon} />
            <p>{Math.round(hour.temp)}°C</p>
          </div>
        );
      })}
    </Card>
  );
};

export { HourlyForecastCard };
