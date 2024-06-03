"use client";

import {
  HomeIcon as OutlineHomeIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatBubbleOvalLeftEllipsisIcon,
  MegaphoneIcon as OutlineMegaphoneIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as SolidHomeIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatBubbleOvalLeftEllipsisIcon,
  MegaphoneIcon as SolidMegaphoneIcon,
  NewspaperIcon as SolidNewspaperIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full max-w-screen-sm mx-auto grid grid-cols-5 py-3 border-neutral-200 border-t z-20 bg-white">
      <Link href="/" className="flex flex-col items-center">
        {pathname === "/" ? (
          <SolidHomeIcon className="size-7 text-mainColor" />
        ) : (
          <OutlineHomeIcon className="size-7 text-neutral-500" />
        )}
        <span
          className={`text-sm ${
            pathname === "/" ? "text-mainColor" : "text-neutral-500"
          }`}
        >
          임시보호
        </span>
      </Link>
      <Link href="report" className="flex flex-col items-center">
        {pathname === "/report" ? (
          <SolidMegaphoneIcon className="size-7 text-mainColor" />
        ) : (
          <OutlineMegaphoneIcon className="size-7 text-neutral-500" />
        )}
        <span
          className={`text-sm ${
            pathname === "/report" ? "text-mainColor" : "text-neutral-500"
          }`}
        >
          실종/제보
        </span>
      </Link>
      <Link href="/story" className="flex flex-col items-center">
        {pathname === "/story" ? (
          <SolidNewspaperIcon className="size-7 text-mainColor" />
        ) : (
          <OutlineNewspaperIcon className="size-7 text-neutral-500" />
        )}
        <span
          className={`text-sm ${
            pathname === "/story" ? "text-mainColor" : "text-neutral-500"
          }`}
        >
          스토리
        </span>
      </Link>
      <Link href="/chat" className="flex flex-col items-center">
        {pathname === "/chat" ? (
          <SolidChatBubbleOvalLeftEllipsisIcon className="size-7 text-mainColor" />
        ) : (
          <OutlineChatBubbleOvalLeftEllipsisIcon className="size-7 text-neutral-500" />
        )}
        <span
          className={`text-sm ${
            pathname === "/chat" ? "text-mainColor" : "text-neutral-500"
          }`}
        >
          채팅
        </span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center">
        {pathname === "/profile" ? (
          <SolidUserIcon className="size-7 text-mainColor" />
        ) : (
          <OutlineUserIcon className="size-7 text-neutral-500" />
        )}
        <span
          className={`text-sm ${
            pathname === "/profile" ? "text-mainColor" : "text-neutral-500"
          }`}
        >
          마이메뉴
        </span>
      </Link>
    </div>
  );
}
