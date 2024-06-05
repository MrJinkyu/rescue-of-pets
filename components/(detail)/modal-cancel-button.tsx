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
      className="cursor-pointer text-neutral-600 font-semibold"
    >
      취소
    </div>
  );
}
