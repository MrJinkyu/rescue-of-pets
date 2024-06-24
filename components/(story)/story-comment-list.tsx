"use client";

import { createComment } from "@/app/(detail)/story/[id]/comment/action";
import StoryCommentCard from "./story-comment-card";
import { useOptimistic } from "react";
import InputForm from "../common/input-form";

export interface StoryComment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  payload: string;
  storyId: number;
  userId: number;
  user: { avatar: null | string; username: string };
}

interface StoryCommentListProps {
  commentList: StoryComment[];
  storyId: number;
  loginUser: {
    id: number;
    username: string;
    avatar: string | null;
  };
}

export default function StoryCommentList({
  commentList,
  storyId,
  loginUser,
}: StoryCommentListProps) {
  const [state, reducerFn] = useOptimistic(
    commentList,
    (prevState: any[], newComment) => {
      return [newComment, ...prevState];
    }
  );
  const handleSubmit = async (text: string) => {
    reducerFn({
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: state.length + 1,
      payload: text,
      storyId,
      user: {
        avatar: loginUser.avatar,
        username: loginUser.username,
      },
    });
    await createComment(storyId, text);
  };
  return (
    <div className="mt-[52px] px-6">
      <div className="fixed top-[52px] left-0 right-0 w-full max-w-screen-sm mx-auto px-6 pt-4 bg-white z-10">
        <InputForm handleSubmit={handleSubmit} />
      </div>
      <div className="pt-14 pb-2">
        {state.map((comment) => (
          <StoryCommentCard key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
}
