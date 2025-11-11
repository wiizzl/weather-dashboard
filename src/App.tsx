import { useState } from "react";

import { AdditionalInfoCard } from "./components/cards/additional-info-card";
import { CurrentWeatherCard } from "./components/cards/current-weather-card";
import { DailyForecastCard } from "./components/cards/daily-forecast-card";
import { HourlyForecastCard } from "./components/cards/hourly-forecast-card";
import { Map } from "./components/map";

import type { Coords } from "./types";

export default function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 20, lon: 25 });

  const handleCoordsChange = (coords: Coords) => {
    setCoords(coords);
  };

  return (
    <div className="flex flex-col gap-8">
      <Map coords={coords} onMapClick={handleCoordsChange} />
      <CurrentWeatherCard coords={coords} />
      <HourlyForecastCard coords={coords} />
      <DailyForecastCard coords={coords} />
      <AdditionalInfoCard coords={coords} />
    </div>
  );
}
