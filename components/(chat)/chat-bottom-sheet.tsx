"use client";

import ModalOverlay from "../common/modal-overlay";
import ModalCancelButton from "../(detail)/modal-cancel-button";
import { leaveChatRoom } from "@/app/(detail)/chat/[id]/action";

interface ChatBottomSheetProps {
  id: string;
  cancelBottomActionSheet: () => void;
}

export default function ChatBottomSheet({
  id,
  cancelBottomActionSheet,
}: ChatBottomSheetProps) {
  return (
    <ModalOverlay cancelBottomActionSheet={cancelBottomActionSheet}>
      <div className="fixed right-0 left-0 mx-auto bottom-0 max-w-screen-sm bg-neutral-100 animate-fadeInUp z-30">
        <nav className="flex flex-col items-center pt-6 px-6 pb-10 gap-4">
          <form
            action={() => leaveChatRoom(id)}
            className="bg-white p-2 rounded-md flex items-center justify-center w-full cursor-pointer text-red-500 font-medium hover:bg-neutral-200"
          >
            <button>채팅방 나가기</button>
          </form>
          <ModalCancelButton
            cancelBottomActionSheet={cancelBottomActionSheet}
          />
        </nav>
      </div>
    </ModalOverlay>
  );
}
