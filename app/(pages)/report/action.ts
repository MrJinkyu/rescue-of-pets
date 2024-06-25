"use server";

import { KEY_REPORT_LIST, TAG_REPORT_LIST } from "@/constants/cache";
import prismaDB from "@/database/db";
import { getSession } from "@/session/getSession";
import { unstable_cache } from "next/cache";

export async function getInitReports() {
  const reports = await prismaDB.report.findMany({
    select: {
      id: true,
      createdAt: true,
      isActive: true,
      gender: true,
      species: true,
      detail: true,
      missingPlace: true,
      age: true,
      name: true,
      weight: true,
      color: true,
      photo: true,
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return reports;
}

export const getCachedInitReports = unstable_cache(
  getInitReports,
  [KEY_REPORT_LIST],
  {
    tags: [TAG_REPORT_LIST],
  }
);

export async function getMoreReports(page: number) {
  const reports = await prismaDB.report.findMany({
    select: {
      id: true,
      createdAt: true,
      isActive: true,
      gender: true,
      species: true,
      detail: true,
      missingPlace: true,
      age: true,
      name: true,
      weight: true,
      color: true,
      photo: true,
    },
    skip: 10 * page,
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return reports;
}

export async function getInitMyReports() {
  const session = await getSession();
  const loginUserId = session.id!;
  const reports = await prismaDB.report.findMany({
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
      missingPlace: true,
      age: true,
      name: true,
      weight: true,
      color: true,
      photo: true,
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return reports;
}

export async function getMoreMyReports(page: number) {
  const session = await getSession();
  const loginUserId = session.id!;
  const reports = await prismaDB.report.findMany({
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
      missingPlace: true,
      age: true,
      name: true,
      weight: true,
      color: true,
      photo: true,
    },
    skip: 10 * page,
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return reports;
}
