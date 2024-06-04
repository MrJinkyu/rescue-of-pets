import AddTopBar from "@/components/common/add-top-bar";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <section className=" flex flex-col items-center justify-center w-full h-screen">
      <AddTopBar title="로그인" />
      <main className="flex flex-col items-center gap-8 w-full">
        <div className="flex flex-col gap-2 items-center text-black">
          <p className="font-semibold text-3xl">Login Account</p>
          <p className="text-md text-neutral-400">please enter your details</p>
        </div>
        <form className="flex flex-col gap-4 w-3/4">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold">
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요"
              className="border-none outline-none flex-1 ring-neutral-400 ring-2 rounded-sm p-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="border-none outline-none flex-1 ring-neutral-400 ring-2 rounded-sm p-2  focus:ring-blue-500"
            />
          </div>
          <button className="border-none outline-none flex-1 mt-4 bg-blue-500 text-white font-semibold p-3 rounded-md">
            로그인
          </button>
        </form>
        <div className="flex items-center">
          <span className="mr-2">아직 계정이 없으신가요?</span>
          <Link
            href="create-account"
            className="underline font-semibold text-md text-blue-500"
          >
            회원가입
          </Link>
        </div>
        <div className="bg-neutral-600 w-3/4 h-0.5" />
        <div className="border-blue-500 border-2 w-3/4 text-center text-blue-500 font-semibold rounded-md p-3">
          간편 SMS 로그인
        </div>
      </main>
    </section>
  );
}
