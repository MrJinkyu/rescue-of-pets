import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import ModalOverlay from "../common/modal-overlay";

interface BottomActionSheetProps {
  cancelBottomActionSheet: () => void;
}

export default function BottomActionSheet({
  cancelBottomActionSheet,
}: BottomActionSheetProps) {
  return (
    <ModalOverlay cancelBottomActionSheet={cancelBottomActionSheet}>
      <div className="fixed right-0 left-0 mx-auto bottom-0 max-w-screen-sm bg-white animate-fadeInUp">
        <nav className="flex flex-col items-center p-4 gap-4">
          <div className="flex items-center text-neutral-400 text-sm">
            작업을 선택하세요
          </div>
          <Link
            href="/"
            className="flex gap-2 items-center justify-center flex-1  cursor-pointer text-black font-semibold"
          >
            <PencilIcon className="size-4" />
            <span>글 수정하기</span>
          </Link>
          <button className="flex gap-2 items-center justify-center flex-1 cursor-pointer text-black font-semibold">
            <TrashIcon className="size-4" />
            <span>글 지우기</span>
          </button>
          <div
            onClick={cancelBottomActionSheet}
            className="cursor-pointer text-neutral-600 font-semibold"
          >
            취소
          </div>
        </nav>
      </div>
    </ModalOverlay>
  );
}
