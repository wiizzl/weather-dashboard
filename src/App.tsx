import { useQuery } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import { Suspense, useState } from "react";

import { AdditionalInfoCard } from "@/components/cards/additional-info-card";
import { CurrentWeatherCard } from "@/components/cards/current-weather-card";
import { DailyForecastCard } from "@/components/cards/daily-forecast-card";
import { HourlyForecastCard } from "@/components/cards/hourly-forecast-card";
import { LocationDropdown } from "@/components/dropdowns/location-dropdown";
import { MapTypeDropdown } from "@/components/dropdowns/map-type-dropdown";
import { Map } from "@/components/map";
import { MapLegend } from "@/components/map-legend";
import { SidePanel } from "@/components/side-panel";
import { AdditionalInfoSkeleton } from "@/components/skeletons/additional-info-skeleton";
import { CurrentSkeleton } from "@/components/skeletons/current-skeleton";
import { DailySkeleton } from "@/components/skeletons/daily-skeleton";
import { HourlySkeleton } from "@/components/skeletons/hourly-skeleton";

import { getGeocode } from "@/api";
import type { Coords } from "@/types";

export default function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 48.86, lon: 2.33 });
  const [location, setLocation] = useState("Paris");
  const [mapType, setMapType] = useState("clouds_new");
  const [sidePanelOpen, setSidePanelOpen] = useState(true);

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
    <>
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          <div className="flex gap-4 items-center">
            <h1 className="text-xl font-semibold">Location:</h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex gap-4 items-center">
            <h1 className="text-xl font-semibold">Map type:</h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <button onClick={() => setSidePanelOpen(true)}>
            <Menu className="size-8 ml-auto" />
          </button>
        </div>
        <div className="relative">
          <Map coords={coordinates} onMapClick={handleCoordsChange} mapType={mapType} />
          <MapLegend mapType={mapType} />
        </div>
        <Suspense fallback={<CurrentSkeleton />}>
          <CurrentWeatherCard coords={coordinates} />
        </Suspense>
        <Suspense fallback={<HourlySkeleton />}>
          <HourlyForecastCard coords={coordinates} />
        </Suspense>
        <Suspense fallback={<DailySkeleton />}>
          <DailyForecastCard coords={coordinates} />
        </Suspense>
        <Suspense fallback={<AdditionalInfoSkeleton />}>
          <AdditionalInfoCard coords={coordinates} />
        </Suspense>
      </div>
      <SidePanel coords={coordinates} isOpen={sidePanelOpen} setOpen={setSidePanelOpen} />
    </>
  );
}
