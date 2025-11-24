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
import { MobileHeader } from "@/components/mobile-header";
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
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

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
      <MobileHeader setSidePanelOpen={setSidePanelOpen} />
      <div className="flex flex-col gap-8 pt-4 p-8 xs:pt-8 lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen 2xl:min-h-[1120px]">
        <div className="flex flex-col gap-4 xs:flex-row xs:gap-8">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <h1 className="text-2xl font-semibold">Location:</h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <h1 className="text-2xl font-semibold whitespace-nowrap">Map type:</h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <button onClick={() => setSidePanelOpen(true)} className="hidden xs:block">
            <Menu className="size-6 ml-auto lg:hidden" />
          </button>
        </div>
        <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4">
          <div className="relative h-120 2xl:h-auto md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1">
            <Map coords={coordinates} onMapClick={handleCoordsChange} mapType={mapType} />
            <MapLegend mapType={mapType} />
          </div>
          <div className="2xl:row-span-2 order-2">
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentWeatherCard coords={coordinates} />
            </Suspense>
          </div>
          <div className="order-3 2xl:row-span-2 2xl:order-4">
            <Suspense fallback={<DailySkeleton />}>
              <DailyForecastCard coords={coordinates} />
            </Suspense>
          </div>
          <div className="md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
            <Suspense fallback={<HourlySkeleton />}>
              <HourlyForecastCard coords={coordinates} />
            </Suspense>
          </div>
          <div className="md:col-span-2 2xl:row-span-1 order-5">
            <Suspense fallback={<AdditionalInfoSkeleton />}>
              <AdditionalInfoCard coords={coordinates} />
            </Suspense>
          </div>
        </div>
      </div>
      <SidePanel coords={coordinates} isOpen={sidePanelOpen} setOpen={setSidePanelOpen} />
    </>
  );
}
