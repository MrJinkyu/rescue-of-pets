import StoryCommentList from "@/components/(story)/story-comment-list";
import CommentTopBar from "@/components/common/comment-top-bar";
import { notFound } from "next/navigation";
import React from "react";
import { getCacheComments } from "./action";
import { getLoginUser } from "../action";

export default async function StoryComment({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    notFound();
  }
  const comments = await getCacheComments(id);
  const loginUser = await getLoginUser();
  return (
    <section>
      <CommentTopBar />
      <StoryCommentList
        commentList={comments}
        storyId={id}
        loginUser={loginUser!}
      />
    </section>
  );
}
