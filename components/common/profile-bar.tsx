import formatTimeAgo from "@/utils/formatTimeAgo";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface ProfileBarProps {
  avatar: string | null;
  username: string;
  createdAt: Date;
  isStory?: boolean;
}

export default function ProfileBar({
  avatar,
  username,
  createdAt,
  isStory = false,
}: ProfileBarProps) {
  return (
    <div
      className={`w-full px-4 py-3 flex justify-between  items-center ${
        isStory ? "" : "mt-[53px]"
      }`}
    >
      <div className="flex items-center gap-2">
        {avatar ? (
          <div className="bg-neutral-300 rounded-full flex justify-center items-center size-8 overflow-hidden">
            <Image src={avatar} alt={username} width={30} height={30} />
          </div>
        ) : (
          <div className="bg-neutral-300 rounded-full flex justify-center items-end size-8">
            <UserIcon className="size-6 text-white" />
          </div>
        )}
        <span className="font-semibold">{username}</span>
      </div>
      <div className="text-neutral-400 text-sm">
        {formatTimeAgo(createdAt.toString())}
      </div>
    </div>
  );
}
