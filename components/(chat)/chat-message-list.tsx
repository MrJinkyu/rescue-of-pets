"use client";

import formatTimeAgo from "@/utils/formatTimeAgo";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

interface ChatMessageListProps {
  initMessageList: {
    id: number;
    createdAt: Date;
    user: {
      username: string;
      avatar: string | null;
    };
    payload: string;
    userId: number;
  }[];
  loginUserId: number;
}

export default function ChatMessageList({
  initMessageList,
  loginUserId,
}: ChatMessageListProps) {
  const [messages, setMessages] = useState(initMessageList);
  return (
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={`flex gap-2 items-start ${
              loginUserId === message.userId ? "justify-end" : "justify-start"
            }`}
          >
            {message.user.avatar ? (
              <div className="bg-neutral-300 rounded-full flex justify-center items-center size-8 overflow-hidden">
                <Image
                  src={message.user.avatar}
                  alt={message.user.username}
                  width={30}
                  height={30}
                />
              </div>
            ) : (
              <div className="bg-neutral-300 rounded-full flex justify-center items-end size-8">
                <UserIcon className="size-6 text-white" />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="bg-mainColor p-2.5 rounded-md">
                {message.payload}
              </span>
              <span className="text-xs">
                {formatTimeAgo(message.createdAt.toString())}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
