import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import type { Coords } from "../types";

type MapProps = {
  coords: Coords;
  onMapClick: (coords: Coords) => void;
};

const Map = (props: MapProps) => {
  const { lat, lon } = props.coords;

  return (
    <MapContainer center={[lat, lon]} zoom={5} style={{ width: "100%", height: "500px" }}>
      <MapClick onMapClick={props.onMapClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
};

const MapClick = ({ onMapClick }: { onMapClick: (coords: Coords) => void }) => {
  const map = useMap();

  map.on("click", (event) => {
    const { lat, lng } = event.latlng;
    onMapClick({ lat, lon: lng });
    map.panTo([lat, lng]);
  });

  return null;
};

export { Map };
