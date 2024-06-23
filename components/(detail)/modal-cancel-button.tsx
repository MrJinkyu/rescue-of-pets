"use client";

interface ModalCancelButtonProps {
  cancelBottomActionSheet: () => void;
}
export default function ModalCancelButton({
  cancelBottomActionSheet,
}: ModalCancelButtonProps) {
  return (
    <div
      onClick={cancelBottomActionSheet}
      className="w-full flex justify-center items-center bg-white p-2 rounded-md cursor-pointer text-neutral-600 font-medium hover:bg-neutral-200"
    >
      취소
    </div>
  );
}
