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
      try {
        const temporaryProtection =
          await prismaDB.temporaryProtection.findUnique({
            where: {
              id,
            },
            select: {
              isActive: true,
            },
          });
        if (temporaryProtection!.isActive) {
          await prismaDB.temporaryProtection.update({
            where: {
              id,
            },
            data: {
              isActive: false,
            },
          });
        }
      } catch (e) {
      } finally {
        redirect("/");
      }
    case "report":
      try {
        const report = await prismaDB.report.findUnique({
          where: {
            id,
          },
          select: {
            isActive: true,
          },
        });
        if (report?.isActive) {
          await prismaDB.report.update({
            where: {
              id,
            },
            data: {
              isActive: false,
            },
          });
        }
        redirect("/report");
      } catch (e) {
      } finally {
        redirect("/report");
      }
    case "story":
      break;
    default:
      break;
  }
}
