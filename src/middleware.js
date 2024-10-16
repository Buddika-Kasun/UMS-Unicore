import { NextResponse } from "next/server";
import { authConfig } from "./app/api/auth/auth.config";
import NextAuth from "next-auth";
import { PUBLIC_ROUTES,LOGIN,ROOT } from "./lib/routes";
import filterRouteByRole from "./util/routeFilter";

const {auth} = NextAuth(authConfig);

export async function middleware(req) {

    const {nextUrl} = req;

    const session = await auth();

    const userRole = session?.user?.role;
    //const userRole = 'User';
    //console.log(userRole);
    const ROLE_BASED_ROUTES = filterRouteByRole(userRole);

    //console.log("midleware");

    const isAuthenticated = !!session?.user;
    //console.log("IN MID = ", isAuthenticated, nextUrl);

    const isPublicRoute = (PUBLIC_ROUTES.find(route => nextUrl.pathname.includes(route))
    || nextUrl.pathname === ROOT);

    const isRoleBasedRoute = ROLE_BASED_ROUTES.find(route => nextUrl.pathname.includes(route));
    //console.log(isRoleBasedRoute);

    if(!isAuthenticated && !isPublicRoute) {
        //return NextResponse.redirect(new URL(LOGIN, nextUrl));
        const loginUrl = new URL(LOGIN, nextUrl);
        loginUrl.searchParams.set("message", "unauthenticated");
        return NextResponse.redirect(loginUrl);
    }

    if(isAuthenticated && !(isRoleBasedRoute || isPublicRoute)){
        //return NextResponse.redirect(new URL('/dashboard', nextUrl));
        const dashboardUrl = new URL("/dashboard", nextUrl);
        dashboardUrl.searchParams.set("message", "unauthorized");
        return NextResponse.redirect(dashboardUrl);
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