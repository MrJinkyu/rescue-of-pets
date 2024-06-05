"use client";

import { PencilIcon } from "@heroicons/react/24/solid";
import ModalOverlay from "../common/modal-overlay";
import ModalCancelButton from "./modal-cancel-button";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteTemporaryProtection } from "@/app/(detail)/temporary-protection/[id]/action";

interface BottomActionSheetProps {
  id: number;
  cancelBottomActionSheet: () => void;
}

export default function BottomActionSheet({
  id,
  cancelBottomActionSheet,
}: BottomActionSheetProps) {
  return (
    <ModalOverlay cancelBottomActionSheet={cancelBottomActionSheet}>
      <div className="fixed right-0 left-0 mx-auto bottom-0 max-w-screen-sm bg-white animate-fadeInUp">
        <nav className="flex flex-col items-center p-4 gap-4">
          <div className="flex items-center text-neutral-400 text-sm">
            작업을 선택하세요
          </div>
          <div className="flex gap-2 items-center justify-center flex-1  cursor-pointer text-black font-semibold">
            <PencilIcon className="size-4" />
            <span>글 수정하기</span>
          </div>
          <form
            action={() => deleteTemporaryProtection(id)}
            className="flex gap-2 items-center justify-center flex-1 cursor-pointer text-black font-semibold"
          >
            <TrashIcon className="size-4" />
            <button>글 지우기</button>
          </form>
          <ModalCancelButton
            cancelBottomActionSheet={cancelBottomActionSheet}
          />
        </nav>
      </div>
    </ModalOverlay>
  );
}
