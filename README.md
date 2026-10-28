# Abi-Rechner

Abi-Rechner für das Abitur 2028 in NRW (APO-GOSt), als Web-App fürs iPhone.

## Installieren (iPhone)

1. Die GitHub-Pages-Adresse dieses Repos in **Safari** öffnen.
2. Teilen-Symbol → **Zum Home-Bildschirm** → Hinzufügen.
3. Die App über das neue Icon starten. Sie läuft im Vollbild und auch offline.

## Daten

Die Noten liegen nur auf dem Gerät, im Speicher der installierten App. Nichts davon landet in diesem Repo.

- **Einstellungen → Sicherung → Sichern** speichert alles als JSON-Datei (am iPhone: „In Dateien sichern“).
- **Einstellungen → Sicherung → Laden** holt eine Sicherung zurück.

Nach jedem Zeugnis eine Sicherung machen. Wer die App löscht, löscht auch die Noten.

## Dateien

- `index.html`: die komplette App (Rechenlogik und Oberfläche)
- `manifest.webmanifest`, `icons/`: Name und Icon für den Home-Bildschirm
- `sw.js`: Service Worker für den Offline-Betrieb
