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
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
  return reports;
}
