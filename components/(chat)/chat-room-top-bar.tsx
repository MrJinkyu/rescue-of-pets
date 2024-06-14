"use client";

import { useState } from "react";
import BottomActionSheet from "../(detail)/bottom-action-sheet";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import BackButton from "../common/back-button";

interface ChatRoomTopBarProps {
  id: number;
  text: string;
}

export default function ChatRoomTopBar({ id, text }: ChatRoomTopBarProps) {
  const onClick = () => {
    setVisible(true);
  };
  const [visible, setVisible] = useState(false);
  const cancelBottomActionSheet = () => {
    setVisible(false);
  };
  return (
    <div className="fixed top-0 w-full max-w-screen-sm mx-auto flex items-center justify-between px-5 py-3 z-20 bg-white">
      <BackButton />
      <h1 className="font-semibold text-xl text-mainColor">{text}</h1>
      <EllipsisHorizontalIcon
        onClick={onClick}
        className="size-6 cursor-pointer"
      />
      {visible && (
        <BottomActionSheet
          id={id}
          category="chat-room"
          cancelBottomActionSheet={cancelBottomActionSheet}
        />
      )}
    </div>
  );
}
