"use server";

import { redirect } from "next/navigation";
import { getSession } from "./getSession";

export async function deleteSession() {
  const session = await getSession();
  session.destroy();
  redirect("/login");
}
