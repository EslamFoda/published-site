import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const subdomain = host.split(".")[0];

  // Ignore www, main domain, and any unwanted subdomains
  if (subdomain && subdomain !== "www" && subdomain !== "site-serve") {
    const pathname = req.nextUrl.pathname; // e.g., "/about"
    return NextResponse.rewrite(
      new URL(`/subdomain/${subdomain}${pathname}`, req.nextUrl)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
