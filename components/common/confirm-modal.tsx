"use client";
import React from "react";
import ModalOverlay from "./modal-overlay";

interface ConfirmModalProps {
  text: string;
  yes: string;
  no: string;
  confirmOnClick: () => void;
  closeConfirmModal: () => void;
}

export default function ConfirmModal({
  text,
  yes,
  no,
  confirmOnClick,
  closeConfirmModal,
}: ConfirmModalProps) {
  return (
    <ModalOverlay cancelBottomActionSheet={closeConfirmModal}>
      <article className="fixed right-0 left-0 mx-auto bottom-1/2 translate-y-1/2 w-72 bg-neutral-100 z-30 rounded-md">
        <div className="flex flex-col px-4 py-6 gap-6">
          <div className="text-black">{text}</div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={closeConfirmModal}
              className="bg-neutral-300 rounded-md text-black flex justify-center items-center flex-grow py-2"
            >
              {no}
            </button>
            <button
              onClick={confirmOnClick}
              className="bg-red-500 rounded-md text-white flex justify-center items-center flex-grow py-2"
            >
              {yes}
            </button>
          </div>
        </div>
      </article>
    </ModalOverlay>
  );
}
