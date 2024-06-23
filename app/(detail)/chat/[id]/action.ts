"use server";

import prismaDB from "@/database/db";
import { getSession } from "@/session/getSession";
import { redirect } from "next/navigation";

export async function createChatRoom(writerId: number) {
  const session = await getSession();
  const loginUserId = session.id!;
  const existingRoom = await prismaDB.chatRoom.findFirst({
    where: {
      AND: [
        {
          users: {
            some: {
              id: writerId,
            },
          },
        },
        {
          users: {
            some: {
              id: loginUserId,
            },
          },
        },
      ],
    },
    select: {
      id: true,
    },
  });
  if (!existingRoom) {
    const room = await prismaDB.chatRoom.create({
      data: {
        users: {
          connect: [
            {
              id: writerId,
            },
            {
              id: loginUserId,
            },
          ],
        },
      },
      select: {
        id: true,
      },
    });
    redirect(`/chat/${room.id}`);
  }
  redirect(`/chat/${existingRoom.id}`);
}

export async function getChatRoom(roomId: string) {
  const room = await prismaDB.chatRoom.findUnique({
    where: {
      id: roomId,
    },
    include: {
      users: {
        select: { id: true },
      },
    },
  });
  if (room) {
    const session = await getSession();
    const isValidUser = room.users.find((user) => user.id === session.id!);
    if (!isValidUser) {
      return null;
    }
    return room;
  } else {
    return null;
  }
}

export async function getInitMessages(chatRoomId: string) {
  const messages = await prismaDB.message.findMany({
    where: {
      chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      createdAt: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
    take: 15,
    orderBy: {
      createdAt: "desc",
    },
  });
  return messages;
}

export async function getMoreMessages(chatRoomId: string, page: number) {
  const messages = await prismaDB.message.findMany({
    where: {
      chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      createdAt: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
    skip: 15 * page,
    take: 15,
    orderBy: {
      createdAt: "desc",
    },
  });
  return messages;
}

export async function saveMessage(
  payload: string,
  chatRoomId: string,
  userId: number
) {
  await prismaDB.message.create({
    data: {
      payload,
      chatRoomId,
      userId,
    },
    select: {
      id: true,
    },
  });
}

export async function leaveChatRoom(chatRoomId: string) {
  const session = await getSession();
  const loginUserId = session.id!;
  try {
    await prismaDB.chatRoom.update({
      where: {
        id: chatRoomId,
      },
      data: {
        users: {
          disconnect: {
            id: loginUserId,
          },
        },
      },
    });
  } catch (e) {}
  redirect("/chat");
}
