"use server";

import {
  KEY_COMMENT_LIST,
  TAG_COMMENT_LIST,
  TAG_STORY_DETAIL,
  TAG_STORY_LIST,
} from "@/constants/cache";
import prismaDB from "@/database/db";
import { getSession } from "@/session/getSession";
import { revalidateTag, unstable_cache } from "next/cache";

export async function createComment(storyId: number, payload: string) {
  try {
    const session = await getSession();
    await prismaDB.comment.create({
      data: {
        storyId,
        userId: session.id!,
        payload,
      },
      select: {
        payload: true,
      },
    });
    revalidateTag(TAG_STORY_LIST);
    revalidateTag(`${TAG_STORY_DETAIL}-${storyId}`);
    revalidateTag(`${TAG_COMMENT_LIST}-${storyId}`);
  } catch (e) {}
}

export async function getComments(storyId: number) {
  const comments = await prismaDB.comment.findMany({
    where: {
      storyId,
    },
    include: {
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
}

export async function getCacheComments(storyId: number) {
  const cachedComment = unstable_cache(
    getComments,
    [`${KEY_COMMENT_LIST}-${storyId}`],
    {
      tags: [`${TAG_COMMENT_LIST}-${storyId}`],
    }
  );
  return cachedComment(storyId);
}
