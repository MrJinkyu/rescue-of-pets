"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function AddTopBar({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="fixed top-0 w-full max-w-screen-sm mx-auto flex items-center justify-between px-5 py-3 z-20 border-neutral-200 border-b bg-white">
      <ChevronLeftIcon
        onClick={() => router.back()}
        className="size-6 cursor-pointer"
      />
      <h1 className="font-semibold text-lg text-black">{title}</h1>
      <div className="size-6"></div>
    </div>
  );
}
