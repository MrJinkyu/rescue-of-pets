"use server";

import prismaDB from "@/database/db";
import { redirect } from "next/navigation";

export async function getTemporaryProtection(id: number) {
  const temporaryProtections = await prismaDB.temporaryProtection.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return temporaryProtections;
}

export async function deleteTemporaryProtection(id: number) {
  await prismaDB.temporaryProtection.delete({
    where: {
      id,
    },
    select: null,
  });
  redirect("/");
}

export async function updateTemporaryProtection(id: number) {
  await prismaDB.temporaryProtection.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
  redirect("/");
}
