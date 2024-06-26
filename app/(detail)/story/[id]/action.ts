"use server";

import {
  KEY_LIKE_STATUS,
  KEY_STORY_DETAIL,
  KEY_USER_INFO,
  TAG_LIKE_STATUS,
  TAG_PAGE_LIST,
  TAG_STORY_DETAIL,
  TAG_STORY_LIST,
} from "@/constants/cache";
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
  const cacheOperation = unstable_cache(
    getStory,
    [`${KEY_STORY_DETAIL}-${storyId}`],
    {
      tags: [TAG_PAGE_LIST, `${KEY_STORY_DETAIL}-${storyId}`],
    }
  );
  return cacheOperation(storyId);
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
  const cacheOperation = unstable_cache(
    getLikeStatus,
    [`${KEY_LIKE_STATUS}-${storyId}`],
    {
      tags: [TAG_PAGE_LIST, `${TAG_LIKE_STATUS}-${storyId}`],
    }
  );
  return cacheOperation(storyId, userId);
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
    revalidateTag(TAG_STORY_LIST);
    revalidateTag(TAG_STORY_DETAIL);
    revalidateTag(`${TAG_LIKE_STATUS}-${storyId}`);
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
    revalidateTag(TAG_STORY_LIST);
    revalidateTag(TAG_STORY_DETAIL);
    revalidateTag(`${TAG_LIKE_STATUS}-${storyId}`);
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
