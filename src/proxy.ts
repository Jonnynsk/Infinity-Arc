import { NextResponse, type NextRequest } from "next/server";

import { EnumTokens } from "./helpers/cookies";

const protectedRoutes = ["/dashboard", "/profile"];
const authRoutes = ["/"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const isAuthenticated = !!accessToken && !!refreshToken;

  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    const loginUrl = request.nextUrl.clone();

    loginUrl.pathname = "/";

    return NextResponse.redirect(loginUrl);
  }

  if (authRoutes.includes(pathname) && isAuthenticated) {
    const profileUrl = request.nextUrl.clone();

    profileUrl.pathname = "/dashboard";

    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/profile"],
};
