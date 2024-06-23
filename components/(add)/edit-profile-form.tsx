"use client";

import { UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import InputText from "../common/input-text";
import { useFormState } from "react-dom";
import { editProfile } from "@/app/(add)/profile-edit/action";
import LogoutButton from "../(mypage)/logout-button";

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
  const [state, dispatch] = useFormState(editProfile, null);
  return (
    <form action={dispatch} className="flex flex-col gap-6 p-6">
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
          className="cursor-pointer flex flex-col justify-end items-center size-24 rounded-full bg-neutral-50/50 ring-neutral-300 ring-1 active:ring-mainColor active:bg-sky-50/50 bg-center bg-cover"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {!preview && (
            <>
              <UserIcon className="size-16 text-neutral-400" />
            </>
          )}
        </label>
      </div>
      <InputText
        name="username"
        title="닉네임"
        defaultValue={username}
        required
        isColumn
        errors={state?.fieldErrors.username}
      />
      <InputText
        name="email"
        title="이메일"
        placeholder={email}
        isColumn
        isReadonly
      />
      <button className="w-full my-6 h-12 bg-mainColor rounded-sm text-white font-semibold text-lg active:opacity-80">
        저장하기
      </button>
    </form>
  );
}
