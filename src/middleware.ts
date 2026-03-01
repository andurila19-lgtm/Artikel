import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Matcher that skips:
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_static (inside /public)
    // - All root files inside /public (e.g. /favicon.ico)
    matcher: ['/((?!api|_next|_static|_vercel|.*\\..*).*)']
};
