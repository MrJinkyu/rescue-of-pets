"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <ChevronLeftIcon
      onClick={() => router.back()}
      className="size-6 cursor-pointer"
    />
  );
}
