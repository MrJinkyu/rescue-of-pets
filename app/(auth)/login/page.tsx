"use client";

import AuthButton from "@/components/(auth)/auth-button";
import Input from "@/components/(auth)/input";
import AddTopBar from "@/components/common/add-top-bar";
import Link from "next/link";
import { useFormState } from "react-dom";
import { loginUser } from "./action";

export default function Login() {
  const [state, dispatch] = useFormState(loginUser, null);
  return (
    <section className=" flex flex-col items-center justify-center w-full h-screen">
      <AddTopBar title="로그인" isAuth />
      <main className="flex flex-col items-center gap-8 w-full">
        <div className="flex flex-col gap-2 items-center text-black">
          <p className="font-semibold text-3xl text-mainColor">Meet Again</p>
          <p className="text-md text-neutral-400">
            당신을 기다리고 있는 반려동물들
          </p>
        </div>
        <form action={dispatch} className="flex flex-col gap-4 w-3/4">
          <Input
            label="이메일"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            errors={state?.fieldErrors.email}
            required
          />
          <Input
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            errors={state?.fieldErrors.password}
            required
          />
          <AuthButton text="로그인" />
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
      </main>
    </section>
  );
}
