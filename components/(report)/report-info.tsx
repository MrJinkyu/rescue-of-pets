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
      <div
        className={`${
          size === "sm" ? "text-sm w-5/6" : "text-xs"
        } font-semibold overflow-hidden flex-wrap`}
      >
        {value}
      </div>
    </div>
  );
}
