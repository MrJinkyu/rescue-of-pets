import Image from "next/image";
import Link from "next/link";
import TemporaryProtectionInfo from "./temporary-protection-info";
import TemporaryProtectionGender from "./temporary-protection-gender";
import TemporaryProtectionIsActive from "./temporary-protection-isActive";
import formatDate from "@/utils/formatDate";

interface TemporaryProtectionCardProps {
  id: number;
  createdAt: Date;
  isActive: boolean;
  gender: string;
  species: string;
  detail: string | null;
  rescuePlace: string;
  area: string;
  photo: string;
}

export default function TemporaryProtectionCard({
  id,
  createdAt,
  isActive,
  gender,
  species,
  detail,
  rescuePlace,
  area,
  photo,
}: TemporaryProtectionCardProps) {
  return (
    <Link
      className={`w-full h-40 px-5 flex items-center border border-neutral-100 bg-white ${
        !isActive ? "opacity-60" : ""
      }`}
      href={`/temporary-protection/${id}`}
    >
      <div className="relative size-32 overflow-hidden rounded-md">
        <Image fill src={photo} alt="구조 동물 사진" className="object-cover" />
      </div>
      <div className="flex flex-col px-2">
        <div className="flex items-center gap-2">
          <TemporaryProtectionIsActive isActive={isActive} />
          <TemporaryProtectionGender gender={gender} />
        </div>
        <TemporaryProtectionInfo
          title="작성 날짜"
          value={formatDate(createdAt.toString())}
        />
        <TemporaryProtectionInfo title="품종" value={species} detail={detail} />
        <TemporaryProtectionInfo title="구조 장소" value={rescuePlace} />
        <TemporaryProtectionInfo title="임보 지역" value={area} />
      </div>
    </Link>
  );
}
