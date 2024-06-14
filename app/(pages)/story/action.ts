"use server";

import prismaDB from "@/database/db";

export async function getInitStory() {
  const storys = await prismaDB.story.findMany({
    select: {
      id: true,
      title: true,
      contents: true,
      createdAt: true,
      photo: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
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
    take: 5,
  });
  return storys;
}

export async function getMoreStory(page: number) {
  const storys = await prismaDB.story.findMany({
    select: {
      id: true,
      title: true,
      contents: true,
      createdAt: true,
      photo: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
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
    take: 5,
    skip: page * 5,
  });
  return storys;
}
