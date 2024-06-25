"use server";

import { KEY_HOME_LIST, TAG_HOME_LIST } from "@/constants/cache";
import prismaDB from "@/database/db";
import { getSession } from "@/session/getSession";
import { unstable_cache } from "next/cache";

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
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return temporaryProtections;
}

export const getCachedInitTemporaryProtections = unstable_cache(
  getInitTemporaryProtections,
  [KEY_HOME_LIST],
  {
    tags: [TAG_HOME_LIST],
  }
);

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
    skip: 10 * page,
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return temporaryProtections;
}

export async function getInitMyTemporaryProtections() {
  const session = await getSession();
  const loginUserId = session.id!;
  const temporaryProtections = await prismaDB.temporaryProtection.findMany({
    where: {
      userId: loginUserId,
    },
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
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return temporaryProtections;
}

export async function getMoreMyTemporaryProtections(page: number) {
  const session = await getSession();
  const loginUserId = session.id!;
  const temporaryProtections = await prismaDB.temporaryProtection.findMany({
    where: {
      userId: loginUserId,
    },
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
    skip: 10 * page,
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return temporaryProtections;
}
