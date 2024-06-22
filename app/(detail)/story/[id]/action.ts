"use server";

import prismaDB from "@/database/db";
import { getSession } from "@/session/getSession";
import { revalidateTag, unstable_cache } from "next/cache";

export async function getStory(storyId: number) {
  const story = await prismaDB.story.findUnique({
    where: {
      id: storyId,
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
}

export async function getCachedStory(storyId: number) {
  const cached = unstable_cache(
    (storyId) => getStory(storyId),
    [`story-detail`],
    {
      tags: [`story-detail`, `comment-list-${storyId}`],
      revalidate: 60,
    }
  );
  return cached(storyId);
}

export async function getLikeStatus(storyId: number, userId: number) {
  const isLiked = await prismaDB.like.findUnique({
    where: {
      id: {
        storyId,
        userId,
      },
    },
  });
  const likeCount = await prismaDB.like.count({
    where: {
      storyId,
    },
  });
  return { likeCount, isLiked: Boolean(isLiked) };
}

export async function getCachedLikeStatus(storyId: number, userId: number) {
  const cached = unstable_cache(
    (storyId, userId) => getLikeStatus(storyId, userId),
    [`story-liked-${storyId}`],
    {
      tags: [`story-liked-${storyId}`],
    }
  );
  return cached(storyId, userId);
}

export async function likeStory(storyId: number) {
  try {
    const session = await getSession();
    await prismaDB.like.create({
      data: {
        storyId,
        userId: session.id!,
      },
    });
    revalidateTag(`story-liked-${storyId}`);
  } catch (e) {}
}

export async function disLikeStory(storyId: number) {
  try {
    const session = await getSession();
    await prismaDB.like.delete({
      where: {
        id: {
          storyId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`story-liked-${storyId}`);
  } catch (e) {}
}

export async function getStoryComments(storyId: number) {
  const story = await prismaDB.story.findMany({
    where: {
      id: storyId,
    },
    select: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      comments: {
        select: {
          payload: true,
          createdAt: true,
        },
      },
    },
  });
  return story;
}

export async function getUserInfo(id: number) {
  const user = await prismaDB.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      avatar: true,
      username: true,
      email: true,
    },
  });
  return user;
}
