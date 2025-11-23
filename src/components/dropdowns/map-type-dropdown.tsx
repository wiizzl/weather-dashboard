import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import type { Dispatch, SetStateAction } from "react";

type MapTypeDropdownProps = {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};

const MapTypeDropdown = (props: MapTypeDropdownProps) => {
  return (
    <NativeSelect value={props.mapType} onChange={(event) => props.setMapType(event.target.value)}>
      {types.map((type) => (
        <NativeSelectOption value={type.value} key={type.value}>
          {type.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
};

const types = [
  { value: "clouds_new", label: "Clouds" },
  { value: "precipitation_new", label: "Precipitation" },
  { value: "pressure_new", label: "Pressure" },
  { value: "wind_new", label: "Wind" },
  { value: "temp_new", label: "Temperature" },
];

export { MapTypeDropdown };
