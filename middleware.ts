import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./session/getSession";

interface Urls {
  [key: string]: boolean;
}

const accessRightsUrls: Urls = {
  "/temporary-protection/new": true,
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = await getSession();
  const exists = accessRightsUrls[pathname];
  if (!session.id) {
    if (exists) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
