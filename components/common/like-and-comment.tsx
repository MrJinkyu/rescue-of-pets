"use client";

import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { useOptimistic, useState } from "react";
import { disLikeStory, likeStory } from "@/app/(detail)/story/[id]/action";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
interface LikeAndCommentProps {
  isLiked: boolean;
  likeCount: number;
  storyId: number;
  commentCount: number;
}

export default function LikeAndComment({
  isLiked,
  likeCount,
  storyId,
  commentCount,
}: LikeAndCommentProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (prevState, payload) => {
      return {
        isLiked: !prevState.isLiked,
        likeCount: prevState.isLiked
          ? prevState.likeCount - 1
          : prevState.likeCount + 1,
      };
    }
  );
  const onClick = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await disLikeStory(storyId);
    } else {
      await likeStory(storyId);
    }
  };
  return (
    <div className="fixed bottom-0 w-full max-w-screen-sm mx-auto z-10 bg-white flex flex-col py-4">
      <div className="flex items-center gap-3 px-6">
        <div className="flex items-center gap-1">
          <button
            onClick={onClick}
            className={`${state.isLiked ? "text-red-400" : "text-black"}`}
          >
            {state.isLiked ? (
              <SolidHeartIcon className="size-6" />
            ) : (
              <OutlineHeartIcon className="size-6" />
            )}
          </button>
          <span>{state.likeCount}</span>
        </div>
        <Link
          href={`/story/${storyId}/comment`}
          className="flex items-center gap-1"
        >
          <ChatBubbleBottomCenterIcon className="size-6 cursor-pointer" />
          <span>{commentCount}</span>
        </Link>
      </div>
    </div>
  );
}
