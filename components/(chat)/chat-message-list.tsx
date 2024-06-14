"use client";

import formatTimeAgo from "@/utils/formatTimeAgo";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AddTopBar from "../common/add-top-bar";
import InputForm from "../common/input-form";
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
  otherUserName: string;
}

export default function ChatMessageList({
  initMessageList,
  loginUserId,
  otherUserName,
}: ChatMessageListProps) {
  const [messages, setMessages] = useState(initMessageList);
  const chatRoomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, []);
  return (
    <section className="flex flex-col">
      <AddTopBar title={otherUserName} />
      <main className="flex flex-col p-5 mt-[53px]">
        <div
          ref={chatRoomRef}
          className="h-screen-minus-133 flex flex-col justify-end pb-5 gap-5 flex-grow overflow-y-auto bg-white"
        >
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className={`flex gap-2 items-start ${
                  loginUserId === message.userId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.user.avatar ? (
                  <div
                    className={`bg-neutral-300 rounded-full flex justify-center items-center size-8 overflow-hidden ${
                      loginUserId === message.userId ? "hidden" : ""
                    }`}
                  >
                    <Image
                      src={message.user.avatar}
                      alt={message.user.username}
                      width={30}
                      height={30}
                    />
                  </div>
                ) : (
                  <div
                    className={`bg-neutral-300 rounded-full flex justify-center items-end size-8 ${
                      loginUserId === message.userId ? "hidden" : ""
                    }`}
                  >
                    <UserIcon className="size-6 text-white" />
                  </div>
                )}
                <div
                  className={`flex items-end gap-2 ${
                    loginUserId === message.userId ? "flex-row-reverse" : ""
                  }`}
                >
                  <span
                    className={`${
                      loginUserId === message.userId
                        ? "bg-neutral-100"
                        : "bg-sky-100"
                    } px-3 py-2 rounded-md`}
                  >
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
        <InputForm handleSubmit={() => {}} />
      </main>
    </section>
  );
}
