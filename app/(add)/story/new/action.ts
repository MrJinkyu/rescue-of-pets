"use server";

import prismaDB from "@/database/db";
import { getSession } from "@/session/getSession";
import { redirect } from "next/navigation";
import { z } from "zod";

const dataSchema = z.object({
  title: z
    .string({ required_error: "제목은 필수 항목입니다" })
    .min(1, "제목은 최소 1자 이상입니다"),
  contents: z
    .string({ required_error: "내용은 필수 항목입니다" })
    .min(1, "내용은 최소 1자 이상입니다"),
});

export async function addStory(data: any) {
  const user = await getSession();
  const story = prismaDB.story.create({
    data: {
      ...data,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
    select: {
      id: true,
    },
  });
  return story;
}

export async function createStory(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    contents: formData.get("contents"),
    category: formData.get("category"),
    area: formData.get("area"),
    species: formData.get("species"),
  };

  if (data.photo instanceof File) {
    const url = await uploadImage(data.photo);
    data.photo = url;
  }

  if (data.photo === "") {
    data.photo = null;
  }

  const results = dataSchema.safeParse(data);
  if (!results.success) {
    return results.error.flatten();
  } else {
    const res = await addStory(data);
    redirect(`/story/${res.id}`);
  }
}

export async function uploadImage(file: File) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", process.env.CLOUDINARY_PRESET!);

  return fetch(process.env.CLOUDINARY_URL!, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}
