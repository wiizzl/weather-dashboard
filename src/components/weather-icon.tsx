import { cn } from "@/lib/utils";

type WeatherIconProps = {
  label: string;
  src: string;
  className?: string;
};

const WeatherIcon = (props: WeatherIconProps) => {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${props.src}.png`}
      alt={`Weather icon : ${props.label}`}
      title={props.label}
      className={cn("size-8", props.className)}
      draggable="false"
    />
  );
};

export { WeatherIcon };
