import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import type { Dispatch, SetStateAction } from "react";

type LocationDropdownProps = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

const LocationDropdown = (props: LocationDropdownProps) => {
  return (
    <NativeSelect value={props.location} onChange={(event) => props.setLocation(event.target.value)}>
      <NativeSelectOption value="custom">Custom</NativeSelectOption>
      {locations.map((city) => (
        <NativeSelectOption value={city} key={city}>
          {city}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
};

const locations = [
  "New York",
  "London",
  "Tokyo",
  "Sydney",
  "Paris",
  "Berlin",
  "Toronto",
  "Beijing",
  "Dubai",
  "São Paulo",
  "Moscow",
  "Mumbai",
];

export { LocationDropdown };
