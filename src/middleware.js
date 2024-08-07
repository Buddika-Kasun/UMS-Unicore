import { NextResponse } from "next/server";
import { authConfig } from "./app/api/auth/auth.config";
import NextAuth from "next-auth";
import { PUBLIC_ROUTES,LOGIN,ROOT } from "./lib/routes";

const {auth} = NextAuth(authConfig);

export async function middleware(req) {

    const {nextUrl} = req;

    const session = await auth();
    //console.log(session);

    //console.log("midleware");

    const isAuthenticated = !!session?.user;
    //console.log(isAuthenticated, nextUrl.pathname);

    const isPublicRoute = (PUBLIC_ROUTES.find(route => nextUrl.pathname.includes(route))
    || nextUrl.pathname === ROOT);
    //console.log(isPublicRoute);

    if(!isAuthenticated && !isPublicRoute) {
        return NextResponse.redirect(new URL(LOGIN, nextUrl));
    }

}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|.*\\.png$).*)",
        "/",
        "/(api|trpc)(.*)",
        "/security/:path*",
    ],
}