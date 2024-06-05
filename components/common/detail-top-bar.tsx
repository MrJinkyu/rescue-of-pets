"use client";
import { useState } from "react";
import BottomActionSheet from "../(detail)/bottom-action-sheet";
import BackButton from "./back-button";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

export default function DetailTopBar({ isOwner }: { isOwner: boolean }) {
  const onClick = () => {
    if (isOwner) {
      setVisible(true);
    } else {
      alert("글 작성자만 수정할 수 있습니다.");
    }
  };
  const [visible, setVisible] = useState(false);
  const cancelBottomActionSheet = () => {
    setVisible(false);
  };
  return (
    <div className="fixed top-0 w-full max-w-screen-sm mx-auto flex items-center justify-between px-5 py-3 z-20 border-neutral-200 border-b bg-white">
      <BackButton />
      <h1 className="font-semibold text-xl text-mainColor">meetAgain</h1>
      <EllipsisHorizontalIcon
        onClick={onClick}
        className="size-6 cursor-pointer"
      />
      {visible && (
        <BottomActionSheet cancelBottomActionSheet={cancelBottomActionSheet} />
      )}
    </div>
  );
}
