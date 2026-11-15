// Odczyt pliku materialy.yaml i folderu materialy/ z czytelnymi komunikatami błędów po polsku.
// Każda grupa (np. szkolenie) to wpis w YAML + folder materialy/<id>/ z plikami do pobrania.
// Dostęp do plików pilnuje netlify/edge-functions/materialy.ts (klucz z Netlify, README punkt 9).
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'yaml';

export interface PlikMaterialu {
  /** Nazwa pliku w folderze materialy/<id>/ */
  plik: string;
  /** Nazwa pokazywana na stronie */
  nazwa: string;
  opis?: string;
  /** Rozmiar w bajtach */
  rozmiar: number;
  /** np. "PDF", "DOCX" */
  rodzaj: string;
}

export interface GrupaMaterialow {
  id: string;
  nazwa: string;
  opis?: string;
  pliki: PlikMaterialu[];
}

export const PLIK = 'materialy.yaml';
export const FOLDER = 'materialy';

/** Adresy pod /materialy/ zajęte przez samą stronę – grupa nie może się tak nazywać. */
const ZAREZERWOWANE = ['pliki', 'wejscie', 'wyjscie'];

/** Ścieżka do pliku na dysku (przy budowaniu strony). */
export function sciezkaPliku(grupa: string, plik: string): string {
  return resolve(process.cwd(), FOLDER, grupa, plik);
}

/** „prezentacja_dzien-1.pdf” → „prezentacja dzien 1” */
function nazwaZPliku(plik: string): string {
  return plik.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim();
}

function rodzajPliku(plik: string): string {
  const koncowka = plik.match(/\.([^.]+)$/)?.[1];
  return koncowka ? koncowka.toUpperCase() : 'PLIK';
}

/** 1536000 → „1,5 MB” */
export function formatujRozmiar(bajty: number): string {
  if (bajty < 1024 * 1024) return `${Math.max(1, Math.round(bajty / 1024))} KB`;
  return `${(bajty / (1024 * 1024)).toLocaleString('pl-PL', { maximumFractionDigits: 1 })} MB`;
}

function plikiZFolderu(grupa: string): string[] {
  const folder = resolve(process.cwd(), FOLDER, grupa);
  if (!existsSync(folder) || !statSync(folder).isDirectory()) {
    throw new Error(`${PLIK}: grupa „${grupa}” nie ma folderu ${FOLDER}/${grupa}/. Utwórz go i wgraj do niego pliki.`);
  }
  return readdirSync(folder)
    .filter((nazwa) => !nazwa.startsWith('.') && statSync(resolve(folder, nazwa)).isFile())
    .sort((a, b) => a.localeCompare(b, 'pl'));
}

export function wczytajMaterialy(): GrupaMaterialow[] {
  const sciezka = resolve(process.cwd(), PLIK);
  if (!existsSync(sciezka)) return [];
  let dane: unknown;
  try {
    dane = parse(readFileSync(sciezka, 'utf-8'));
  } catch (blad) {
    throw new Error(`Nie da się odczytać pliku ${PLIK}. Sprawdź wcięcia i myślniki. Szczegóły: ${(blad as Error).message}`);
  }
  if (dane == null) return [];
  if (!Array.isArray(dane)) throw new Error(`${PLIK}: każda grupa musi zaczynać się od myślnika „- id: …”.`);

  const uzyte = new Set<string>();
  return dane.map((wpis, i) => {
    const gdzie = `grupa nr ${i + 1}`;
    if (typeof wpis !== 'object' || wpis === null) throw new Error(`${PLIK}: ${gdzie} jest pusta albo źle wcięta.`);
    const g = wpis as Record<string, unknown>;
    const id = String(g.id ?? '').trim();
    if (!id) throw new Error(`${PLIK}: ${gdzie} nie ma pola „id” (nazwa folderu w ${FOLDER}/).`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) {
      throw new Error(`${PLIK}: id „${id}” może zawierać tylko małe litery a–z, cyfry i myślniki, np. „ocenianie-2026”.`);
    }
    if (ZAREZERWOWANE.includes(id)) throw new Error(`${PLIK}: id „${id}” jest zarezerwowane, wybierz inne.`);
    if (uzyte.has(id)) throw new Error(`${PLIK}: id „${id}” powtarza się. Każda grupa musi mieć inne id.`);
    uzyte.add(id);

    const nazwa = String(g.nazwa ?? '').trim();
    if (!nazwa) throw new Error(`${PLIK}: grupa „${id}” nie ma nazwy (pole „nazwa”).`);
    const opis = g.opis == null || String(g.opis).trim() === '' ? undefined : String(g.opis).trim();

    const naDysku = plikiZFolderu(id);
    const opisane: PlikMaterialu[] = [];
    const listaYaml = Array.isArray(g.pliki) ? g.pliki : [];
    for (const [j, p] of listaYaml.entries()) {
      const wpisPliku = (typeof p === 'object' && p !== null ? p : { plik: p }) as Record<string, unknown>;
      const plik = String(wpisPliku.plik ?? '').trim();
      if (!plik) throw new Error(`${PLIK}: grupa „${id}”, plik nr ${j + 1} nie ma pola „plik” (nazwa pliku w folderze).`);
      if (!naDysku.includes(plik)) {
        throw new Error(`${PLIK}: grupa „${id}” wymienia plik „${plik}”, ale nie ma go w folderze ${FOLDER}/${id}/. Sprawdź pisownię (wielkość liter ma znaczenie).`);
      }
      if (opisane.some((o) => o.plik === plik)) continue;
      opisane.push({
        plik,
        nazwa: String(wpisPliku.nazwa ?? '').trim() || nazwaZPliku(plik),
        opis: wpisPliku.opis == null || String(wpisPliku.opis).trim() === '' ? undefined : String(wpisPliku.opis).trim(),
        rozmiar: statSync(sciezkaPliku(id, plik)).size,
        rodzaj: rodzajPliku(plik),
      });
    }
    // Pliki, których nie ma w YAML, też trafiają na stronę – pod nazwą zrobioną z nazwy pliku.
    const pozostale = naDysku
      .filter((plik) => !opisane.some((o) => o.plik === plik))
      .map((plik) => ({ plik, nazwa: nazwaZPliku(plik), rozmiar: statSync(sciezkaPliku(id, plik)).size, rodzaj: rodzajPliku(plik) }));

    return { id, nazwa, opis, pliki: [...opisane, ...pozostale] };
  });
}
