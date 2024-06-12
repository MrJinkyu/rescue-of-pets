import Link from "next/link";
import ProfileBar from "../common/profile-bar";
import Image from "next/image";
import { link } from "fs";

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
      className="bg-white w-full h-72 flex flex-col justify-center"
    >
      <ProfileBar
        avatar={avatar}
        username={username}
        createdAt={createdAt}
        isStory
      />
      <main className="px-4 pb-3">
        <h3 className="font-semibold text-md pb-3 overflow-hidden whitespace-nowrap truncate">
          {title}
        </h3>
        <div className="text-sm overflow-hidden whitespace-nowrap truncate">
          {contents}
        </div>
        <div className="flex items-center">
          <div className="relative size-28 rounded-sm overflow-hidden my-3">
            <Image
              src={photo}
              alt="반려동물 사진"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 *:text-sm *:text-neutral-500 *:font-medium">
          <span>좋아요 {likes}</span>
          <span>댓글 {comments}</span>
        </div>
      </main>
    </Link>
  );
}
