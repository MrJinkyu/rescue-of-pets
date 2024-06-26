"use server";

import {
  KEY_REPORT_DETAIL,
  TAG_PAGE_LIST,
  TAG_REPORT_DETAIL,
} from "@/constants/cache";
import prismaDB from "@/database/db";
import { unstable_cache } from "next/cache";

export async function getReport(id: number) {
  const report = await prismaDB.report.findUnique({
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
  return report;
}

export async function getCachedReport(id: number) {
  const cacheOperation = unstable_cache(
    getReport,
    [`${KEY_REPORT_DETAIL}-${id}`],
    {
      tags: [TAG_PAGE_LIST, `${TAG_REPORT_DETAIL}-${id}`],
    }
  );
  return cacheOperation(id);
}
