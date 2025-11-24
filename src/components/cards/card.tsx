import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  childrenClassName?: string;
};

const Card = (props: CardProps) => {
  return (
    <div
      className={cn(
        "p-4 rounded-xl bg-linear-to-br from-card to-card/60 shadow-md flex flex-col gap-4",
        props.className
      )}
    >
      <h2 className="text-2xl font-semibold">{props.title}</h2>
      <div className={cn(props.childrenClassName, "animate-fade-in")}>{props.children}</div>
    </div>
  );
};

export { Card };
