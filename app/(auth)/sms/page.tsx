"use client";

import AuthButton from "@/components/(auth)/auth-button";
import Input from "@/components/(auth)/input";
import AddTopBar from "@/components/common/add-top-bar";
import { useFormState } from "react-dom";
import { smsLogin } from "./action";

const initialState = {
  token: false,
  error: undefined,
};

export default function SmsLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);
  return (
    <section className=" flex flex-col items-center justify-center w-full h-screen">
      <AddTopBar title="로그인" />
      <main className="flex flex-col items-center gap-8 w-full">
        <div className="flex flex-col gap-2 items-center text-black">
          <p className="font-semibold text-3xl">SMS Login</p>
          <p className="text-md text-neutral-400">please enter your details</p>
        </div>
        <form action={dispatch} className="flex flex-col gap-4 w-3/4">
          <div className="w-full flex flex-col gap-2">
            <div className="font-semibold">휴대폰 번호</div>
            <div className="flex items-center gap-2">
              <input
                name="phone"
                type="text"
                placeholder="휴대폰 번호를 입력해주세요 ('-'제외)"
                required
                className="border-none outline-none ring-neutral-400 flex-1 ring-2 rounded-sm p-2 focus:ring-blue-500"
              />
              <button
                className={`flex items-center rounded-sm h-[42px] border-2 p-2 font-semibold  ${
                  state.token
                    ? "border-neutral-400 text-neutral-400"
                    : "border-blue-500 text-blue-500"
                }`}
              >
                {state.token ? "인증 진행" : "인증 요청"}
              </button>
            </div>
            <div className="text-red-500">
              {!state.token ? state.error?.formErrors[0] : ""}
            </div>
          </div>
          {state.token && (
            <>
              <Input
                label="인증번호"
                name="token"
                type="number"
                min={100000}
                max={999999}
                placeholder="인증번호를 입력해주세요"
                errors={state.token ? state.error?.formErrors : []}
                required
              />
              <AuthButton text="완료" />
            </>
          )}
        </form>
      </main>
    </section>
  );
}
