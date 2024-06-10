"use server";

import prismaDB from "@/database/db";

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
