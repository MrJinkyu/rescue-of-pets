import { notFound } from "next/navigation";
import { getCachedTemporaryProtection } from "./action";
import Image from "next/image";
import TemporaryProtectionIsActive from "@/components/(home)/temporary-protection-isActive";
import TemporaryProtectionGender from "@/components/(home)/temporary-protection-gender";
import TemporaryProtectionInfo from "@/components/(home)/temporary-protection-info";
import DetailTopBar from "@/components/common/detail-top-bar";
import { getSession } from "@/session/getSession";
import ProfileBar from "@/components/common/profile-bar";
import ChatButton from "@/components/common/chat-button";

export default async function TemporaryProtectionDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }
  const temporaryProtection = await getCachedTemporaryProtection(id);
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
    user: { username, avatar },
  } = temporaryProtection;
  const user = await getSession();
  const isOwner = userId === user.id;
  return (
    <section>
      <DetailTopBar
        isOwner={isOwner ? true : false}
        id={temporaryProtection.id}
        category="temporary-protection"
      />
      <ProfileBar avatar={avatar} username={username} createdAt={createdAt} />
      <div className="relative aspect-square">
        <Image src={photo} alt={species} fill className="object-cover" />
      </div>
      <div className="flex flex-col p-4 pb-[52px]">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold">
            {species} {detail ? `[${detail}]` : ""}
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
          <div className="bg-neutral-100 rounded-md p-4 my-4 text-sm break-words">
            {description}
          </div>
        )}
      </div>
      {!isOwner && <ChatButton text="입양문의" writerId={userId} />}
    </section>
  );
}
