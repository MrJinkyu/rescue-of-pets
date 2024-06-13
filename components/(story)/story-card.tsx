import Link from "next/link";
import ProfileBar from "../common/profile-bar";
import Image from "next/image";
import { link } from "fs";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

interface StoryCardProps {
  id: number;
  createdAt: Date;
  title: string;
  contents: string | null;
  photo: string;
  user: {
    username: string;
    avatar: string | null;
  };
  _count: {
    comments: number;
    likes: number;
  };
}

export default function StoryCard({
  id,
  createdAt,
  title,
  contents,
  photo,
  user: { username, avatar },
  _count: { comments, likes },
}: StoryCardProps) {
  return (
    <Link
      href={`/story/${id}`}
      className="bg-white w-full h-60 flex flex-col justify-center cursor-pointer"
    >
      <ProfileBar
        avatar={avatar}
        username={username}
        createdAt={createdAt}
        isStory
      />
      <main className="w-full px-4 pb-3">
        <div className="w-full flex justify-between pb-2 gap-2">
          <div className="flex flex-col">
            <h3 className="font-semibold text-md pb-2 line-clamp-1">{title}</h3>
            <div className="text-sm line-clamp-2">{contents}</div>
          </div>
          <div className="flex-shrink-0 relative size-28 rounded-sm overflow-hidden">
            <Image
              src={photo}
              alt="반려동물 사진"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 *:text-sm *:text-neutral-500 *:font-medium">
          <div className="flex items-center gap-1">
            <HeartIcon className="size-6" /> <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChatBubbleBottomCenterIcon className="size-6" />{" "}
            <span>{comments}</span>
          </div>
        </div>
      </main>
    </Link>
  );
}
