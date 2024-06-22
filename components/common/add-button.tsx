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
      className="size-14 bg-blue-500 fixed bottom-24 right-6 text-white flex items-center justify-center rounded-full z-10 md:right-1/4 lg:right-1/3"
    >
      <PencilIcon className="size-8" />
    </Link>
  );
}
