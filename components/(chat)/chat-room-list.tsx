import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";
import formatTimeAgo from "@/utils/formatTimeAgo";

interface ChatRoomListProps {
  id: string;
  lastMessage: string;
  avatar: string | null;
  username: string;
  createdAt: Date;
}

export default function ChatRoomList({
  id,
  lastMessage,
  avatar,
  username,
  createdAt,
}: ChatRoomListProps) {
  return (
    <Link
      href={`/chat/${id}`}
      className="w-full h-[81px] p-4  flex items-center border-b border-neutral-200 text-black last:border-b-0 hover:bg-neutral-50 transition-colors"
    >
      <div className="mr-4">
        {avatar ? (
          <div className="bg-neutral-300 rounded-full flex justify-center items-center size-10 overflow-hidden">
            <Image src={avatar} alt={username} width={40} height={40} />
          </div>
        ) : (
          <div className="bg-neutral-300 rounded-full flex justify-center items-end size-10">
            <UserIcon className="size-8 text-white" />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div>
          <span className="text-md mr-4">{username}</span>
          <span className="text-xs text-neutral-300">
            {formatTimeAgo(createdAt.toString())}
          </span>
        </div>
        <div className="text-md line-clamp-1">{lastMessage}</div>
      </div>
    </Link>
  );
}
