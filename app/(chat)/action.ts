"use server";

import prismaDB from "@/database/db";
import { getSession } from "@/session/getSession";
import { redirect } from "next/navigation";

export async function createChatRoom(writerId: number) {
  const session = await getSession();
  const loginUserId = session.id!;

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
    take: 10,
  });
  return messages;
}
