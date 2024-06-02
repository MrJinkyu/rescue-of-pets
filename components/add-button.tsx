import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function AddButton({ link }: { link: string }) {
  return (
    <Link
      href={link}
      className="fixed bottom-24 right-6 flex items-center justify-center gap-1 bg-blue-500 rounded-3xl text-white p-2 cursor-pointer z-10 md:right-[20%] xl:right-[35%]"
    >
      <PlusIcon className="size-5" />
      <span className="font-semibold">글쓰기</span>
    </Link>
  );
}
