import Image from "next/image";
import Link from "next/link";
import ReportIsActive from "./report-isActive";
import formatDate from "@/utils/formatDate";
import ReportInfo from "./report-info";

interface ReportCardPorps {
  id: number;
  createdAt: Date;
  isActive: boolean;
  missingPlace: string;
  species: string;
  detail: string | null;
  gender: string;
  photo: string;
  age: string;
  weight: string;
  color: string;
}

export default function ReportCard({
  id,
  createdAt,
  isActive,
  age,
  weight,
  color,
  missingPlace,
  species,
  detail,
  gender,
  photo,
}: ReportCardPorps) {
  return (
    <Link
      className={`w-full p-5 flex flex-col bg-white ${
        !isActive ? "opacity-60" : ""
      }`}
      href={`/report/${id}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-md">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          src={photo}
          alt="유기 동물 사진"
          className="object-cover"
        />
      </div>
      <div className="flex items-center gap-2 py-2">
        <ReportIsActive isActive={isActive} />
        <div className="text-md font-semibold overflow-hidden whitespace-nowrap truncate">
          {species} {detail ? `(${detail})` : ""}
        </div>
      </div>
      <div className="text-xs pb-2 overflow-hidden whitespace-nowrap truncate">
        {gender} / {age} / {weight} / {color}
      </div>
      <ReportInfo title="실종 장소" value={missingPlace} size="xs" />
      <ReportInfo
        title="작성 날짜"
        value={formatDate(createdAt.toString())}
        size="xs"
      />
    </Link>
  );
}
