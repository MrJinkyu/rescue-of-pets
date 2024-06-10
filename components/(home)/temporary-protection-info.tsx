interface CardInfoProps {
  title: string;
  value: string;
}

export default function TemporaryProtectionInfo({
  title,
  value,
}: CardInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm flex-shrink-0 text-neutral-700">{title}</span>
      <span className="text-md overflow-hidden whitespace-nowrap truncate">
        {value}
      </span>
    </div>
  );
}
