type CardProps = {
  title: string;
  children: React.ReactNode;
  childrenClassName?: string;
};

const Card = (props: CardProps) => {
  return (
    <div className="p-4 rounded-xl bg-zinc-900 shadow-md flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{props.title}</h2>
      <div className={props.childrenClassName}>{props.children}</div>
    </div>
  );
};

export { Card };
