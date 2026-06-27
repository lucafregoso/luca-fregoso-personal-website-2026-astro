import { getCollection } from 'astro:content';
import { localize, translations, type Locale } from '../i18n';
import { withBase } from './url';

export type ArchiveType =
  | 'speaking'
  | 'writing'
  | 'milestone'
  | 'building'
  | 'note'
  | 'article'
  | 'video'
  | 'live-recording'
  | 'podcast';

export interface ArchiveItem {
  id: string;
  type: ArchiveType;
  typeLabel: string;
  title: string;
  summary: string;
  date: Date;
  dateLabel: string;
  source: string;
  href?: string;
  external: boolean;
}

export const archiveTypes: ArchiveType[] = [
  'speaking',
  'writing',
  'milestone',
  'building',
  'note',
  'article',
  'video',
  'live-recording',
  'podcast',
];

export function archivePath(locale: Locale) {
  return locale === 'it' ? '/it/archive/' : '/archive/';
}

export function archiveHref(locale: Locale, type?: ArchiveType) {
  const path = archivePath(locale);
  return withBase(type ? `${path}?type=${encodeURIComponent(type)}` : path);
}

export function archiveTypeLabel(locale: Locale, type: ArchiveType) {
  return translations[locale].archive.filters[type];
}

function dateLabel(locale: Locale, date: Date) {
  return date.toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function hostLabel(url?: string) {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export async function getArchiveItems(locale: Locale): Promise<ArchiveItem[]> {
  const t = translations[locale];
  const now = (await getCollection('now')).filter((entry) => entry.data.locales.includes(locale));
  const writing = (await getCollection('writing')).filter((entry) => entry.data.locales.includes(locale));
  const appearances = (await getCollection('appearances')).filter((entry) => entry.data.locales.includes(locale));

  return [
    ...now.map((entry) => {
      const type = entry.data.kind as ArchiveType;
      return {
        id: `now-${entry.id}`,
        type,
        typeLabel: t.archive.filters[type],
        title: localize(entry.data.title, locale),
        summary: entry.data.blurb ? localize(entry.data.blurb, locale) : '',
        date: entry.data.date,
        dateLabel: dateLabel(locale, entry.data.date),
        source: entry.data.location ? localize(entry.data.location, locale) : t.lately.kinds[entry.data.kind],
        href: entry.data.url,
        external: Boolean(entry.data.url),
      };
    }),
    ...writing.map((entry) => ({
      id: `writing-${entry.id}`,
      type: 'article' as const,
      typeLabel: t.archive.filters.article,
      title: localize(entry.data.title, locale),
      summary: localize(entry.data.summary, locale),
      date: entry.data.date,
      dateLabel: dateLabel(locale, entry.data.date),
      source: entry.data.publication,
      href: entry.data.url,
      external: true,
    })),
    ...appearances.map((entry) => {
      const type = entry.data.format as ArchiveType;
      return {
        id: `appearance-${entry.id}`,
        type,
        typeLabel: t.archive.filters[type],
        title: localize(entry.data.title, locale),
        summary: localize(entry.data.summary, locale),
        date: entry.data.date,
        dateLabel: dateLabel(locale, entry.data.date),
        source: entry.data.publisher || hostLabel(entry.data.externalUrl),
        href: entry.data.externalUrl,
        external: true,
      };
    }),
  ].sort((a, b) => b.date.valueOf() - a.date.valueOf());
}
