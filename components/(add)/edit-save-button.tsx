import React from "react";
import { useFormStatus } from "react-dom";

export default function EditSaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`w-full my-6 h-12 bg-mainColor rounded-sm text-white font-semibold text-lg active:opacity-80 ${
        pending ? "opacity-50 cursor-wait" : ""
      }`}
    >
      {pending ? "저장중..." : "저장하기"}
    </button>
  );
}
