"use server";

import prismaDB from "@/database/db";

export async function getChatRoomList(userId: number) {
  if (!userId) {
    return [];
  }
  const chatRoomList = await prismaDB.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      messages: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          payload: true,
        },
      },
      users: {
        where: {
          id: {
            not: userId,
          },
        },
        select: {
          avatar: true,
          username: true,
        },
      },
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return chatRoomList;
}
