"use server";

import prismaDB from "@/database/db";
import { getSession } from "@/session/getSession";
import { uploadImage } from "../report/new/action";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { TAG_PAGE_LIST, TAG_USER_INFO } from "@/constants/cache";

const dataSchema = z.object({
  username: z
    .string({ required_error: "닉네임은 필수 항목입니다" })
    .min(1, "닉네임은 최소 1자 이상입니다")
    .max(15, "닉네임은 최대 15자 이하입니다"),
});

export async function editAvatarAndUsername(userInfo: any) {
  const session = await getSession();
  const id = session.id!;
  const currentUser = await prismaDB.user.findUnique({
    where: { id },
    select: { username: true },
  });
  if (currentUser?.username !== userInfo.username) {
    const existingUser = await prismaDB.user.findFirst({
      where: {
        username: userInfo.username,
        NOT: { id },
      },
    });
    if (existingUser) {
      return false;
    }
  }
  await prismaDB.user.update({
    where: {
      id,
    },
    data: {
      username: userInfo.username,
      avatar: userInfo.photo,
    },
    select: {
      id: true,
    },
  });
  revalidateTag(TAG_PAGE_LIST);
  revalidateTag(`${TAG_USER_INFO}-${id}`);
  return true;
}

export async function editOnlyUsername(userInfo: any) {
  const session = await getSession();
  const id = session.id!;
  const currentUser = await prismaDB.user.findUnique({
    where: { id },
    select: { username: true },
  });
  if (currentUser?.username !== userInfo.username) {
    const existingUser = await prismaDB.user.findFirst({
      where: {
        username: userInfo.username,
        NOT: { id },
      },
    });
    if (existingUser) {
      return false;
    }
  }
  await prismaDB.user.update({
    where: {
      id,
    },
    data: {
      username: userInfo.username,
    },
    select: {
      id: true,
    },
  });
  revalidateTag(TAG_PAGE_LIST);
  revalidateTag(`${TAG_USER_INFO}-${id}`);
  return true;
}

export async function deleteUser(id: number) {
  await prismaDB.user.delete({
    where: {
      id,
    },
  });
  revalidateTag(TAG_PAGE_LIST);
  revalidateTag(`${TAG_USER_INFO}-${id}`);
  redirect("/login");
}

function isValidFile(file: File) {
  return file && file.size > 0 && file.name !== "undefined";
}

export async function editProfile(_: any, formData: FormData) {
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
      const success = await editAvatarAndUsername(data);
      if (!success) {
        return {
          fieldErrors: {
            username: ["이미 사용하고 있는 닉네임입니다"],
          },
        };
      }
    } else {
      const success = await editOnlyUsername(data);
      if (!success) {
        return {
          fieldErrors: {
            username: ["이미 사용하고 있는 닉네임입니다"],
          },
        };
      }
    }
    redirect("/mypage");
  }
}
