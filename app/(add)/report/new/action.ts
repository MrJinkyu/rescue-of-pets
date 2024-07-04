"use server";

import { TAG_REPORT_LIST } from "@/constants/cache";
import prismaDB from "@/database/db";
import { getSession } from "@/session/getSession";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const dataSchema = z.object({
  photo: z.string({
    required_error: "사진은 필수 항목입니다",
  }),
  name: z
    .string({ required_error: "이름은 필수 항목입니다" })
    .min(1, "이름은 최소 1자 이상입니다")
    .max(25, "이름은 최대 20자 이하로 간결하게 작성해주세요"),
  color: z
    .string({ required_error: "털색은 필수 항목입니다" })
    .min(1, "털색은 최소 1자 이상입니다")
    .max(25, "털색은 최대 20자 이하로 간결하게 작성해주세요"),
  characteristics: z
    .string({ required_error: "특징은 필수 항목입니다" })
    .min(1, "특징은 최소 1자 이상입니다")
    .max(25, "특징은 최대 25자 이하로 간결하게 작성해주세요"),
  missingPlace: z
    .string({ required_error: "실종 장소는 필수 항목입니다" })
    .min(1, "실종 장소는 최소 1자 이상입니다")
    .max(25, "실종 장소는 최대 25자 이하로 간결하게 작성해주세요"),
});

export async function addReport(data: any) {
  const user = await getSession();
  const report = prismaDB.report.create({
    data: {
      ...data,
      isActive: true,
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
  revalidateTag(TAG_REPORT_LIST);
  return report;
}

export async function createReport(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    species: formData.get("species"),
    detail: formData.get("detail"),
    gender: formData.get("gender"),
    age: formData.get("age"),
    weight: formData.get("weight"),
    area: formData.get("area"),
    name: formData.get("name"),
    color: formData.get("color"),
    characteristics: formData.get("characteristics"),
    missingPlace: formData.get("missingPlace"),
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
    const res = await addReport(data);
    redirect(`/report/${res.id}`);
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
