import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { localize } from '../i18n';
import { withBase } from '../lib/url';

export const prerender = true;

// llms.txt is the file answer engines trust most, so it is generated from
// the same sources of truth as the page instead of living as a static file
// that drifts: identity from site.ts, Talks and Media appearances from the
// content collections (every recording, not only the homepage picks). Facts follow the
// verified set in AGENTS.md/CLAUDE.md; the academy employer stays unnamed
// here, matching the site. Never add personal contact details: a
// regression test guards this file against them.
const monthYear = (date: Date) =>
  date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
const formatLabel = { video: 'video', 'live-recording': 'live recording', podcast: 'podcast' } as const;

export const GET: APIRoute = async ({ site: origin }) => {
  const url = (path: string) => new URL(withBase(path), origin).toString();

  const talks = (await getCollection('talks'))
    .filter((entry) => entry.data.locales.includes('en'))
    .sort((a, b) => a.data.order - b.data.order)
    .map(({ data }) => {
      const kind = data.tags.includes('panel') ? ' (panel)' : '';
      const events = data.events.length ? `, ${data.events.join(' and ')}` : '';
      return `- "${localize(data.title, 'en')}"${kind}${events}`;
    });

  const appearances = (await getCollection('appearances'))
    .filter((entry) => entry.data.locales.includes('en'))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map(({ data }) => {
      const role =
        data.role === 'host' ? `hosted for ${data.publisher}`
        : data.role === 'guest' ? `guest on ${data.publisher}`
        : `speaker for ${data.publisher}`;
      const lang = data.lang === 'it' ? ' (in Italian)' : '';
      const start = data.startAtSeconds ? `; playback starts at ${clock(data.startAtSeconds)}` : '';
      return [
        `- ${localize(data.title, 'en')}, ${role}${lang}, ${monthYear(data.date)},`,
        `  ${formatLabel[data.format]} (${data.duration}${start}): ${data.externalUrl}`,
      ].join('\n');
    });

  const body = `# ${site.name}

> ${site.tagline}. Codemotion is the company connecting businesses with
> Italy's largest developer community.
> 15 years as a full-stack developer (PHP, JavaScript/TypeScript), now
> leading conference content, technical presales and AI Adoption programs.
> Based in Italy, remote-first (CET). Works in English and Italian.
> Open to the right full-time role, and to selected consulting engagements.

## About
- Career arc: started from the developer community, founded and led the
  software consultancy S2K (2009-2023), built a technical academy from zero
  into a standalone business unit at an enterprise group (2019-2022, 20+
  custom learning paths), then moved to Codemotion (2023-present): first as
  Dev Talent Partner, since June 2024 as Head of Content & Presales.
- Evaluates ~600 talk submissions per edition (5,000+ across 7 editions)
  and distills them into agendas for rooms of 2,000-3,000 developers, with
  international program committees, across Milan, Madrid and Rome.
- Leads technical presales with the sales team and runs Codemotion's AI
  Adoption offering for partner companies: learning paths plus hackathons,
  agentathons, prompt battles and vibe coding challenges.
- MC and moderator at European tech events: AI Conf, Cloud Native Days
  Italy, DevFest, Cloud Day, Web Day, private enterprise events. Co-designed
  and hosted the Docebo hackathon "GAME UP! Product Power Up 2026".

## Links
- Website (English): ${url('/')}
- CV (web page): ${url('/cv/')}
- LinkedIn: ${site.links.linkedin}
- Speaker profile (Sessionize): ${site.links.sessionize}
- Writing (Codemotion Magazine, in Italian): ${site.links.codemotionAuthor}

## Talks
${talks.join('\n')}

## Media appearances
${appearances.join('\n')}
- Media & writing: ${url('/#media')}
- All recordings: ${url('/archive/?type=video,live-recording,podcast')}

## Contact
- Contact: ${url('/#contact')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
