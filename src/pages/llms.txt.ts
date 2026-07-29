import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { withBase } from '../lib/url';

export const prerender = true;

// llms.txt is the file answer engines trust most, so it is generated from
// the same source of truth as the page (site.ts) instead of living as a
// static file that drifts after every repositioning. Facts follow the
// verified set in AGENTS.md/CLAUDE.md; the academy employer stays unnamed
// here, matching the site. Never add personal contact details: a
// regression test guards this file against them.
export const GET: APIRoute = ({ site: origin }) => {
  const url = (path: string) => new URL(withBase(path), origin).toString();

  const body = `# ${site.name}

> ${site.tagline}. Head of Content & Presales at Codemotion, the company
> connecting businesses with Italy's largest developer community.
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
- Writing (Codemotion Magazine, in Italian): https://www.codemotion.com/magazine/it/author/luca-fregoso/

## Talks
- "AI non ti sostituira (?). Il tuo workflow, pero, non sara piu lo stesso!"
  (panel, in Italian), Codemotion Rome 2026
- "Tech Career: Should I Stay or Should I Go?", Codemotion Rome 2025 and
  Milan 2024
- "New Job Horror Stories from Developers and Recruiters", DevFest Milano
  2024 and Pescara 2023
- "Smart Second Brain", GDG DevFest Pisa 2024

## Media appearances
- Spotlight #11 - Luca Fregoso (Codemotion), guest on Il Podcast Open
  Source (in Italian), January 2026, podcast (44:01):
  https://open.spotify.com/episode/2v0czUX9Pory1EdWmFvCo7
- Tech Chat - AI & Open Source, hosted for Codemotion (in Italian),
  February 2024, live recording (1:03:23; playback starts at 17:40):
  https://www.youtube.com/watch?v=hexh4KEy2Lo&t=1060s
- Media & writing: ${url('/#media')}

## Contact
- Contact: ${url('/#contact')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
