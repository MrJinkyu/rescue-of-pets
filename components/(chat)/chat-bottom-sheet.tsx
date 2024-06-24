"use client";

import ModalOverlay from "../common/modal-overlay";
import ModalCancelButton from "../(detail)/modal-cancel-button";
import { useState } from "react";

interface ChatBottomSheetProps {
  id: string;
  cancelBottomActionSheet: () => void;
  openConfirmModal: () => void;
}

export default function ChatBottomSheet({
  id,
  cancelBottomActionSheet,
  openConfirmModal,
}: ChatBottomSheetProps) {
  return (
    <ModalOverlay cancelBottomActionSheet={cancelBottomActionSheet}>
      <div className="fixed right-0 left-0 mx-auto bottom-0 max-w-screen-sm bg-neutral-100 animate-fadeInUp z-30">
        <nav className="flex flex-col items-center pt-6 px-6 pb-10 gap-4">
          <div
            onClick={() => {
              cancelBottomActionSheet();
              setTimeout(() => {
                openConfirmModal();
              }, 500);
            }}
            className="bg-white p-2 rounded-md flex items-center justify-center w-full cursor-pointer text-red-500 font-medium hover:bg-neutral-200"
          >
            <button>채팅방 나가기</button>
          </div>
          <ModalCancelButton
            cancelBottomActionSheet={cancelBottomActionSheet}
          />
        </nav>
      </div>
    </ModalOverlay>
  );
}
