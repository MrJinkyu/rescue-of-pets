"use client";

import formatTimeAgo from "@/utils/formatTimeAgo";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AddTopBar from "../common/add-top-bar";
import InputForm from "../common/input-form";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { SUPABASE_API, SUPABASE_URL } from "@/constants/chat";
import { saveMessage } from "@/app/(detail)/chat/[id]/action";

export interface UserInfo {
  id: number;
  username: string;
  avatar: string | null;
}
interface ChatMessageListProps {
  chatRoomId: string;
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
  loginUserInfo: UserInfo;
  otherUserInfo: UserInfo;
}

export default function ChatMessageList({
  chatRoomId,
  initMessageList,
  loginUserInfo,
  otherUserInfo,
}: ChatMessageListProps) {
  const [messages, setMessages] = useState(initMessageList);
  const chatRoomRef = useRef<HTMLDivElement>(null);
  const channel = useRef<RealtimeChannel>();
  const handleSubmit = (text: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: messages.length + 1,
        payload: text,
        createdAt: new Date(),
        userId: loginUserInfo.id,
        user: {
          avatar: loginUserInfo.avatar,
          username: loginUserInfo.username,
        },
      },
    ]);
    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: messages.length + 1,
        payload: text,
        createdAt: new Date(),
        userId: loginUserInfo.id,
        user: {
          avatar: loginUserInfo.avatar,
          username: loginUserInfo.username,
        },
      },
    });
    saveMessage(text, chatRoomId, loginUserInfo.id);
  };
  useEffect(() => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, []);
  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_API);
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        setMessages((prevMessages) => [...prevMessages, payload.payload]);
      })
      .subscribe();
    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);
  return (
    <section className="flex flex-col">
      <AddTopBar title={otherUserInfo.username} />
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
                  loginUserInfo.id === message.userId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.user.avatar ? (
                  <div
                    className={`bg-neutral-300 rounded-full flex justify-center items-center size-8 overflow-hidden ${
                      loginUserInfo.id === message.userId ? "hidden" : ""
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
                      loginUserInfo.id === message.userId ? "hidden" : ""
                    }`}
                  >
                    <UserIcon className="size-6 text-white" />
                  </div>
                )}
                <div
                  className={`flex items-end gap-2 ${
                    loginUserInfo.id === message.userId
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >
                  <span
                    className={`${
                      loginUserInfo.id === message.userId
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
        <InputForm handleSubmit={handleSubmit} />
      </main>
    </section>
  );
}
