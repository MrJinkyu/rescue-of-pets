"use client";

import { useFormStatus } from "react-dom";

interface AuthButtonProps {
  text: string;
}

export default function AuthButton({ text }: AuthButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`border-none outline-none flex-1 mt-4 bg-blue-500 text-white font-semibold p-3 rounded-md ${
        pending ? "opacity-80" : ""
      }`}
    >
      {pending ? "로딩중" : text}
    </button>
  );
}
