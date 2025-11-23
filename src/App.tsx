import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { AdditionalInfoCard } from "@/components/cards/additional-info-card";
import { CurrentWeatherCard } from "@/components/cards/current-weather-card";
import { DailyForecastCard } from "@/components/cards/daily-forecast-card";
import { HourlyForecastCard } from "@/components/cards/hourly-forecast-card";
import { LocationDropdown } from "@/components/dropdowns/location-dropdown";
import { Map } from "@/components/map";

import { getGeocode } from "@/api";
import type { Coords } from "@/types";

export default function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 48.86, lon: 2.33 });
  const [location, setLocation] = useState<string>("Paris");

  const { data } = useQuery({
    queryKey: ["location", location],
    queryFn: () => getGeocode(location),
  });

  const handleCoordsChange = (coords: Coords) => {
    setCoords(coords);
    setLocation("custom");
  };

  const coordinates: Coords = location === "custom" ? coords : { lat: data?.[0].lat ?? 0, lon: data?.[0].lon ?? 0 };

  return (
    <div className="flex flex-col gap-8">
      <LocationDropdown location={location} setLocation={setLocation} />
      <Map coords={coordinates} onMapClick={handleCoordsChange} />
      <CurrentWeatherCard coords={coordinates} />
      <HourlyForecastCard coords={coordinates} />
      <DailyForecastCard coords={coordinates} />
      <AdditionalInfoCard coords={coordinates} />
    </div>
  );
}
