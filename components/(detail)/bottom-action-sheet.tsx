"use client";

import { deletePost, updatePost } from "@/app/(detail)/action";
import ModalOverlay from "../common/modal-overlay";
import ModalCancelButton from "./modal-cancel-button";

interface BottomActionSheetProps {
  id: number;
  category: "temporary-protection" | "report" | "story";
  cancelBottomActionSheet: () => void;
}

export default function BottomActionSheet({
  id,
  category,
  cancelBottomActionSheet,
}: BottomActionSheetProps) {
  return (
    <ModalOverlay cancelBottomActionSheet={cancelBottomActionSheet}>
      <div className="fixed right-0 left-0 mx-auto bottom-0 max-w-screen-sm bg-white animate-fadeInUp">
        <nav className="flex flex-col items-center p-4 gap-4">
          <div className="flex items-center text-neutral-400 text-sm">
            작업을 선택하세요
          </div>
          <form
            action={() => updatePost(id, category)}
            className="flex gap-2 items-center justify-center flex-1  cursor-pointer text-black font-semibold"
          >
            <button>완료처리</button>
          </form>
          <form
            action={() => deletePost(id, category)}
            className="flex gap-2 items-center justify-center flex-1 cursor-pointer text-black font-semibold"
          >
            <button>삭제하기</button>
          </form>
          <ModalCancelButton
            cancelBottomActionSheet={cancelBottomActionSheet}
          />
        </nav>
      </div>
    </ModalOverlay>
  );
}
