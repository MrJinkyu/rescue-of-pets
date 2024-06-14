import { PencilIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface AddButtonProps {
  category: "temporary-protection" | "report" | "story";
}

export default function AddButton({ category }: AddButtonProps) {
  return (
    <Link
      href={`/${category}/new`}
      className="size-14 bg-blue-500 fixed bottom-24 right-6 text-white flex items-center justify-center rounded-full md:right-1/4 z-10"
    >
      <PencilIcon className="size-8" />
    </Link>
  );
}
