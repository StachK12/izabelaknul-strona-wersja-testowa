# Strona izabelaknul.pl

Strona Izabeli Knul (szkolenia, czasdolasu, mentoring). Jest zbudowana w [Astro](https://astro.build) i działa na [Netlify](https://www.netlify.com).

**Najważniejsze w skrócie:** każda zmiana zapisana w tym repozytorium na GitHubie (gałąź `main`) **sama publikuje się na stronie** po 1–3 minutach. Nie trzeba niczego instalować. Wszystko da się zrobić w przeglądarce, na stronie GitHuba. Większe zmiany można najpierw sprawdzić na **stronie testowej** (gałąź `test`, punkt 8). Pliki dla uczestników szkoleń wgrywa się do folderu `materialy/` (punkt 9).

**Repozytorium:** https://github.com/StachK12/izabelaknul-strona

> **Dostęp (jednorazowo):** żeby edytować pliki, Twoje konto GitHub musi mieć prawo zapisu. Właściciel repozytorium dodaje je w **Settings → Collaborators → Add people**, z rolą **Write**. Może też przenieść repozytorium na Twoje konto: **Settings → Transfer ownership**. Bez tego GitHub zamiast „Commit changes” pokaże „Propose changes”, a zmiana nie trafi na stronę.

---

## Spis treści

1. [Jak edytować pliki w przeglądarce](#1-jak-edytować-pliki-w-przeglądarce)
2. [Jak dodać lub zmienić wydarzenie](#2-jak-dodać-lub-zmienić-wydarzenie)
3. [Jak podmienić zdjęcie](#3-jak-podmienić-zdjęcie)
4. [Jak zmienić tekst na stronie](#4-jak-zmienić-tekst-na-stronie)
5. [Formularze – gdzie trafiają wiadomości](#5-formularze--gdzie-trafiają-wiadomości)
6. [Coś poszło nie tak?](#6-coś-poszło-nie-tak)
7. [Podpięcie pod Netlify i domenę izabelaknul.pl](#7-podpięcie-pod-netlify-i-domenę-izabelaknulpl)
8. [Strona testowa](#8-strona-testowa)
9. [Materiały dla uczestników (za kluczem)](#9-materiały-dla-uczestników-za-kluczem)
10. [Dla zaawansowanych](#10-dla-zaawansowanych)

---

## 1. Jak edytować pliki w przeglądarce

1. Wejdź na stronę repozytorium na GitHubie i zaloguj się.
2. Kliknij plik, który chcesz zmienić (np. `wydarzenia.yaml`).
3. Kliknij ikonę **ołówka** („Edit this file”) w prawym górnym rogu podglądu pliku.
4. Wprowadź zmiany.
5. Kliknij zielony przycisk **„Commit changes…”**, wpisz krótki opis (np. „Nowe wydarzenie listopad”) i zatwierdź **„Commit changes”**.
6. Po 1–3 minutach zmiana jest na stronie. Postęp widać w panelu Netlify, w zakładce **Deploys**.

> Wskazówka: jeśli coś zepsujesz, nic się nie stanie na stałe. GitHub pamięta każdą wersję pliku (przycisk **History**), a Netlify w razie błędu zostawia na stronie poprzednią, działającą wersję.

---

## 2. Jak dodać lub zmienić wydarzenie

Wszystkie wydarzenia są w jednym pliku: **`wydarzenia.yaml`** (w głównym folderze repozytorium). Strona **/najblizsze-wydarzenia** wyświetla je automatycznie.

**Wydarzenia, których ostatnia data minęła, znikają ze strony same.** Nie trzeba ich usuwać, ale można. Gdy nie ma żadnego nadchodzącego wydarzenia, strona pokazuje komunikat, że nowe terminy pojawią się wkrótce.

### Przykład wydarzenia

```yaml
- tytul: "Ocenianie kształtujące"
  daty: [2026-11-28]
  godzina: "9:00–15:00"
  miejsce: "czasdolasu, Petronelów 36B"
  opis: "Warsztaty outdoorowe dla nauczycieli."
  zdjecie: szkolenie-ocenianie-ksztaltujace.jpg
  link_wiecej: /szkolenia#ocenianie-ksztaltujace
  link_zapisu: https://forms.gle/…
```

### Zasady (ważne!)

- Każde wydarzenie zaczyna się od **myślnika i spacji**: `- tytul: …`.
- Kolejne linijki wydarzenia mają **dokładnie 2 spacje** na początku (tak jak w przykładzie). Nie używaj tabulatora.
- **Daty** wpisuj w nawiasach kwadratowych: `[2026-11-28]`. Kilka terminów oddzielaj przecinkami: `[2026-11-28, 2026-12-05]`. Działa też zapis `28.11.2026`.
- Tekst z dwukropkiem albo cudzysłowem najlepiej wziąć w cudzysłów: `"Tytuł: podtytuł"`.
- Pola `godzina`, `miejsce`, `opis`, `zdjecie`, `link_wiecej` i `link_zapisu` są **opcjonalne**. Możesz je pominąć.
- `zdjecie` to nazwa pliku z folderu `zdjecia/`.
- `link_wiecej` to adres opisu szkolenia. Dostępne opisy:
  - `/szkolenia#ocenianie-ksztaltujace`
  - `/szkolenia#jedna-klasa`
  - `/szkolenia#nowa-podstawa`
  - `/szkolenia#od-wyzwania-do-zmiany`
- `link_zapisu` to np. link do Formularza Google. Jeśli go nie podasz, przycisk „Zapisz się” prowadzi do formularza na stronie Kontakt.

### Jak dodać nowe wydarzenie

1. Otwórz `wydarzenia.yaml` do edycji (patrz punkt 1).
2. Skopiuj istniejący blok wydarzenia (od `- tytul:` do jego ostatniej linijki).
3. Wklej go na końcu pliku i zmień wartości.
4. Zapisz („Commit changes”).

---

## 3. Jak podmienić zdjęcie

Wszystkie zdjęcia są w folderze **`zdjecia/`**. Strona sama:
- zmniejsza zdjęcia do kilku rozmiarów (telefon, tablet, komputer);
- zapisuje je w nowoczesnych formatach (AVIF, WebP);
- ładuje je dopiero wtedy, gdy odwiedzający do nich przewinie.

**Nie musisz niczego zmniejszać ręcznie.** Najlepiej wgrywaj zdjęcia w formacie JPG, o szerokości co najmniej 1600 px (do ok. 10 MB).

### Podmiana zdjęcia na inne (najprościej)

1. Przygotuj nowe zdjęcie i nadaj mu **dokładnie taką samą nazwę** jak plik, który chcesz zastąpić, np. `strona-glowna-brzoza.jpg`.
2. Na GitHubie wejdź do folderu `zdjecia/`.
3. Kliknij **„Add file” → „Upload files”** i przeciągnij plik.
4. Kliknij **„Commit changes”**. Stary plik zostanie zastąpiony nowym.

### Które zdjęcie jest gdzie

| Plik | Gdzie jest na stronie |
|---|---|
| `strona-glowna-brzoza.jpg` | strona główna – duże zdjęcie na górze (także obrazek przy udostępnianiu linku) |
| `portret-czarny-stroj.jpg` | strona główna (przedstawienie) i „Dla szkoły” |
| `stopka-pole.jpg` | zdjęcie w stopce na każdej stronie (pole, horyzont i osoba na krześle; strona sama je rozjaśnia) |
| `o-mnie-portret.jpg` | O mnie |
| `czasdolasu-portret.jpg` | CZASdoLASU – zdjęcie na górze |
| `czasdolasu-polana.jpg` | CZASdoLASU – polana obok formularza |
| `szkolenie-ocenianie-ksztaltujace.jpg` | Dla szkoły – „Ocenianie kształtujące” |
| `szkolenie-jedna-klasa.jpg` | Dla szkoły – „Jedna klasa – wiele potrzeb” oraz karta wydarzenia |
| `szkolenie-sala.jpg` | Dla szkoły – „Nowa podstawa programowa…” (także obrazek przy udostępnianiu) |
| `szkolenie-podroz-bohatera.jpg` | Dla szkoły – „Od wyzwania do zmiany” |
| `dla-rodzicow-portret.jpg`, `dla-rodzicow-paw.jpg`, `dla-rodzicow-brzoza.jpg`, `szkolenie-konferencja.jpg` | **obecnie nieużywane** – zostały po usuniętej stronie „Dla rodziców” i po sekcjach, które na starej stronie były ukryte |

> **Zdjęcie w stopce:** strona ustawia kadr tak, żeby osoba siedząca na krześle była widoczna na każdym ekranie, także na telefonie. Zakłada, że osoba jest w miejscu 67% szerokości i 55% wysokości zdjęcia. Jeśli kiedyś podmienisz `stopka-pole.jpg` na zupełnie inne zdjęcie, popraw wartość `--punkt` w pliku `src/components/Stopka.astro` (pierwsza liczba to położenie od lewej, druga od góry).

> **Nazwa musi być identyczna**, łącznie z końcówką `.jpg` pisaną małymi literami. Zdjęcie z telefonu często ma nazwę `….JPG` albo `….jpeg`. Przed wgraniem zmień ją na dokładnie taką jak w tabeli, inaczej wgrany plik nie zastąpi starego.

### Nowe zdjęcie pod nową nazwą

Wgraj plik do `zdjecia/`, a potem w pliku strony (patrz punkt 4) znajdź `plik="…"` i wpisz nową nazwę. Obok jest `alt="…"`, czyli krótki opis zdjęcia dla osób niewidomych i dla Google. Zaktualizuj go, jeśli zdjęcie przedstawia coś innego.

> Jeśli zdjęcia o podanej nazwie nie ma w folderze, w jego miejscu pojawi się wyraźna ramka „Tu będzie zdjęcie…”. Strona dalej działa.

Logo (`logo-izabela-knul.png`, `logo-czasdolasu.png`, `czasdolasu-podpis.png`) jest w folderze `src/assets/marka/`.

---

## 4. Jak zmienić tekst na stronie

Każda podstrona to jeden plik w folderze `src/pages/`:

| Strona | Plik |
|---|---|
| Strona główna | `src/pages/index.astro` |
| O mnie | `src/pages/o-mnie.astro` |
| Najbliższe wydarzenia | `src/pages/najblizsze-wydarzenia.astro` (same wydarzenia: `wydarzenia.yaml`) |
| CZASdoLASU | `src/pages/czas-do-lasu.astro` |
| Dla szkoły (szkolenia) | `src/pages/szkolenia.astro` |
| Superwizja w szkole | `src/pages/superwizja-w-szkole.astro` |
| Mentoring | `src/pages/mentoring.astro` |
| Kontakt | `src/pages/kontakt.astro` |
| Polityka prywatności | `src/tresci/polityka-prywatnosci.md` (zwykły tekst) |
| Stopka (podpis, „Sprawdź również:”) | `src/components/Stopka.astro` |
| Formularze (etykiety pól, zgoda RODO, komunikaty po wysłaniu) | `src/components/Formularz.astro` |
| Strona po wysłaniu formularza / strona błędu | `src/pages/dziekuje.astro` / `src/pages/404.astro` |

**Dane wspólne dla wszystkich stron** (telefon, adres, Facebook, Instagram, LinkedIn, pozycje menu) są w jednym pliku: **`src/data/strona.ts`**. Zmiana tam zmienia je wszędzie.

### Jak to zrobić

1. Otwórz plik strony do edycji (ołówek).
2. Znajdź zdanie, które chcesz zmienić. Pomoże wyszukiwanie: **Ctrl+F** (na Macu **Cmd+F**).
3. Zmień **tylko tekst między znacznikami**. Przykład:

   ```html
   <p>To jest tekst, który możesz zmienić.</p>
   ```

   Zmieniasz `To jest tekst, który możesz zmienić.`, a `<p>` i `</p>` zostawiasz.
4. Nie usuwaj znaków `<`, `>`, `{`, `}` ani cudzysłowów wokół atrybutów (np. `class="wyr"`).
5. Zapisz („Commit changes”).

Przydatne znaczniki:
- `<span class="wyr">słowa</span>` – wyróżnienie (pogrubienie w kolorze brązowym).
- `<Marka />` – nazwa *czasdo**lasu*** w barwach marki.
- `<a href="/kontakt">tekst</a>` – link.

Tytuł strony w Google i jej opis są na górze pliku, w atrybutach `tytul="…"` i `opis="…"` (na stronie Mentoring opis jest w linijce `const opis = '…'`).

### Teksty na samej górze pliku (między liniami `---`)

Niektóre strony trzymają część tekstów na górze pliku, między dwiema liniami `---`. Dotyczy to na przykład:
- planu dnia i kart oferty na CZASdoLASU;
- list szkoleń w formularzach.

Wyglądają tak:

```js
{ godziny: '09:00–09:20', tytul: 'Powitanie i integracja przy kawie', opis: 'Spokojny początek dnia…' },
```

Zmieniaj tylko tekst **wewnątrz apostrofów** `'…'`. Nie usuwaj apostrofów ani przecinków. Jeśli w tekście potrzebujesz apostrofu, użyj znaku ’.

### Ten sam opis szkolenia w kilku miejscach

Opisy szkoleń powtarzają się na kilku stronach. Jeśli zmieniasz nazwę lub opis szkolenia, zmień go we wszystkich miejscach (szukaj nazwy przez Ctrl+F):
- `src/pages/szkolenia.astro` – karty u góry, sekcja szkolenia, lista w formularzu i dane dla Google (na górze pliku);
- `src/pages/czas-do-lasu.astro` – karty oferty i lista w formularzu;
- `wydarzenia.yaml` – tytuły wydarzeń.

> Pisz zwykłe spacje. Twarde spacje po jednoliterowych słowach (a, i, o, u, w, z), które nie pozwalają im zostać same na końcu linii, strona dodaje sama przy publikacji.

---

## 5. Formularze – gdzie trafiają wiadomości

Formularze (kontakt i zapisy na szkolenia) obsługuje **Netlify Forms**. Nie wymagają zewnętrznych skryptów. Każdy formularz ma zgodę RODO i ukryte pole, które zatrzymuje spam od robotów.

- Wszystkie zgłoszenia widać w panelu Netlify: **Forms**. Formularze nazywają się:
  - `kontakt`
  - `zapis-szkolenia`
  - `zapis-czasdolasu`
- **Powiadomienia e-mail o nowych zgłoszeniach** trzeba włączyć raz:
  1. W panelu Netlify wejdź w **Project configuration → Notifications → Emails and webhooks → Form submission notifications**.
  2. Kliknij **Add notification → Email notification** i wpisz adres, np. szkolenia@izabelaknul.pl.

---

## 6. Coś poszło nie tak?

- **Strona się nie zmieniła.** W Netlify, w zakładce **Deploys**, sprawdź, czy ostatnia publikacja ma status „Published”. Jeśli jest czerwona („Failed”), kliknij ją. Na dole dziennika (log) jest komunikat po polsku, np. *„wydarzenia.yaml: wydarzenie „…” ma niepoprawną datę”*.
- **Błąd w `wydarzenia.yaml`** to najczęściej:
  - zła liczba spacji na początku linijki;
  - brak myślnika przed `tytul`;
  - data w innym formacie niż `2026-11-28` albo `28.11.2026`.
- **Cofnięcie zmiany:** na GitHubie otwórz plik, kliknij **History**, wybierz poprzednią wersję, skopiuj jej treść i zapisz ją ponownie.

---

## 7. Podpięcie pod Netlify i domenę izabelaknul.pl

### Krok 1. Projekt na Netlify (jednorazowo)

1. Załóż konto na <https://app.netlify.com> („Sign up with GitHub”).
2. Kliknij **Add new project → Import an existing project → GitHub** i zezwól Netlify na dostęp do repozytorium `izabelaknul-strona`. Zgodę musi dać konto, które jest **właścicielem** repozytorium (albo zrób to po przeniesieniu repozytorium na swoje konto).
3. Wybierz repozytorium i gałąź `main`. Ustawienia budowania wypełnią się same z pliku `netlify.toml`:
   - polecenie: `npm run build`;
   - folder: `dist`.

   Kliknij **Deploy**.
4. Po 2–4 minutach strona działa pod tymczasowym adresem `https://<nazwa>.netlify.app`. Przejrzyj ją tam w całości.
5. **Włącz formularze:** **Project configuration → Forms → Enable form detection**. Potem zrób ponowną publikację: **Deploys → Trigger deploy → Deploy site**.
6. Wyślij próbną wiadomość z formularza i sprawdź, czy pojawiła się w **Forms**. Włącz powiadomienia e-mail (punkt 5).

### Krok 2. Domena izabelaknul.pl

> ⚠️ **Uwaga na pocztę.** Jeśli adres szkolenia@izabelaknul.pl działa, poczta jest na tej domenie. Przy zmianie ustawień domeny **nie ruszaj rekordów MX** (odpowiadają za pocztę). Najbezpieczniej jest zmienić tylko rekordy strony, jak w wariancie A poniżej.
>
> **Zanim zaczniesz:** sprawdź, kto prowadzi skrzynkę szkolenia@izabelaknul.pl. Zobacz, na jaki serwer wskazują rekordy MX w strefie DNS, i czy strefę DNS prowadzi WebWave. Jeśli poczta albo strefa DNS jest w WebWave, rezygnacja z abonamentu WebWave wyłączy pocztę. Wtedy najpierw przenieś pocztę (albo zostaw w WebWave samą pocztę) i strefę DNS do rejestratora domeny.

1. W Netlify: **Domain management → Add a domain** i wpisz `izabelaknul.pl`. Netlify zapyta o `www.izabelaknul.pl`, więc dodaj obie wersje.
2. Sprawdź, gdzie jest zarejestrowana domena i kto zarządza jej ustawieniami DNS. Może to być panel WebWave albo rejestrator, np. home.pl, nazwa.pl, OVH. Zaloguj się tam.
3. **Wariant A (zalecany, poczta zostaje bez zmian):** w strefie DNS domeny ustaw:
   - rekord **A** dla `izabelaknul.pl` (czasem oznaczany `@`) → `75.2.60.5`. Usuń inne rekordy A i rekordy **AAAA** dla `@`, które wskazują na WebWave;
   - rekord **CNAME** dla `www` → `<nazwa>.netlify.app` (Twój adres z kroku 1). Jeśli dla `www` jest już rekord A, AAAA albo inny CNAME, najpierw go usuń;
   - pozostałe rekordy (zwłaszcza **MX**, **TXT**, a także CNAME typu `mail` czy `autodiscover`) zostaw bez zmian.

   **Wariant B:** przenieś całe DNS do Netlify, zmieniając serwery nazw (nameservers) u rejestratora na te, które pokaże Netlify. Wtedy **przepisz najpierw w Netlify wszystkie rekordy** z obecnej strefy (MX, TXT, CNAME, SRV), inaczej poczta przestanie działać.
4. Zmiany DNS rozchodzą się zwykle w ciągu kilku godzin (maksymalnie do 48 h). Netlify sam wystawi certyfikat HTTPS. W **Domain management → HTTPS** powinien pojawić się zielony status. W razie potrzeby kliknij **Verify DNS configuration**.
5. Ustaw `izabelaknul.pl` jako **domenę główną** (Primary domain). Wersja z `www` będzie wtedy przekierowywać na nią.
6. Sprawdź:
   - czy działa https://izabelaknul.pl;
   - czy stare adresy działają, np. https://izabelaknul.pl/o-mnie-2 powinien pokazać stronę „O mnie”, a https://izabelaknul.pl/polityka-prywatnosci-2 przekierować na /polityka-prywatnosci;
   - czy formularz działa.
7. Dopiero gdy wszystko działa, wyłącz stronę w WebWave i zrezygnuj z tamtejszego abonamentu. Uważaj, żeby nie zrezygnować z samej domeny ani z poczty, jeśli są w WebWave (patrz uwaga o poczcie wyżej).
8. (Opcjonalnie) Dodaj stronę do **Google Search Console** i zgłoś mapę strony: `https://izabelaknul.pl/sitemap-index.xml`.

---

## 8. Strona testowa

Oprócz właściwej strony jest **strona testowa**, np. `https://izabelaknul-test.netlify.app` (nazwę wybiera się przy podpinaniu, patrz niżej). Służy do sprawdzania większych zmian (nowe sekcje, materiały, zdjęcia), zanim trafią na izabelaknul.pl.

Działa dokładnie tak samo jak właściwa strona, tylko z innej gałęzi repozytorium: właściwa strona publikuje się z gałęzi **`main`**, testowa z gałęzi **`test`**. Każda zmiana zapisana w gałęzi `test` pojawia się na stronie testowej po 1–3 minutach i **nie dotyka** izabelaknul.pl.

Stronę testową łatwo odróżnić: ma żółty pasek „WERSJA TESTOWA” u góry, znaczek „TEST” w rogu i „TEST ·” w tytule karty. Jest ukryta przed Google, a jej formularze niczego nie wysyłają (pokazują tylko komunikat). O tym wszystkim decyduje jedna zmienna `WERSJA_TESTOWA` ustawiona w projekcie testowym w Netlify. W kodzie obu stron nie ma żadnych różnic, więc przenoszenie zmian to zwykłe scalenie gałęzi.

### Jak wprowadzić zmianę na stronie testowej

1. Na GitHubie, nad listą plików, przełącz gałąź z `main` na **`test`** (lista rozwijana z ikoną gałęzi).
2. Edytuj pliki jak zwykle (punkt 1). Przy zapisie upewnij się, że zaznaczone jest **„Commit directly to the `test` branch”**.
3. Po 1–3 minutach zmiana jest na stronie testowej. Postęp widać w panelu Netlify, w projekcie testowym, zakładka **Deploys**.

### Jak przenieść sprawdzoną zmianę na właściwą stronę

1. Na GitHubie otwórz zakładkę **Pull requests → New pull request**.
2. Ustaw **base: `main`** i **compare: `test`**. GitHub pokaże wszystkie różnice między stronami.
3. Kliknij **Create pull request**, potem **Merge pull request** i **Confirm merge**.
4. Po 1–3 minutach zmiana jest na izabelaknul.pl. Gałęzi `test` **nie usuwaj**, będzie używana dalej.

> Jeśli w międzyczasie zmieniono coś bezpośrednio na właściwej stronie (np. wydarzenia), zrób też pull request w drugą stronę (**base: `test`**, **compare: `main`**), żeby strona testowa była aktualna. Inaczej przy następnym przenoszeniu GitHub może zgłosić konflikt.

### Podpięcie strony testowej w Netlify (jednorazowo)

1. W Netlify kliknij **Add new project → Import an existing project → GitHub** i wybierz repozytorium `izabelaknul-strona` (to samo, z którego działa właściwa strona).
2. W polu **Branch to deploy** wybierz **`test`**.
3. Rozwiń **Environment variables** i kliknij **Add environment variable**: klucz `WERSJA_TESTOWA`, wartość `true`.
4. Kliknij **Deploy**. Pozostałe ustawienia (polecenie `npm run build`, folder `dist`) biorą się same z `netlify.toml`.
5. Zmień nazwę projektu: **Project configuration → General → Project details → Change project name**, np. na `izabelaknul-test`. Adres będzie wtedy `https://izabelaknul-test.netlify.app`.
6. **Nie podpinaj** do tego projektu domeny izabelaknul.pl i nie włączaj tu formularzy ani powiadomień.

> Krok 3 jest ważny: bez zmiennej `WERSJA_TESTOWA` strona z gałęzi `test` wyglądałaby jak prawdziwa, z działającymi formularzami i widoczna dla Google.

---

## 9. Materiały dla uczestników (za kluczem)

Zakładka **Materiały** (adres `/materialy`) pokazuje listę zestawów materiałów, np. po jednym na szkolenie. Przy każdym zestawie jest pole na **klucz dostępu**. Uczestnik wpisuje klucz przy swoim zestawie i może pobierać pliki prosto ze strony; dostęp na jego urządzeniu pamiętany jest 30 dni. Każdy zestaw ma **własny klucz**, który otwiera tylko ten zestaw. Bez klucza nie da się otworzyć ani spisu plików, ani samych plików (pilnuje tego mały program uruchamiany na serwerach Netlify). Spisy i pliki nie trafiają do Google; publiczna jest tylko lista nazw zestawów.

Na start są trzy przykładowe zestawy (z tym samym przykładowym plikiem PDF pod różnymi nazwami):

| Zestaw na stronie | `id` (folder) |
| --- | --- |
| Ocenianie kształtujące | `ocenianie-ksztaltujace` |
| CZASdoLASU – zajęcia w terenie | `czas-do-lasu` |
| Mentoring EduMastermind | `mentoring` |

Trzy elementy:

| Co | Gdzie |
| --- | --- |
| Pliki do pobrania | folder **`materialy/<id>/`**, np. `materialy/mentoring/kontrakt.pdf` |
| Nazwy zestawów i opisy plików | plik **`materialy.yaml`** (w głównym folderze) |
| Klucze dostępu | panel Netlify, zmienna **`KLUCZE_MATERIALOW`** (nie w repozytorium, bo jest publiczne) |

### Jak utworzyć klucze do zestawów

1. Wymyśl osobny klucz dla każdego zestawu. Dobry klucz ma co najmniej 8 znaków i nie jest oczywisty (nie „szkolenie”, nie nazwa zestawu). Może mieć spacje i polskie znaki; wielkość liter nie ma znaczenia. Nie używaj w nim przecinka, dwukropka, średnika ani znaku równości.
2. W panelu Netlify otwórz projekt, potem **Project configuration → Environment variables**. Jeśli zmiennej `KLUCZE_MATERIALOW` jeszcze nie ma, kliknij **Add a variable**; jeśli jest, **Options → Edit**.
3. Klucz zmiennej: `KLUCZE_MATERIALOW`. Zaznacz **Same value for all deploy contexts**. Wartość: w każdej linii `id zestawu`, dwukropek i klucz, np.

   ```
   ocenianie-ksztaltujace: zielona tablica 2026
   czas-do-lasu: mech-i-paprocie
   mentoring: EduMastermind-jesien
   ```

   Zamiast nowych linii można użyć przecinków. `id` musi być dokładnie taki jak w `materialy.yaml` (nazwa folderu).
4. Zapisz, a potem kliknij **Deploys → Trigger deploy → Clear cache and deploy project**. Program sprawdzający klucze dostaje wartość zmiennej przy budowaniu strony, więc **po każdej zmianie kluczy trzeba uruchomić deploy**.
5. Po 1–3 minutach wejdź na `/materialy` i wpisz klucz przy zestawie. Klucz wpisany przy innym zestawie pokaże komunikat „Ten klucz nie otwiera tych materiałów”.

Zasady:

- Zestaw bez klucza w `KLUCZE_MATERIALOW` jest widoczny na liście, ale nikt go nie otworzy. Żeby schować zestaw całkiem, usuń jego wpis z `materialy.yaml`.
- Po **każdej zmianie** zmiennej (i deployu) wszyscy uczestnicy muszą wpisać klucz ponownie. To celowe: tak unieważnia się stary klucz po zakończonej edycji szkolenia; wystarczy zmienić klucz tego jednego zestawu.
- Zmienną trzeba ustawić **w obu projektach Netlify**: właściwym i testowym (mogą mieć inne klucze).
- Klucz jest wspólny dla całej grupy uczestników, więc można go przekazać dalej. To ochrona przed przypadkowym dostępem i Google, nie przed zdeterminowaną osobą. Dla wrażliwych dokumentów użyj innego rozwiązania.
- Dla zaawansowanych: linia `*: jakiś-klucz` daje klucz otwierający wszystkie zestawy (np. dla Ciebie). Domyślnie takiego klucza nie ma.

### Jak dodać plik do istniejącego zestawu

1. Na GitHubie wejdź do folderu `materialy/<id>/` (np. `materialy/mentoring/`).
2. Kliknij **Add file → Upload files**, przeciągnij plik, zatwierdź **Commit changes**.
3. Po 1–3 minutach plik jest na stronie, pod nazwą zrobioną z nazwy pliku (np. `prezentacja_dzien-1.pdf` → „prezentacja dzien 1”).
4. Żeby plik miał ładną nazwę i opis, dopisz go w `materialy.yaml` w sekcji `pliki:` tego zestawu (patrz przykład niżej). Pliki z listy pokazują się pierwsze, pozostałe za nimi.

> Przez stronę GitHuba wgrasz plik **do 25 MB**. Prezentacje warto zapisać jako PDF i zmniejszyć (np. „Zmniejsz rozmiar” w Acrobacie albo eksport PowerPointa w jakości „do Internetu”). Nagrań wideo nie wgrywaj do repozytorium: wstaw je na YouTube (film niepubliczny) albo Dysk Google i podaj link w opisie zestawu. Repozytorium pamięta każdą wgraną wersję pliku, więc lepiej wgrać jedną przemyślaną wersję niż dziesięć poprawek.

### Jak dodać nowy zestaw (np. nowe szkolenie)

1. Utwórz folder `materialy/<id>/` i wgraj do niego przynajmniej jeden plik. Na GitHubie: **Add file → Upload files**, a w polu nazwy ścieżki wpisz `materialy/nowe-id/` przed nazwą pliku. `id` to tylko małe litery bez polskich znaków, cyfry i myślniki, np. `ocenianie-2027`.
2. W `materialy.yaml` dopisz zestaw:

   ```yaml
   - id: ocenianie-2027
     nazwa: "Ocenianie kształtujące – marzec 2027"
     opis: "Materiały z warsztatów w czasdolasu."
     pliki:
       - plik: prezentacja.pdf
         nazwa: "Prezentacja z warsztatów"
         opis: "Slajdy z obu dni."
       - plik: szablon-karty.docx
         nazwa: "Szablon karty obserwacji"
   ```

   Pola `opis` i cała sekcja `pliki` są opcjonalne. Zasady wcięć są takie same jak w `wydarzenia.yaml` (punkt 2).
3. Dodaj klucz dla tego `id` w Netlify i uruchom deploy (patrz wyżej). Bez klucza zestawu nie da się otworzyć.

Żeby usunąć przykładowe zestawy, skasuj ich wpisy z `materialy.yaml` i foldery z `materialy/` (na GitHubie: otwórz plik → ikona kosza → Commit).

### Gdy coś nie działa

- Strona pokazuje „Materiały nie są jeszcze udostępnione” → w Netlify nie ma zmiennej `KLUCZE_MATERIALOW`, jest pusta albo została dodana po ostatnim deployu. Sprawdź wartość i uruchom **Trigger deploy**.
- „Ten klucz nie otwiera tych materiałów” → klucz jest dobry, ale należy do innego zestawu.
- „Ten klucz jest nieprawidłowy” → literówka w kluczu albo w `id` przed dwukropkiem w Netlify.
- Budowanie strony kończy się błędem po zmianie `materialy.yaml` → komunikat w Netlify (Deploys → nieudany deploy) mówi, co poprawić: najczęściej brak folderu dla `id`, literówka w nazwie pliku albo złe wcięcia.

---

## 10. Dla zaawansowanych

Wymagany Node.js 22.

```bash
npm install        # instalacja zależności
npm run dev        # podgląd na żywo: http://localhost:4321
npm run build      # zbudowanie strony do folderu dist/
npm run preview    # podgląd zbudowanej strony
WERSJA_TESTOWA=true npm run build   # to samo w wersji testowej (pasek, blokada formularzy, bez indeksowania)
```

Struktura:

```
zdjecia/                 zdjęcia (źródła; strona sama robi z nich wersje AVIF/WebP)
wydarzenia.yaml          lista wydarzeń
src/pages/               podstrony (jeden plik = jedna strona)
src/tresci/              dłuższe teksty w Markdown (polityka prywatności)
src/components/          elementy wspólne (nagłówek, stopka, formularz, zdjęcie…)
src/layouts/Uklad.astro  wspólny układ: meta SEO, Open Graph, dane strukturalne
src/styles/global.css    kolory, czcionki, odstępy (kolorystyka obecnej strony)
src/data/strona.ts       telefon, adres, media społecznościowe, menu
src/pages/robots.txt.ts  robots.txt (na stronie testowej blokuje wyszukiwarki)
materialy.yaml           zestawy materiałów dla uczestników i opisy plików
materialy/               pliki do pobrania, po jednym folderze na zestaw
src/lib/materialy.ts     odczyt materialy.yaml i folderu materialy/
src/pages/materialy.astro, src/pages/materialy/  strona z kluczem, listy plików, adresy plików
netlify/edge-functions/materialy.ts  bramka: sprawdza klucz (KLUCZE_MATERIALOW) przed /materialy/…
src/components/PasekTestowy.astro  oznaczenia strony testowej (pasek, blokada formularzy)
public/_redirects        przekierowania 301 ze starych adresów WebWave
docs/inwentaryzacja.md   pełny spis treści starej strony
```

- **Bez skryptów śledzących:** nie ma Google Analytics, Pixela Facebooka ani zewnętrznych czcionek. Czcionka Figtree jest na naszym serwerze. Jedynym elementem z zewnątrz jest mapa Google na stronie wydarzeń, która wyświetla się od razu.
- **Dostępność:** kontrasty WCAG AA, nawigacja klawiaturą, link „Przejdź do treści”, teksty alternatywne zdjęć. Animacje są wyłączone, gdy system ma ustawione „ogranicz ruch”.
