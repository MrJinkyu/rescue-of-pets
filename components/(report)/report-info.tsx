interface CardInfoProps {
  title: string;
  value: string;
  detail?: string | null;
}

export default function ReportInfo({ title, value, detail }: CardInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs flex-shrink-0 text-neutral-700">{title}</span>
      <span className="text-xs font-semibold overflow-hidden whitespace-nowrap truncate">
        {value} {detail ? `[${detail}]` : ""}
      </span>
    </div>
  );
}
