import Link from "next/link";
import ProfileBar from "../common/profile-bar";
import Image from "next/image";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

interface StoryCardProps {
  title: string;
  photo: string | null;
  id: number;
  createdAt: Date;
  contents: string;
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
      className="bg-white w-full h-60 flex flex-col justify-center cursor-pointer rounded-sm shadow-sm"
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
            <h3 className="font-semibold text-md mb-2 line-clamp-1">{title}</h3>
            <div className="text-sm line-clamp-2">{contents}</div>
          </div>
          {photo ? (
            <div className="flex-shrink-0 relative size-28 rounded-sm overflow-hidden">
              <Image
                src={photo}
                alt="반려동물 사진"
                fill
                sizes="112px"
                priority
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 size-28" />
          )}
        </div>
        <div className="flex items-center gap-3 *:text-sm *:text-neutral-500 *:font-medium">
          <div className="flex items-center gap-1">
            <span>좋아요</span> <span>{likes}개</span>
          </div>
          <div className="flex items-center gap-1">
            <span>댓글</span>
            <span>{comments}개</span>
          </div>
        </div>
      </main>
    </Link>
  );
}
