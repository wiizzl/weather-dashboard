import { useSuspenseQuery } from "@tanstack/react-query";

import { Card } from "@/components/cards/card";
import { WeatherIcon } from "@/components/weather-icon";

import { getWeather } from "@/api";
import type { Coords } from "@/types";

type CurrentWeatherCardProps = {
  coords: Coords;
};

const CurrentWeatherCard = (props: CurrentWeatherCardProps) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", props.coords],
    queryFn: () => getWeather(props.coords),
  });

  const currentWeather = data.current.weather[0]; // TODO: handle multiple weather conditions

  const subFields = [
    { label: "Feels Like", value: `${Math.round(data.current.feels_like)}°C` },
    { label: "Humidity", value: `${data.current.humidity}%` },
    { label: "Wind", value: `${data.current.wind_speed} km/h` },
  ];

  return (
    <Card title="Current Weather" childrenClassName="flex flex-col items-center gap-6">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-6xl font-semibold text-center">{Math.round(data.current.temp)}°C</h2>
        <WeatherIcon label={currentWeather.main} src={currentWeather.icon} className="size-14" />
        <h3 className="capitalize text-xl">{currentWeather.description}</h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl text-center">Local Time:</p>
        <h3 className="text-4xl font-semibold">
          {new Intl.DateTimeFormat(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: data.timezone,
          }).format(new Date(data.current.dt * 1000))}
        </h3>
      </div>
      <div className="flex justify-between w-full">
        {subFields.map((field, index) => (
          <div className="flex flex-col items-center gap-2" key={index}>
            <p className="text-muted-foreground">{field.label}</p>
            <p>{field.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export { CurrentWeatherCard };
