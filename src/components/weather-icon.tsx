import clsx from "clsx";

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
      className={clsx("size-8", props.className)}
      draggable="false"
    />
  );
};

export { WeatherIcon };
