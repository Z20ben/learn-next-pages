import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isCookiesExist = !!request.cookies.get("user_token");
  const isLoginPage = pathname.startsWith("/login");

  // jika cookies tidak ada dan user tidak dihalaman login => redirect ke "/login"
  if (isCookiesExist === false && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // jika cookies ada dan user sedang di halaman login => redirect ke "/"

  if (isCookiesExist && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  console.log("cookies => ", isCookiesExist)
  // return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}