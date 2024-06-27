import Image from "next/image";
import { ChevronRightIcon, UserIcon } from "@heroicons/react/24/solid";
import { getSession } from "@/session/getSession";
import Link from "next/link";
import { getCachedUserInfo } from "./action";

export const metadata = {
  title: "마이메뉴",
};

export default async function MyPage() {
  const session = await getSession();
  const loginUserId = session.id!;
  const userInfo = await getCachedUserInfo(loginUserId);
  return (
    <section className="flex flex-col">
      <article className="bg-neutral-50 aspect-video flex flex-col justify-center items-center gap-4">
        {userInfo?.avatar ? (
          <div className="bg-neutral-300 rounded-full flex justify-center items-center size-24 overflow-hidden">
            <Image
              src={userInfo.avatar}
              alt={userInfo.username}
              width={96}
              height={96}
            />
          </div>
        ) : (
          <div className="bg-neutral-300 rounded-full flex justify-center items-end size-24">
            <UserIcon className="size-16 text-white" />
          </div>
        )}
        <div className="w-full flex justify-between items-center px-6 gap-2 md:flex-col">
          <div className="flex flex-col w-2/3 md:w-full md:items-center md:pb-4">
            <p className="font-semibold overflow-hidden whitespace-nowrap truncate">
              {userInfo?.username}
            </p>
            <p className="text-neutral-500 text-sm overflow-hidden whitespace-nowrap truncate">
              {userInfo?.email}
            </p>
          </div>
          <Link
            href="/profile-edit"
            className="w-1/3 flex-shrink-0 text-center font-semibold px-4 py-2 border border-neutral-400 rounded-md"
          >
            프로필 편집
          </Link>
        </div>
      </article>
      <article className="px-6 pt-10 md:px-12">
        <div className="text-center pb-2 font-semibold text-neutral-400">
          내 게시물
        </div>
        <div className="pb-4  flex flex-col gap-2 *:border-b cursor-pointer">
          <Link
            href="/mypage/temporary-protection"
            className="flex items-center justify-between py-2"
          >
            <span>임시보호</span>
            <ChevronRightIcon className="size-6" />
          </Link>
          <Link
            href="/mypage/report"
            className="flex items-center justify-between py-2"
          >
            <span>실종신고</span>
            <ChevronRightIcon className="size-6" />
          </Link>
          <Link
            href="/mypage/story"
            className="flex items-center justify-between py-2"
          >
            <span>스토리</span>
            <ChevronRightIcon className="size-6" />
          </Link>
        </div>
      </article>
    </section>
  );
}
