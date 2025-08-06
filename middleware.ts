import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Tillåt alltid /login och statiska filer
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/favicon") ||
    request.nextUrl.pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  // Kontrollera sessionStorage via cookie (mockad, ej säker för produktion)
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value;
  if (isLoggedIn === "true") {
    return NextResponse.next();
  }

  // Om ej inloggad, skicka till /login
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!login|api|_next|favicon|static).*)"],
};
