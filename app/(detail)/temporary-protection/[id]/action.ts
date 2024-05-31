"use server";

import prismaDB from "@/database/db";

export async function getTemporaryProtection(id: number) {
  const temporaryProtections = await prismaDB.temporaryProtection.findUnique({
    where: {
      id,
    },
  });
  return temporaryProtections;
}
