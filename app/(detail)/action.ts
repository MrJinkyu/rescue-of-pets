"use server";

import prismaDB from "@/database/db";
import { redirect } from "next/navigation";

export async function deletePost(id: number, category: string) {
  switch (category) {
    case "temporary-protection":
      await prismaDB.temporaryProtection.delete({
        where: {
          id,
        },
        select: null,
      });
      redirect("/");
    case "report":
      await prismaDB.report.delete({
        where: {
          id,
        },
        select: null,
      });
      redirect("/report");
    case "story":
      await prismaDB.story.delete({
        where: {
          id,
        },
        select: null,
      });
      redirect("/story");
    default:
      break;
  }
}

export async function updatePost(id: number, category: string) {
  switch (category) {
    case "temporary-protection":
      await prismaDB.temporaryProtection.update({
        where: {
          id,
        },
        data: {
          isActive: false,
        },
      });
      redirect("/");
    case "report":
      await prismaDB.report.update({
        where: {
          id,
        },
        data: {
          isActive: false,
        },
      });
      redirect("/report");
    case "story":
      break;
    default:
      break;
  }
}
