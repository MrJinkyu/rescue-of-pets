"use client";

import formatTimeAgo from "@/utils/formatTimeAgo";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AddTopBar from "../common/add-top-bar";
import InputForm from "../common/input-form";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { SUPABASE_API, SUPABASE_URL } from "@/constants/chat";
import { getMoreMessages, saveMessage } from "@/app/(detail)/chat/[id]/action";

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
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);
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
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, [messages]);
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
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (trigger.current && element.isIntersecting) {
          observer.unobserve(trigger.current);
          const nextMessages = await getMoreMessages(chatRoomId, page + 1);
          const reverseNextMessages = nextMessages.reverse();
          if (nextMessages.length !== 0) {
            setMessages((prev) => [...reverseNextMessages, ...prev]);
            setPage((prev) => prev + 1);
          } else {
            setIsLastPage(true);
          }
        }
      },
      {
        rootMargin: "53px 0px 0px 0px",
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page, chatRoomId]);
  return (
    <section className="flex flex-col">
      <AddTopBar title={otherUserInfo.username} />
      <main className="flex flex-col pt-[53px]">
        <div
          ref={chatRoomRef}
          className="h-chat-screen flex flex-col pb-5 gap-5 flex-grow overflow-y-auto bg-white"
        >
          {!isLastPage && <span ref={trigger} className="w-full h-0" />}
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className={`flex gap-2 items-start px-5 first-of-type:pt-5 ${
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
        <div className="px-5">
          <InputForm handleSubmit={handleSubmit} />
        </div>
      </main>
    </section>
  );
}
