"use server";

import prismaDB from "@/database/db";

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
