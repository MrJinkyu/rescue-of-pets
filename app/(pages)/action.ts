"use server";

import prismaDB from "@/database/db";

export async function getTemporaryProtections() {
  const temporaryProtections = await prismaDB.temporaryProtection.findMany({
    select: {
      id: true,
      createdAt: true,
      isActive: true,
      gender: true,
      species: true,
      detail: true,
      rescuePlace: true,
      area: true,
      photo: true,
    },
  });
  return temporaryProtections;
}
