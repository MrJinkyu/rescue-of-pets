import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import formatDate from "@/utils/formatDate";

interface StoryCommentCardProps {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  payload: string;
  storyId: number;
  userId: number;
  user: { avatar: null | string; username: string };
}

export default function StoryCommentCard({
  createdAt,
  payload,
  user: { avatar, username },
}: StoryCommentCardProps) {
  return (
    <div className="flex items-center gap-3 my-3">
      {avatar ? (
        <div className="bg-neutral-300 rounded-full flex justify-center items-center size-10 overflow-hidden">
          <Image src={avatar} alt={username} width={40} height={40} />
        </div>
      ) : (
        <div className="bg-neutral-300 rounded-full flex justify-center items-end size-10">
          <UserIcon className="size-8 text-white" />
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">{username}</span>{" "}
          <span className="text-xs text-neutral-400">
            {formatDate(createdAt.toString())}
          </span>
        </div>
        <div className="text-neutral-600">{payload}</div>
      </div>
    </div>
  );
}
