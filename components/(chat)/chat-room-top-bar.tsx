"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ChatBottomSheet from "./chat-bottom-sheet";
import ConfirmModal from "../common/confirm-modal";
import { leaveChatRoom } from "@/app/(detail)/chat/[id]/action";

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
  const [openModal, setOpenModal] = useState(false);
  const cancelBottomActionSheet = () => {
    setVisible(false);
  };
  const openConfirmModal = () => {
    setOpenModal(true);
  };
  const closeConfirmModal = () => {
    setOpenModal(false);
  };
  const confirmOnClick = async () => {
    await leaveChatRoom(chatRoomId);
  };
  const cancelAndReload = () => {
    router.back();
    setTimeout(() => {
      location.reload();
    }, 100);
  };
  return (
    <div className="fixed top-0 w-full max-w-screen-sm mx-auto flex items-center justify-between px-5 py-3 z-20 border-neutral-200 border-b bg-white">
      <ChevronLeftIcon
        onClick={cancelAndReload}
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
          openConfirmModal={openConfirmModal}
        />
      )}
      {openModal && (
        <ConfirmModal
          text="채팅방을 나가면 채팅 목록 및 대화 내용이 삭제되고 복구할 수 없어요. 채팅방에서 나가시겠어요?"
          yes="네, 나갈래요."
          no="취소"
          confirmOnClick={confirmOnClick}
          closeConfirmModal={closeConfirmModal}
        />
      )}
    </div>
  );
}
