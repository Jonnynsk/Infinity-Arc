import { NextResponse, type NextRequest } from "next/server";

import { EnumTokens } from "./helpers/cookies";
import { DASHBOARD_ROUTES } from "./constants/routes";

const authRoutes = ["/"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const isAuthenticated = !!accessToken && !!refreshToken;

  const isProtectedRoute =
    DASHBOARD_ROUTES.includes(pathname) ||
    (pathname !== "/" &&
      pathname !== "/not-found" &&
      !pathname.startsWith("/_next"));

  if (isProtectedRoute && !isAuthenticated) {
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
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
