import AuthButton from "@/components/(auth)/auth-button";
import Input from "@/components/(auth)/input";
import Line from "@/components/(auth)/line";
import SmsButton from "@/components/(auth)/sms-button";
import AddTopBar from "@/components/common/add-top-bar";
import Link from "next/link";

export default function CreateAccount() {
  return (
    <section className=" flex flex-col items-center justify-center w-full h-screen">
      <AddTopBar title="회원가입" />
      <main className="flex flex-col items-center gap-8 w-full">
        <div className="flex flex-col gap-2 items-center text-black">
          <p className="font-semibold text-3xl">Create Account</p>
          <p className="text-md text-neutral-400">please enter your details</p>
        </div>
        <form className="flex flex-col gap-4 w-3/4">
          <Input
            label="닉네임"
            name="username"
            type="text"
            placeholder="닉네임을 입력해주세요"
            required
          />
          <Input
            label="이메일"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            required
          />
          <Input
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            required
          />
          <Input
            label="비밀번호 확인"
            name="password_confirm"
            type="password"
            placeholder="비밀번호를 확인해주세요"
            required
          />
          <AuthButton text="회원가입" />
        </form>
        <Line />
        <SmsButton />
      </main>
    </section>
  );
}
