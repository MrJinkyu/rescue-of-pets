"use server";

import prismaDB from "@/database/db";
import { getSession } from "@/session/getSession";

export async function createComment(storyId: number, payload: string) {
  try {
    const session = await getSession();
    const comment = await prismaDB.comment.create({
      data: {
        storyId,
        userId: session.id!,
        payload,
      },
      select: {
        payload: true,
      },
    });
    return comment;
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
