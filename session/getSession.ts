import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export async function getSession() {
  return await getIronSession<SessionContent>(cookies(), {
    cookieName: "lovely-animals",
    password: process.env.COOKIE_PASSWORD!,
  });
}
