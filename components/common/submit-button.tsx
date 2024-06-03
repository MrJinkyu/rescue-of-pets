"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text: string;
}

export default function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-screen-sm bg-mainColor text-white font-semibold text-lg py-3 active:opacity-80"
    >
      {text}
    </button>
  );
}
