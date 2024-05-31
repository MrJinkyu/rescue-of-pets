import TemporaryProtectionCard from "./temporary-protection-card";

interface TemporaryProtectionListProps {
  initList: {
    id: number;
    createdAt: Date;
    isActive: boolean;
    gender: string;
    species: string;
    detail: string | null;
    rescuePlace: string;
    area: string;
    photo: string;
  }[];
}

export default function TemporaryProtectionList({
  initList,
}: TemporaryProtectionListProps) {
  return (
    <div>
      {initList.map((item) => (
        <TemporaryProtectionCard key={item.id} {...item} />
      ))}
    </div>
  );
}
