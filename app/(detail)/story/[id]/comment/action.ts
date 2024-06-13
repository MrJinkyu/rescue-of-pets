"use server";

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
    revalidateTag(`comment-list-${storyId}`);
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
    [`comment-list-${storyId}`],
    {
      tags: [`comment-list-${storyId}`],
    }
  );
  return cachedComment(storyId);
}
