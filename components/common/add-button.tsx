import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface AddButtonProps {
  category: "temporary-protection" | "report" | "story";
}

export default function AddButton({ category }: AddButtonProps) {
  return (
    <Link
      href={`/${category}/new`}
      className="bg-blue-500 fixed bottom-24 right-6 text-white flex items-center gap-1 px-4 py-2 rounded-full md:right-1/4 z-10"
    >
      <PlusIcon className="size-5" />
      <span className="font-semibold">글쓰기</span>
    </Link>
  );
}
