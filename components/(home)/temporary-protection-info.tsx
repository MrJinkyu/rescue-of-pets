interface TemporaryProtectionInfoProps {
  title: "작성 날짜" | "구조 장소" | "임보 지역" | "품종";
  value: string;
  detail?: string | null;
}

export default function TemporaryProtectionInfo({
  title,
  value,
  detail,
}: TemporaryProtectionInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm flex-shrink-0 text-neutral-700">{title}</span>
      <span className="text-md overflow-hidden whitespace-nowrap truncate">
        {value} {detail ? `[${detail}]` : ""}
      </span>
    </div>
  );
}
