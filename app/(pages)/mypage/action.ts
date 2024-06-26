"use server";

import { KEY_USER_INFO, TAG_USER_INFO } from "@/constants/cache";
import prismaDB from "@/database/db";
import { unstable_cache } from "next/cache";

export async function getUserInfo(id: number) {
  const user = await prismaDB.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      avatar: true,
      username: true,
      email: true,
    },
  });
  return user;
}

export async function getCachedUserInfo(id: number) {
  const cacheOperation = unstable_cache(
    getUserInfo,
    [`${KEY_USER_INFO}-${id}`],
    {
      tags: [`${TAG_USER_INFO}-${id}`],
    }
  );
  return cacheOperation(id);
}
