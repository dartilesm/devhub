import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Route matcher to protect all routes except for the sign-in and sign-up pages
 */
const isProtectedRoute = createRouteMatcher(["/((?!sign-in|sign-up).*)"]);

/**
 * Clerk middleware to handle authentication and authorization
 * @see https://clerk.com/docs/references/nextjs/clerk-middleware
 */
export default clerkMiddleware(async function middleware(auth, req) {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
