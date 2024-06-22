"use client";
import { UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import InputText from "../common/input-text";
import SubmitButton from "../common/submit-button";

interface EditProfileFormProps {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
}

export default function EditProfileForm({
  username,
  avatar,
  email,
}: EditProfileFormProps) {
  const [preview, setPreview] = useState(avatar ?? "");
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (!files || !files[0]) {
      return;
    }
    const url = URL.createObjectURL(files[0]);
    setPreview(url);
  };
  return (
    <form className="flex flex-col gap-6 p-6">
      <div className="text-center mx-auto">
        <input
          type="file"
          name="photo"
          id="file"
          className="hidden"
          onChange={onImageChange}
          accept="image/*"
        />
        <label
          htmlFor="file"
          className="cursor-pointer flex flex-col justify-end items-center size-32 rounded-full bg-neutral-50/50 ring-neutral-300 ring-1 active:ring-mainColor active:bg-sky-50/50 bg-center bg-cover"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {!preview && (
            <>
              <UserIcon className="size-24 text-neutral-400" />
            </>
          )}
        </label>
      </div>
      <InputText name="닉네임" title="닉네임" placeholder={username} isColumn />
      <InputText
        name="이메일"
        title="이메일"
        placeholder={email}
        isColumn
        isReadonly
      />
      <button className="w-full my-6 h-12 bg-mainColor rounded-sm text-white font-semibold text-lg active:opacity-80">
        저장하기
      </button>
      <div className="fixed bottom-6 left-0 right-0 mx-auto w-full max-w-screen-sm pr-6 flex items-center justify-end *:text-neutral-500">
        <button type="button">로그아웃</button>
        <span className="mx-4">|</span>
        <button type="button">회원탈퇴</button>
      </div>
    </form>
  );
}
