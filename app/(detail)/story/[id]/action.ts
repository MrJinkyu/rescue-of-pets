"use server";

import { getSession } from "@/session/getSession";
import prismaDB from "@/database/db";
import { revalidatePath } from "next/cache";

export async function getStory(id: number) {
  try {
    const story = await prismaDB.story.update({
      where: {
        id,
      },
      data: {
        view: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
    return story;
  } catch (e) {
    return null;
  }
}

export async function getIsLiked(id: number) {
  const session = await getSession();
  const like = await prismaDB.like.findUnique({
    where: {
      id: {
        storyId: id,
        userId: session.id!,
      },
    },
  });
  return Boolean(like);
}
