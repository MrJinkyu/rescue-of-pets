interface CardInfoProps {
  title: string;
  value: string;
  size: "sm" | "xs";
}

export default function ReportInfo({ title, value, size }: CardInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`${
          size === "sm" ? "text-sm w-1/6" : "text-xs"
        } flex-shrink-0 text-neutral-700`}
      >
        {title}
      </span>
      <span
        className={`${
          size === "sm" ? "text-sm w-5/6" : "text-xs"
        } font-semibold overflow-hidden whitespace-nowrap truncate`}
      >
        {value}
      </span>
    </div>
  );
}
