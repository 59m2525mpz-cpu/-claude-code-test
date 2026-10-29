# Finanzmarktwoche

Archiv der wöchentlichen Finanzmarkt-Berichte als Web-App fürs iPhone. Die neueste Kalenderwoche steht oben.

## Installieren (iPhone)

1. `https://59m2525mpz-cpu.github.io/-claude-code-test/finanzmarktwoche/` in **Safari** öffnen.
2. Teilen-Symbol → **Zum Home-Bildschirm** → Hinzufügen.
3. App über das neue Icon starten und einmal das Passwort eingeben.

## Datenschutz

Die Berichte liegen nur verschlüsselt in `daten/` (AES-256-GCM, Schlüssel per PBKDF2-SHA-256 mit 600.000 Runden aus dem Passwort).
Wer das Repo oder die Seite sieht, sieht nur Kalenderwochen-Kennungen wie `2026-kw43`, keinen Inhalt.
Das Passwort steht nirgends im Repo.

## Bericht hinzufügen

```sh
FMW_PASSWORT='…' node finanzmarktwoche/werkzeug/bericht-hinzufuegen.mjs --datei bericht.html
FMW_PASSWORT='…' node finanzmarktwoche/werkzeug/bericht-hinzufuegen.mjs --datei marktrueckblick-2026-10-09.md --kw 41 --jahr 2026
```

- HTML-Berichte im Format der geplanten Aufgabe liefern KW, Jahr, Zeitraum und Titel selbst, dazu die eingebettete PDF.
- Mit `--pdf datei.pdf` lässt sich eine PDF auch einzeln anhängen (z. B. bei Markdown-Berichten).
- Bei Markdown kommen KW und Jahr aus `--kw`/`--jahr` oder aus dem Datum im Dateinamen.
- Gleiche KW wird ersetzt; unveränderter Inhalt wird übersprungen.

Passwort ändern (verschlüsselt alles neu; danach in der App neu entsperren):

```sh
FMW_PASSWORT='alt' FMW_PASSWORT_NEU='neu' node finanzmarktwoche/werkzeug/bericht-hinzufuegen.mjs --passwort-aendern
```

## Dateien

- `index.html`: die App (Entsperren, Liste, Bericht als Seite oder PDF, PDF teilen/sichern)
- `daten/`: verschlüsselte Berichte (`<id>.json`), PDFs (`<id>.pdf.json`) und Index
- `vendor/`: pdf.js 3.11.174 (Mozilla, Apache-2.0) für die PDF-Ansicht, offline verfügbar
- `werkzeug/bericht-hinzufuegen.mjs`: verschlüsselt neue Berichte (Node 18+, keine Abhängigkeiten)
- `manifest.webmanifest`, `icons/`, `sw.js`: Home-Bildschirm und Offline-Betrieb
