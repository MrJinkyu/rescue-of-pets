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
      <div className="fixed right-0 left-0 mx-auto bottom-0 max-w-screen-sm bg-neutral-100 animate-fadeInUp z-30">
        <nav className="flex flex-col items-center pt-6 px-6 pb-10 gap-4">
          {category !== "story" && (
            <form
              action={() => updatePost(id, category)}
              className="bg-white p-2 rounded-md w-full flex gap-2 items-center justify-center flex-1  cursor-pointer text-blue-500 font-medium hover:bg-neutral-200"
            >
              <button>완료로 수정하기</button>
            </form>
          )}
          <form
            action={() => deletePost(id, category)}
            className="bg-white p-2 rounded-md w-full flex gap-2 items-center justify-center flex-1 cursor-pointer text-red-500 font-medium hover:bg-neutral-200"
          >
            <button>글 삭제하기</button>
          </form>
          <ModalCancelButton
            cancelBottomActionSheet={cancelBottomActionSheet}
          />
        </nav>
      </div>
    </ModalOverlay>
  );
}
