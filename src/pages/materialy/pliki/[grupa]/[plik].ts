// Pliki do pobrania. Przy budowaniu strony każdy plik z folderu materialy/<grupa>/
// trafia pod adres /materialy/pliki/<grupa>/<plik>. Dostępu pilnuje bramka
// netlify/edge-functions/materialy.ts – bez klucza adres przekierowuje na /materialy.
import { readFileSync } from 'node:fs';
import type { APIRoute } from 'astro';
import { wczytajMaterialy, sciezkaPliku } from '../../../../lib/materialy';

export function getStaticPaths() {
  return wczytajMaterialy().flatMap((grupa) => grupa.pliki.map((p) => ({ params: { grupa: grupa.id, plik: p.plik } })));
}

export const GET: APIRoute = ({ params }) =>
  new Response(readFileSync(sciezkaPliku(params.grupa!, params.plik!)), {
    headers: { 'Content-Type': 'application/octet-stream' },
  });
