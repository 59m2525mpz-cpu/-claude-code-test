# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Eine Person: der Eigentümer, Oberstufenschüler mit eigenem Aktiendepot. Er liest seine wöchentlichen Finanzmarkt-Berichte auf dem iPhone, installiert als Web-App auf dem Homebildschirm. Situationen (alle bestätigt): freitags und am Wochenende in Ruhe, wenn der neue Bericht da ist; unterwegs kurz (Bus, Pause) für die Kernaussagen; gezielt vor Depot-Entscheidungen, um nachzuschlagen, was zu einem Titel oder einer Woche stand; abends im Bett bei gedimmtem Bildschirm.

## Product Purpose

Privates, verschlüsseltes Archiv aller Finanzmarkt-Wochenberichte, nach Kalenderwoche sortiert, neueste oben. Die Startseite ist vor allem der schnelle Weg in einen Bericht (bestätigt: „Schnell zum Bericht“), nicht ein eigenes Dashboard. Erfolg: Woche finden, antippen, lesen, ohne Reibung und ohne Claude-Login.

## Positioning

Kein Börsen-Tool und keine Trading-App: ein persönliches Leseregal für Berichte, die eine geplante Claude-Aufgabe jeden Freitag erzeugt. Inhalte sind nur mit dem Passwort lesbar, obwohl die App öffentlich auf GitHub Pages liegt.

## Operating Context

- Jeden Freitag 18:00 erstellt die Aufgabe „Depot Rückblick“ den Bericht (HTML-Seite mit eingebetteter PDF); um 19:47 übernimmt „Finanzmarktwoche-App füllen“ ihn verschlüsselt in `daten/`.
- Berichte haben ihr eigenes, festes Layout (hell, weiß, blau) und werden in der App unverändert angezeigt: als „Seite“ (HTML im Rahmen) oder als „PDF“ (pdf.js). Die App gestaltet die Hülle, nicht den Bericht.
- Läuft als installierte iPhone-Web-App (Standalone, Safari), auch offline für bereits geladene Berichte.

## Capabilities and Constraints

Bestätigt zu erhalten: Passwort-Sperre mit „auf diesem Gerät merken“ und „Sperren“; Suche (Freitext und „KW 41“); Liste nach Jahr gruppiert, neueste Woche markiert; Bericht-Ansicht mit Umschalter Seite/PDF, Teilen/Sichern der PDF, Blättern zwischen Wochen, Zurück direkt zur Übersicht; offline nutzbar; Updates beim nächsten Start.
- Kein Zoom in Übersicht und Sperre; Zoom im Bericht erlaubt.
- Statisches HTML/CSS/JS ohne Build-Schritt, ein `index.html`; pdf.js liegt lokal in `vendor/`.
- Verschlüsselung: AES-256-GCM, PBKDF2-SHA-256 600.000 Runden; Werkzeug `werkzeug/bericht-hinzufuegen.mjs`.
- Pro Bericht entschlüsselte Metadaten: Jahr, KW, Titel (erster Kernpunkt), Zeitraum, Kurzfassung, Format, PDF-Dateiname. Status (z. B. „Kein Handlungsbedarf“) und Kennzahlen werden derzeit nicht extrahiert.

## Brand Commitments

Keine. Name, Icon und Farben dürfen sich ändern (bestätigt: „Nichts weiter“ muss bleiben außer den Funktionen).

## Evidence on Hand

Echte Berichte KW 41, 42, 43/2026 im Archiv (verschlüsselt). Keine Kursdaten oder Kennzahlen außerhalb der Berichte; die App darf keine Zahlen erfinden.

## Product Principles

1. Der Bericht ist der Star: die Hülle tritt zurück, sobald gelesen wird.
2. Zwei Tipps bis zum Lesen: öffnen, Woche antippen.
3. Ruhig statt voll: wenige Informationen pro Eintrag, klare Hierarchie.
4. Ernst, aber nicht steril: kein Spiel, keine Gamification, kein düsteres Trading-Terminal.
5. Privat zuerst: nichts Persönliches unverschlüsselt.

## Accessibility & Inclusion

Wird auch abends bei gedimmtem Bildschirm genutzt: helles und dunkles Erscheinungsbild nach Systemeinstellung, ohne düstere Neon-Ästhetik (bestätigt als No-Go).
