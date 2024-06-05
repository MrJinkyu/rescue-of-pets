"use server";

import prismaDB from "@/database/db";
import { redirect } from "next/navigation";

export async function getTemporaryProtection(id: number) {
  const temporaryProtections = await prismaDB.temporaryProtection.findUnique({
    where: {
      id,
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
