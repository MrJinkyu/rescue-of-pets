import React from "react";
import StoryCard from "./story-card";

interface StoryListProps {
  initList: {
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
  }[];
}

export default function StoryList({ initList }: StoryListProps) {
  return (
    <div className="bg-neutral-100 flex flex-col gap-1">
      {initList.map((post) => (
        <StoryCard key={post.id} {...post} />
      ))}
    </div>
  );
}
