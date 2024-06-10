import ReportCard from "./report-card";

interface ReportListProps {
  initList: {
    id: number;
    createdAt: Date;
    isActive: boolean;
    missingPlace: string;
    species: string;
    detail: string | null;
    gender: string;
    photo: string;
    name: string;
    age: string;
    weight: string;
    color: string;
  }[];
}

export default function ReportList({ initList }: ReportListProps) {
  return (
    <div className="grid grid-cols-2">
      {initList.map((post) => (
        <ReportCard key={post.id} {...post} />
      ))}
    </div>
  );
}
