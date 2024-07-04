import { notFound } from "next/navigation";
import { getCachedReport } from "./action";
import { getSession } from "@/session/getSession";
import DetailTopBar from "@/components/common/detail-top-bar";
import ProfileBar from "@/components/common/profile-bar";
import Image from "next/image";
import ReportIsActive from "@/components/(report)/report-isActive";
import ReportInfo from "@/components/(report)/report-info";
import ChatButton from "@/components/common/chat-button";

export default async function ReportDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }
  const report = await getCachedReport(id);
  if (!report) {
    notFound();
  }
  const {
    photo,
    species,
    detail,
    gender,
    isActive,
    missingPlace,
    createdAt,
    description,
    userId,
    age,
    name,
    weight,
    color,
    characteristics,
    user: { username, avatar },
  } = report;
  const user = await getSession();
  const isOwner = userId === user.id;
  return (
    <section>
      <DetailTopBar isOwner={isOwner} id={report.id} category="report" />
      <ProfileBar avatar={avatar} username={username} createdAt={createdAt} />
      <div className="relative aspect-square">
        <Image
          src={photo}
          alt={species}
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="flex flex-col p-4 pb-[52px]">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold">
            {species} {detail ? `[${detail}]` : ""}
          </div>
          <div className="flex items-center gap-2">
            <ReportIsActive isActive={isActive} />
          </div>
        </div>
        <div className="flex flex-col">
          <ReportInfo title="이름" value={name} size="sm" />
          <ReportInfo title="성별" value={gender} size="sm" />
          <ReportInfo title="나이" value={age} size="sm" />
          <ReportInfo title="몸무게" value={weight} size="sm" />
          <ReportInfo title="털색" value={color} size="sm" />
          <ReportInfo title="특징" value={characteristics} size="sm" />
          <ReportInfo title="실종 장소" value={missingPlace} size="sm" />
        </div>
        {description && (
          <div className="bg-neutral-100 rounded-md p-4 my-4 text-sm break-words">
            {description}
          </div>
        )}
      </div>
      {!isOwner && <ChatButton text="채팅하기" writerId={userId} />}
    </section>
  );
}
