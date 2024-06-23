import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";
import formatTimeAgo from "@/utils/formatTimeAgo";

interface ChatRoomListProps {
  id: string;
  lastMessage: string | null;
  avatar: string | null;
  username: string | null;
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
      className={`cursor-pointer w-full h-[81px] p-4  flex items-center border-neutral-200 text-black hover:bg-neutral-50 transition-colors ${
        username ? "" : "opacity-50"
      }`}
    >
      <div className="mr-4">
        {avatar ? (
          <div className="bg-neutral-300 rounded-full flex justify-center items-center size-10 overflow-hidden">
            <Image src={avatar} alt={username ?? ""} width={40} height={40} />
          </div>
        ) : (
          <div className="bg-neutral-300 rounded-full flex justify-center items-end size-10">
            <UserIcon className="size-8 text-white" />
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <span className="text-lg mr-4">{username ?? "(알 수 없음)"}</span>
          <span className="text-xs text-neutral-400">
            {formatTimeAgo(createdAt.toString())}
          </span>
        </div>
        {lastMessage ? (
          <div className="text-md line-clamp-1 text-neutral-500">
            {lastMessage}
          </div>
        ) : (
          <div className="text-md text-neutral-500">
            새로운 채팅방이 생성되었습니다
          </div>
        )}
      </div>
    </Link>
  );
}
