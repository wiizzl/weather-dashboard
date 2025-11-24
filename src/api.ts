import { AirPollutionDataSchema } from "@/schemas/air-pollution.schema";
import { GeocodeDataSchema } from "@/schemas/geocode.schema";
import { WeatherDataSchema } from "@/schemas/weather.schema";

import type { Coords } from "@/types";

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

async function getWeather(coords: Coords) {
  const result = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&units=metric&exclude=minutely,alerts&appid=${OPENWEATHER_API_KEY}`
  );
  const data = await result.json();

  return WeatherDataSchema.parse(data);
}

async function getGeocode(location: string) {
  const result = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${OPENWEATHER_API_KEY}`
  );
  const data = await result.json();

  return GeocodeDataSchema.parse(data);
}

async function getAirPollution(coords: Coords) {
  const result = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${OPENWEATHER_API_KEY}`
  );
  const data = await result.json();

  return AirPollutionDataSchema.parse(data);
}

export { getAirPollution, getGeocode, getWeather };
