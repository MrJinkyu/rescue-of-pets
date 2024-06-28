import React from "react";
import { useFormStatus } from "react-dom";
import LoadingSpinner from "../common/loading-spinner";

export default function EditSaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`w-full my-6 h-12 bg-mainColor flex items-center justify-center gap-1 rounded-sm text-white font-semibold text-lg active:opacity-80 ${
        pending ? "bg-mainColor/40 cursor-wait" : ""
      }`}
    >
      {pending && <LoadingSpinner size="sm" />}
      <span>{pending ? "저장중.." : "저장하기"}</span>
    </button>
  );
}
