"use server";

import prismaDB from "@/database/db";

export async function getInitTemporaryProtections() {
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
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
  return temporaryProtections;
}

export async function getMoreTemporaryProtections(page: number) {
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
    skip: 5 * page,
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
  return temporaryProtections;
}
