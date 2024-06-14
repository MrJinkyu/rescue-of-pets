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
    <div className="mt-[53px] px-4">
      <InputForm handleSubmit={handleSubmit} />
      <div className="px-2 py-2">
        {state.map((comment) => (
          <StoryCommentCard key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
}
