import Image from "next/image";
import { ChevronRightIcon, UserIcon } from "@heroicons/react/24/solid";

export default function Profile() {
  const avatar = null;
  const username = "";
  return (
    <section className="flex flex-col">
      <article className="bg-neutral-50 aspect-video flex flex-col justify-center items-center gap-4">
        {avatar ? (
          <div className="bg-neutral-300 rounded-full flex justify-center items-center size-24 overflow-hidden">
            <Image src={avatar} alt={username} width={96} height={96} />
          </div>
        ) : (
          <div className="bg-neutral-300 rounded-full flex justify-center items-end size-24">
            <UserIcon className="size-16 text-white" />
          </div>
        )}
        <div className="w-full flex justify-between items-center px-6 gap-2 md:flex-col">
          <div className="flex flex-col w-2/3 md:w-full md:items-center md:pb-4">
            <p className="font-semibold overflow-hidden whitespace-nowrap truncate">
              성남뭉치아빠김돌이
            </p>
            <p className="text-neutral-500 text-sm overflow-hidden whitespace-nowrap truncate">
              rlawlsrb16736@gmail.com
            </p>
          </div>
          <button className="w-1/3 flex-shrink-0 font-semibold px-4 py-2 border border-neutral-500 rounded-md">
            프로필 편집
          </button>
        </div>
      </article>
      <article className="px-6 pt-10 md:px-12">
        <div className="text-center pb-2 font-semibold text-neutral-400">
          마이메뉴
        </div>
        <ul className="pb-4  flex flex-col gap-2 *:border-b cursor-pointer">
          <li className="flex items-center justify-between py-2">
            <span>임시보호</span>
            <ChevronRightIcon className="size-6" />
          </li>
          <li className="flex items-center justify-between py-2">
            <span>실종신고</span>
            <ChevronRightIcon className="size-6" />
          </li>
          <li className="flex items-center justify-between py-2">
            <span>스토리</span>
            <ChevronRightIcon className="size-6" />
          </li>
        </ul>
      </article>
    </section>
  );
}
