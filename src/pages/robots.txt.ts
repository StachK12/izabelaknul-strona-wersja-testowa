// Plik robots.txt (wskazówki dla Google). Powstaje przy budowaniu strony.
// Na właściwej stronie pozwala indeksować wszystko i wskazuje mapę strony.
// Na stronie testowej (WERSJA_TESTOWA = true w Netlify) blokuje wyszukiwarki w całości.
import type { APIRoute } from 'astro';
import { WERSJA_TESTOWA } from 'astro:env/server';
import { strona } from '../data/strona';

const WLASCIWA = `User-agent: *
Allow: /

Sitemap: ${strona.adresStrony}/sitemap-index.xml
`;

const TESTOWA = `# Strona testowa – nie indeksować.
User-agent: *
Disallow: /
`;

export const GET: APIRoute = () =>
  new Response(WERSJA_TESTOWA ? TESTOWA : WLASCIWA, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
