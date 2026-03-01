import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

const handleIntl = createMiddleware(routing);

export function proxy(request: any) {
  return handleIntl(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(id|en)/:path*']
};
