"use client";

import { useFormStatus } from "react-dom";
import LoadingSpinner from "./loading-spinner";

interface SubmitButtonProps {
  text: string;
}

export default function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`fixed bottom-0 left-0 right-0 mx-auto w-full max-w-screen-sm flex items-center justify-center gap-1 bg-mainColor text-white font-semibold text-lg py-3 active:opacity-80 ${
        pending ? "bg-mainColor/40 cursor-wait" : ""
      }`}
    >
      {pending && <LoadingSpinner size="sm" />}
      <span>{pending ? "등록중.." : text}</span>
    </button>
  );
}
