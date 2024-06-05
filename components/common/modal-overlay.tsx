"use client";

import React from "react";

interface ModalOverlayProps {
  cancelBottomActionSheet: () => void;
  children: React.ReactNode;
}

export default function ModalOverlay({
  cancelBottomActionSheet,
  children,
}: ModalOverlayProps) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      cancelBottomActionSheet();
    }
  };
  return (
    <div
      onClick={handleClick}
      className="fixed right-0 left-0 mx-auto bottom-0 max-w-screen-sm h-full bg-black/50 z-30"
    >
      {children}
    </div>
  );
}
