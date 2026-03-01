import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    matcher: [
        // Enable a redirect to a matching locale at the root
        '/',

        // Set a cookie to remember the last locale for these paths
        '/(id|en)/:path*',

        // Do not localize internal Next.js paths and static files
        '/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|.*\\..*).*)'
    ]
};
