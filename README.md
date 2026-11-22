# Kalkulator React — Web, Desktop i PWA

Kalkulator wykonujący podstawowe działania matematyczne, stworzony w JavaScript i React. Projekt jest dostępny w trzech wersjach: webowej, desktopowej oraz mobilnej PWA.

## Demo

**[Uruchom kalkulator online](https://andreewwladyslaw-bot.github.io/kalkulator/)**

## Technologie

- React i JavaScript — logika aplikacji
- HTML i CSS — interfejs i responsywność
- Vite — budowanie aplikacji
- Tauri i Rust — wersja desktopowa Windows
- PWA i Service Worker — instalowanie oraz działanie offline
- Vitest i React Testing Library — testy automatyczne
- GitHub Actions i GitHub Pages — publikacja

## Funkcjonalności

- Dodawanie, odejmowanie, mnożenie i dzielenie
- Obliczanie procentów
- Obsługa liczb dziesiętnych
- Zmiana znaku liczby
- Usuwanie ostatniej cyfry
- Czyszczenie kalkulatora
- Obsługa klawiatury komputera
- Responsywny wygląd
- Praca offline w wersji PWA

## Uruchomienie lokalne

Wymagany Node.js i npm.

1. Pobierz repozytorium: `git clone https://github.com/andreewwladyslaw-bot/kalkulator.git`
2. Przejdź do folderu: `cd kalkulator`
3. Zainstaluj zależności: `npm install`
4. Uruchom aplikację: `npm run dev`
5. Otwórz adres wyświetlony przez Vite.

## Testowanie

- `npm run test` — testy automatyczne
- `npm run lint` — kontrola kodu
- `npm run build` — budowanie wersji produkcyjnej

## Wersja desktopowa

Kalkulator może działać jako samodzielny program Windows dzięki Tauri.

Uruchomienie programistyczne: `npx tauri dev`

Budowanie instalatorów: `npx tauri build`

## Wersja mobilna PWA

Na iPhonie aplikację można dodać do ekranu początkowego za pomocą Safari.

Po pierwszym poprawnym załadowaniu i zapisaniu plików aplikacja może wykonywać obliczenia bez połączenia z internetem.

Wersja PWA nie jest natywną aplikacją iOS.

## Repozytorium

https://github.com/andreewwladyslaw-bot/kalkulator

## Wersja

1.0.0 — pierwsze stabilne wydanie, po zaliczeniu testów końcowych.