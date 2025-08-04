import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("Authorization")?.value;

  if (!token) {
    const loginUrl = new URL("/auth", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // let decoded: PayloadToken | null = null;
  // try {
  //   decoded = jwtDecode<PayloadToken>(token);
  // } catch (error) {
  //   console.error("Error decoding token:", error);
  //   return NextResponse.redirect(new URL("/auth", request.url));
  // }

  return NextResponse.next();
}

// Tentukan path yang middleware ini akan berlaku
export const config = {
  matcher: ["/dashboard"],
};
