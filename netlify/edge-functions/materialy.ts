// Bramka zakładki „Materiały”. Działa na serwerach Netlify przed każdym żądaniem
// do /materialy/… (ustawienie w netlify.toml) i sprawdza klucz dostępu.
//
//  /materialy                 – strona z polem na klucz, publiczna
//  POST /materialy/wejscie    – sprawdza klucz; dobry → ciasteczko + przejście do grupy
//  /materialy/wyjscie         – kasuje ciasteczko
//  /materialy/<grupa>         – lista plików grupy, tylko z ciasteczkiem tej grupy
//  /materialy/pliki/<grupa>/… – same pliki, tylko z ciasteczkiem tej grupy
//
// Klucze są w zmiennej KLUCZE_MATERIALOW w panelu Netlify (README, punkt 9), np.:
//   przyklad: las-2026, ocenianie-2026: kreda-i-tablica
// albo każda para w osobnej linii. Grupa „*” to klucz otwierający wszystkie materiały.
// Ciasteczko jest podpisane (HMAC), więc nie da się go podrobić; ważne 30 dni.
// Zmiana KLUCZE_MATERIALOW unieważnia wszystkie dotychczasowe ciasteczka.

import type { Context } from '@netlify/edge-functions';

declare const Netlify: { env: { get(nazwa: string): string | undefined } };

const CIASTECZKO = 'materialy_dostep'; // podpisane, tylko dla serwera
const CIASTECZKO_INFO = 'materialy_grupy'; // kopia listy grup dla skryptu na stronie /materialy
const WAZNOSC_S = 30 * 24 * 60 * 60;
const SCIEZKA = '/materialy';

type Klucze = Map<string, string[]>; // znormalizowany klucz → grupy, które otwiera

export default async (zadanie: Request, kontekst: Context) => {
  const url = new URL(zadanie.url);
  const sciezka = url.pathname.replace(/\/+$/, '') || '/';
  const klucze = wczytajKlucze(Netlify.env.get('KLUCZE_MATERIALOW'));

  if (sciezka === `${SCIEZKA}/wejscie`) return wejscie(zadanie, url, klucze);
  if (sciezka === `${SCIEZKA}/wyjscie`) return przekieruj(url, `${SCIEZKA}?wyjscie`, [skasuj(CIASTECZKO, true), skasuj(CIASTECZKO_INFO, false)]);
  if (sciezka === SCIEZKA || sciezka === `${SCIEZKA}.html`) return kontekst.next();

  const grupa = grupaZeSciezki(sciezka);
  if (!grupa) return kontekst.next(); // np. /materialy/pliki bez reszty – zwykłe 404

  if (klucze.size === 0) return przekieruj(url, `${SCIEZKA}?blad=brak`);
  const dostep = await odczytajDostep(zadanie, klucze);
  if (!dostep.includes('*') && !dostep.includes(grupa)) return przekieruj(url, `${SCIEZKA}?blad=dostep`);

  const odpowiedz = await kontekst.next();
  const chroniona = new Response(odpowiedz.body, odpowiedz);
  chroniona.headers.set('Cache-Control', 'private, no-cache');
  chroniona.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return chroniona;
};

// ---------- klucze ----------

function normalizuj(klucz: string): string {
  return klucz.trim().toLowerCase().replace(/\s+/g, ' ');
}

function wczytajKlucze(tekst: string | undefined): Klucze {
  const klucze: Klucze = new Map();
  for (const para of (tekst ?? '').split(/[\n,;]+/)) {
    const [grupa, ...reszta] = para.split(/[:=]/);
    const klucz = normalizuj(reszta.join(':'));
    const id = grupa?.trim().toLowerCase();
    if (!id || !klucz || !(id === '*' || /^[a-z0-9]+(-[a-z0-9]+)*$/.test(id))) continue;
    klucze.set(klucz, [...(klucze.get(klucz) ?? []), id]);
  }
  return klucze;
}

