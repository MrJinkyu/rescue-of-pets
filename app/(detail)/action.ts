"use server";

import {
  KEY_STORY_DETAIL,
  TAG_HOME_DETAIL,
  TAG_HOME_LIST,
  TAG_REPORT_DETAIL,
  TAG_REPORT_LIST,
  TAG_STORY_LIST,
} from "@/constants/cache";
import prismaDB from "@/database/db";
import { revalidateTag } from "next/cache";
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
      revalidateTag(TAG_HOME_LIST);
      revalidateTag(`${TAG_HOME_DETAIL}-${id}`);
      redirect("/");
    case "report":
      await prismaDB.report.delete({
        where: {
          id,
        },
        select: null,
      });
      revalidateTag(TAG_REPORT_LIST);
      revalidateTag(`${TAG_REPORT_DETAIL}-${id}`);
      redirect("/report");
    case "story":
      await prismaDB.story.delete({
        where: {
          id,
        },
        select: null,
      });
      revalidateTag(TAG_STORY_LIST);
      revalidateTag(`${KEY_STORY_DETAIL}-${id}`);
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
          revalidateTag(TAG_HOME_LIST);
          revalidateTag(`${TAG_HOME_DETAIL}-${id}`);
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
          revalidateTag(TAG_REPORT_LIST);
          revalidateTag(`${TAG_REPORT_DETAIL}-${id}`);
        }
        redirect("/report");
      } catch (e) {
      } finally {
        redirect("/report");
      }
    default:
      break;
  }
}
