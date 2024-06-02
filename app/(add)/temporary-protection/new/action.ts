"use server";

import prismaDB from "@/database/db";
import { redirect } from "next/navigation";
import { z } from "zod";

const dataSchema = z.object({
  photo: z.string({
    required_error: "사진은 필수 항목입니다",
  }),
  rescuePlace: z
    .string({ required_error: "구조장소는 필수 항목입니다." })
    .min(1, "구조장소는 필수 항목입니다."),
});

export async function addTemporaryProtection(data: any) {
  const temporaryProtection = prismaDB.temporaryProtection.create({
    data: {
      ...data,
      isActive: true,
      user: {
        connect: {
          id: 1,
        },
      },
    },
    select: {
      id: true,
    },
  });
  return temporaryProtection;
}

export async function createTemporaryProtection(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    gender: formData.get("gender"),
    species: formData.get("species"),
    detail: formData.get("detail"),
    area: formData.get("area"),
    rescuePlace: formData.get("rescuePlace"),
    description: formData.get("description"),
  };

  if (data.photo instanceof File) {
    const url = await uploadImage(data.photo);
    data.photo = url;
  }

  const results = dataSchema.safeParse(data);
  if (!results.success) {
    return results.error.flatten();
  } else {
    const res = await addTemporaryProtection(data);
    redirect(`/temporary-protection/${res.id}`);
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
