// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://izabelaknul.pl',
  // Adresy bez ukośnika na końcu, tak jak na starej stronie (np. /czas-do-lasu).
  trailingSlash: 'never',
  build: { format: 'file' },
  env: {
    schema: {
      // Strona testowa (gałąź `test`, osobny projekt w Netlify) ma ustawione WERSJA_TESTOWA = true.
      // Włącza to żółty pasek „WERSJA TESTOWA”, blokadę wysyłki formularzy i ukrycie przed Google.
      // Na właściwej stronie zmiennej nie ma, więc nic z tego się nie pojawia. Patrz README, punkt 8.
      WERSJA_TESTOWA: envField.boolean({ context: 'server', access: 'public', default: false }),
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/dziekuje') && !page.endsWith('/404'),
    }),
  ],
});
