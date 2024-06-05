import { notFound } from "next/navigation";
import { getTemporaryProtection } from "./action";
import Image from "next/image";
import TemporaryProtectionIsActive from "@/components/(home)/temporary-protection-isActive";
import TemporaryProtectionGender from "@/components/(home)/temporary-protection-gender";
import TemporaryProtectionInfo from "@/components/(home)/temporary-protection-info";
import formatTimeAgo from "@/utils/formatTimeAgo";
import SubmitButton from "@/components/common/submit-button";
import DetailTopBar from "@/components/common/detail-top-bar";
import { getSession } from "@/session/getSession";
import BottomActionSheet from "@/components/(detail)/bottom-action-sheet";

export default async function TemporaryProtectionDetail({
  params,
}: {
  params: { id: number };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }
  const temporaryProtection = await getTemporaryProtection(id);
  if (!temporaryProtection) {
    notFound();
  }
  const {
    photo,
    species,
    detail,
    gender,
    isActive,
    rescuePlace,
    area,
    createdAt,
    description,
    userId,
  } = temporaryProtection;
  const user = await getSession();
  const isOwner = userId === user.id;
  return (
    <div>
      <DetailTopBar isOwner={isOwner} id={temporaryProtection.id} />
      <div className="relative aspect-square mt-[53px]">
        <Image src={photo} alt={species} fill className="object-cover" />
      </div>
      <div className="flex flex-col p-4 pb-[52px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-bold">
              {species} {detail ? `[${detail}]` : ""}
            </span>
            <span className="text-neutral-400">
              {formatTimeAgo(createdAt.toString())}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TemporaryProtectionIsActive isActive={isActive} />
            <TemporaryProtectionGender gender={gender} />
          </div>
        </div>
        <div className="flex flex-col">
          <TemporaryProtectionInfo title="구조 장소" value={rescuePlace} />
          <TemporaryProtectionInfo title="임보 지역" value={area} />
        </div>
        {description && (
          <div className="bg-neutral-100 rounded-md p-4 my-4 text-sm">
            {description}
          </div>
        )}
      </div>
      <SubmitButton text="입양문의" />
    </div>
  );
}
