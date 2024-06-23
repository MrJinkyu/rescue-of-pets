"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ChatBottomSheet from "./chat-bottom-sheet";

interface ChatRoomTopBarProps {
  chatRoomId: string;
  title: string;
}

export default function ChatRoomTopBar({
  chatRoomId,
  title,
}: ChatRoomTopBarProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const cancelBottomActionSheet = () => {
    setVisible(false);
  };
  return (
    <div className="fixed top-0 w-full max-w-screen-sm mx-auto flex items-center justify-between px-5 py-3 z-20 border-neutral-200 border-b bg-white">
      <ChevronLeftIcon
        onClick={() => router.back()}
        className="size-6 cursor-pointer"
      />
      <h1 className="font-semibold text-lg text-black">{title}</h1>
      <EllipsisHorizontalIcon
        onClick={() => setVisible(true)}
        className="size-6 cursor-pointer"
      />
      {visible && (
        <ChatBottomSheet
          id={chatRoomId}
          cancelBottomActionSheet={cancelBottomActionSheet}
        />
      )}
    </div>
  );
}
