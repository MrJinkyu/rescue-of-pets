"use server";

import prismaDB from "@/database/db";
import { getSession } from "@/session/getSession";
import { uploadImage } from "../report/new/action";
import { redirect } from "next/navigation";
import { z } from "zod";

const dataSchema = z.object({
  username: z
    .string({ required_error: "닉네임은 필수 항목입니다" })
    .min(1, "닉네임은 최소 1자 이상입니다")
    .max(15, "닉네임은 최대 15자 이하입니다"),
});

export async function editAvatarAndUsername(userInfo: any) {
  const session = await getSession();
  await prismaDB.user.update({
    where: {
      id: session.id!,
    },
    data: {
      username: userInfo.username,
      avatar: userInfo.photo,
    },
    select: {
      id: true,
    },
  });
}

export async function editOnlyUsername(userInfo: any) {
  const session = await getSession();
  await prismaDB.user.update({
    where: {
      id: session.id!,
    },
    data: {
      username: userInfo.username,
    },
    select: {
      id: true,
    },
  });
}

function isValidFile(file: File) {
  return file && file.size > 0 && file.name !== "undefined";
}

export async function editProfile(_: any, formData: FormData) {
  console.log("편집 실행됌");
  const data = {
    username: formData.get("username"),
    photo: formData.get("photo"),
  };

  if (data.photo instanceof File) {
    if (isValidFile(data.photo)) {
      const url = await uploadImage(data.photo);
      data.photo = url;
    } else {
      data.photo = null;
    }
  }
  const results = dataSchema.safeParse(data);
  if (!results.success) {
    return results.error.flatten();
  } else {
    if (data.photo) {
      await editAvatarAndUsername(data);
    } else {
      await editOnlyUsername(data);
    }
    redirect("/mypage");
  }
}

export async function deleteUser() {
  const session = await getSession();
  const userId = session.id!;
  await prismaDB.user.delete({
    where: {
      id: userId,
    },
  });
  redirect("/login");
}
