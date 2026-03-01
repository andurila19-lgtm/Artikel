import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Matcher for internationalized routes, excluding internals and static assets
    matcher: [
        // Match all pathnames except for:
        // - /api (API routes)
        // - /_next (Next.js internals)
        // - /_static (inside /public)
        // - All root files inside /public (e.g. /favicon.ico)
        '/((?!api|_next|_static|_vercel|.*\\..*).*)'
    ]
};
