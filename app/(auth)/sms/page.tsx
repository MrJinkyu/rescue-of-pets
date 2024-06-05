"use client";

import AuthButton from "@/components/(auth)/auth-button";
import Input from "@/components/(auth)/input";
import Line from "@/components/(auth)/line";
import SmsButton from "@/components/(auth)/sms-button";
import AddTopBar from "@/components/common/add-top-bar";
import Link from "next/link";

export default function SmsLogin() {
  return (
    <section className=" flex flex-col items-center justify-center w-full h-screen">
      <AddTopBar title="로그인" />
      <main className="flex flex-col items-center gap-8 w-full">
        <div className="flex flex-col gap-2 items-center text-black">
          <p className="font-semibold text-3xl">SMS Login</p>
          <p className="text-md text-neutral-400">please enter your details</p>
        </div>
        <form className="flex flex-col gap-4 w-3/4">
          <div className="w-full flex flex-col gap-2">
            <div className="font-semibold">휴대폰 번호</div>
            <div className="flex items-center gap-2">
              <input
                name="phone"
                type="text"
                placeholder="휴대폰 번호를 입력해주세요 ('-'제외)"
                required
                className="border-none outline-none flex-1 ring-2 rounded-sm p-2 focus:ring-blue-500 ${
         ring-neutral-400
        "
              />
              <button className="flex items-center text-blue-500 rounded-sm h-[42px] border-2 border-blue-500 p-2 font-semibold">
                인증 요청
              </button>
            </div>
            <div className="text-red-500"></div>
          </div>
          <Input
            label="인증번호"
            name="token"
            type="text"
            placeholder="인증번호를 입력해주세요"
            required
          />
          <AuthButton text="완료" />
        </form>
      </main>
    </section>
  );
}
