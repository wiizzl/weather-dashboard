import { WeatherDataSchema } from "./schemas/weather.schema";

import type { Coords } from "./types";

const API_KEY = import.meta.env.VITE_API_KEY;

async function getWeather(coords: Coords) {
  const result = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`
  );
  const data = await result.json();

  return WeatherDataSchema.parse(data);
}

export { getWeather };
