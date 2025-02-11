// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Contoh: Redirect pengguna yang belum login
  const isLoggedIn = request.cookies.get("cobit_token"); // Cek cookie
  console.log(isLoggedIn);

  if (!pathname.includes("login")) {
    if (typeof isLoggedIn == "undefined") {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    return NextResponse.next();
  }
}

// Terapkan middleware hanya untuk halaman dashboard
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
