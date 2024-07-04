"use client";

import { useFormStatus } from "react-dom";
import LoadingSpinner from "../common/loading-spinner";

interface AuthButtonProps {
  text: string;
}

export default function AuthButton({ text }: AuthButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`border-none outline-none flex-1 mt-4 flex items-center justify-center gap-1 bg-blue-500 text-white font-semibold p-3 rounded-md ${
        pending ? "bg-mainColor/40 cursor-wait" : ""
      }`}
    >
      {pending && <LoadingSpinner size="sm" />}
      <span>{pending ? "로딩중.." : text}</span>
    </button>
  );
}
