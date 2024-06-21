"use client";

import { createChatRoom } from "@/app/(detail)/chat/[id]/action";
import { useFormStatus } from "react-dom";

interface ChatButtonProps {
  text: string;
  writerId: number;
}

export default function ChatButton({ text, writerId }: ChatButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      onClick={() => createChatRoom(writerId)}
      disabled={pending}
      className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-screen-sm bg-mainColor text-white font-semibold text-lg py-3 active:opacity-80"
    >
      {text}
    </button>
  );
}