async function wejscie(zadanie: Request, url: URL, klucze: Klucze): Promise<Response> {
  if (zadanie.method !== 'POST') return przekieruj(url, SCIEZKA);
  let wpisany = '';
  try {
    wpisany = String((await zadanie.formData()).get('klucz') ?? '');
  } catch {
    return przekieruj(url, `${SCIEZKA}?blad=klucz`);
  }
  if (klucze.size === 0) return przekieruj(url, `${SCIEZKA}?blad=brak`);

  const nowe = klucze.get(normalizuj(wpisany));
  if (!nowe) {
    await new Promise((r) => setTimeout(r, 600)); // zły klucz: chwila zwłoki utrudnia zgadywanie
    return przekieruj(url, `${SCIEZKA}?blad=klucz`);
  }

  const dotychczas = await odczytajDostep(zadanie, klucze);
  const grupy = [...new Set([...dotychczas, ...nowe])];
  const wygasa = Math.floor(Date.now() / 1000) + WAZNOSC_S;
  const wartosc = `${grupy.join(',')}|${wygasa}`;
  const podpis = await podpisz(wartosc, klucze);
  const dokad = nowe.includes('*') ? SCIEZKA : `${SCIEZKA}/${nowe[0]}`;
  return przekieruj(url, dokad, [
    ustaw(CIASTECZKO, `${wartosc}.${podpis}`, true),
    ustaw(CIASTECZKO_INFO, grupy.join(','), false),
  ]);
}

// ---------- ciasteczko ----------

async function odczytajDostep(zadanie: Request, klucze: Klucze): Promise<string[]> {
  const surowe = zadanie.headers.get('cookie') ?? '';
  const para = surowe.split(/;\s*/).find((c) => c.startsWith(`${CIASTECZKO}=`));
  if (!para) return [];
  const wartoscZPodpisem = decodeURIComponent(para.slice(CIASTECZKO.length + 1));
  const kropka = wartoscZPodpisem.lastIndexOf('.');
  if (kropka < 0) return [];
  const wartosc = wartoscZPodpisem.slice(0, kropka);
  const podpis = wartoscZPodpisem.slice(kropka + 1);
  if (!rowne(podpis, await podpisz(wartosc, klucze))) return [];
  const [grupy, wygasa] = wartosc.split('|');
  if (!wygasa || Number(wygasa) < Date.now() / 1000) return [];
  return (grupy ?? '').split(',').filter(Boolean);
}

// Sekret podpisu wynika z samych kluczy: nie trzeba drugiej zmiennej w Netlify,
// a po zmianie kluczy stare ciasteczka przestają działać.
async function podpisz(wartosc: string, klucze: Klucze): Promise<string> {
  const sekret = 'materialy-izabelaknul|' + [...klucze.entries()].map(([k, g]) => `${k}=${g.join('+')}`).sort().join('|');
  const koder = new TextEncoder();
  const kluczHmac = await crypto.subtle.importKey('raw', koder.encode(sekret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const bajty = new Uint8Array(await crypto.subtle.sign('HMAC', kluczHmac, koder.encode(wartosc)));
  return btoa(String.fromCharCode(...bajty)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function rowne(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let roznica = 0;
  for (let i = 0; i < a.length; i++) roznica |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return roznica === 0;
}

function ustaw(nazwa: string, wartosc: string, tylkoSerwer: boolean): string {
  return `${nazwa}=${encodeURIComponent(wartosc)}; Path=${SCIEZKA}; Max-Age=${WAZNOSC_S}; SameSite=Lax; Secure${tylkoSerwer ? '; HttpOnly' : ''}`;
}

function skasuj(nazwa: string, tylkoSerwer: boolean): string {
  return `${nazwa}=; Path=${SCIEZKA}; Max-Age=0; SameSite=Lax; Secure${tylkoSerwer ? '; HttpOnly' : ''}`;
}

// ---------- pomocnicze ----------

/** /materialy/pliki/<grupa>/plik.pdf → grupa; /materialy/<grupa>(.html) → grupa; inaczej null */
function grupaZeSciezki(sciezka: string): string | null {
  const reszta = sciezka.slice(SCIEZKA.length + 1);
  const czesci = reszta.split('/');
  const grupa = czesci[0] === 'pliki' ? czesci[1] : czesci.length === 1 ? czesci[0].replace(/\.html$/, '') : null;
  return grupa && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(grupa) ? grupa : null;
}

function przekieruj(url: URL, dokad: string, ciasteczka: string[] = []): Response {
  const odpowiedz = new Response(null, { status: 303, headers: { Location: new URL(dokad, url).href, 'Cache-Control': 'no-store' } });
  for (const c of ciasteczka) odpowiedz.headers.append('Set-Cookie', c);
  return odpowiedz;
}
