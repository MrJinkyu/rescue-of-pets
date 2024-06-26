"use server";

import {
  KEY_HOME_DETAIL,
  TAG_HOME_DETAIL,
  TAG_PAGE_LIST,
} from "@/constants/cache";
import prismaDB from "@/database/db";
import { unstable_cache } from "next/cache";

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

export async function getCachedTemporaryProtection(id: number) {
  const cacheOperation = unstable_cache(
    getTemporaryProtection,
    [`${KEY_HOME_DETAIL}-${id}`],
    {
      tags: [TAG_PAGE_LIST, `${TAG_HOME_DETAIL}-${id}`],
    }
  );
  return cacheOperation(id);
}
