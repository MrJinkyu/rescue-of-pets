import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./session/getSession";

interface Urls {
  [key: string]: boolean;
}

const authUrls: Urls = {
  "/login": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const pathname = request.nextUrl.pathname;
  const exists = authUrls[pathname];
  if (session.id) {
    if (exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!exists) {
      return NextResponse.redirect(new URL("/create-account", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
