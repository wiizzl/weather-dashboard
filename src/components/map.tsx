import defaultMarkerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import defaultMarkerIconUrl from "leaflet/dist/images/marker-icon.png";
import defaultMarkerShadowUrl from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import { Icon } from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import type { Coords } from "@/types";

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

type MapProps = {
  coords: Coords;
  onMapClick: (coords: Coords) => void;
  mapType: string;
};

const Map = (props: MapProps) => {
  const { lat, lon } = props.coords;

  return (
    <MapContainer center={[lat, lon]} zoom={5} className="w-full h-full rounded-xl">
      <MapClick onMapClick={props.onMapClick} coords={props.coords} />
      <MapTileLayer />
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      <TileLayer
        opacity={0.7}
        url={`https://tile.openweathermap.org/map/${props.mapType}/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`}
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
};

const MapTileLayer = () => {
  const map = useMap();

  useEffect(() => {
    const tileLayer = new MaptilerLayer({
      style: "satellite",
      apiKey: MAPTILER_API_KEY,
    });

    tileLayer.addTo(map);
    Icon.Default.mergeOptions({
      iconUrl: defaultMarkerIconUrl,
      iconRetinaUrl: defaultMarkerIconRetinaUrl,
      shadowUrl: defaultMarkerShadowUrl,
    });

    return () => {
      map.removeLayer(tileLayer);
    };
  }, [map]);

  return null;
};

const MapClick = (props: { onMapClick: (coords: Coords) => void; coords: Coords }) => {
  const map = useMap();

  map.panTo([props.coords.lat, props.coords.lon]);

  map.on("click", (event) => {
    const { lat, lng } = event.latlng;
    props.onMapClick({ lat, lon: lng });
  });

  return null;
};

export { Map };
