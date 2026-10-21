import { auth } from "./auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "admin";


  if (!isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl.origin));
  }

  if (!isAdmin) {
    return Response.redirect(new URL("/forbidden", req.nextUrl.origin))
  }
});

export const config = {
  matcher: ["/admin/:path*"]
}