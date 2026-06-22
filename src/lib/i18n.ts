import { withBase } from './url';
import { locales, type Locale } from '../i18n';

export type { Locale } from '../i18n';

function routeWithoutBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const route = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return `/${route.replace(/^\/+|\/+$/g, '')}`;
}

export function localePath(pathname: string, locale: Locale): string {
  const route = routeWithoutBase(pathname);
  const unprefixed = route.replace(/^\/it(?=\/|$)/, '') || '/';
  const localized = locale === 'it'
    ? `/it${unprefixed === '/' ? '/' : unprefixed}`
    : unprefixed;
  return withBase(localized);
}

export function getLocaleAlternates(
  pathname: string,
  overrides: Partial<Record<Locale, string>> = {},
) {
  return locales.map((locale) => ({
    locale,
    href: overrides[locale]
      ? withBase(overrides[locale]!)
      : localePath(pathname, locale),
  }));
}
