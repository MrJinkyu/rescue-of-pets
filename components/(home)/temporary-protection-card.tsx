import Image from "next/image";
import Link from "next/link";
import TemporaryProtectionInfo from "./temporary-protection-info";

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
      className="w-full h-36 px-5 flex items-center border border-neutral-100"
      href={`/temporary-protection/${id}`}
    >
      <div className="relative size-28 overflow-hidden rounded-md">
        <Image
          fill
          src="https://images.unsplash.com/photo-1608643071978-71b760d25cbd?q=80&w=1168&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="구조 동물 사진"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col px-2">
        <div className="flex items-center gap-2">
          <div
            className={`${
              isActive
                ? "bg-green-100 text-green-600"
                : "bg-neutral-100 text-neutral-600"
            } p-1 rounded-md text-xs font-semibold `}
          >
            {isActive ? "보호중" : "완료"}
          </div>
          <div
            className={`${
              gender === "암컷"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            } p-1 rounded-md text-xs font-semibold `}
          >
            {gender}
          </div>
        </div>
        <TemporaryProtectionInfo title="구조장소" value={rescuePlace} />
        <TemporaryProtectionInfo title="보호지역" value={area} />
        <TemporaryProtectionInfo title="품종" value={species} detail={detail} />
      </div>
    </Link>
  );
}
