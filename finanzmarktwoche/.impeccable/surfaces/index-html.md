---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Finanzmarktwoche · App-Hülle (Sperre, Archiv, Bericht)

Scope: die ganze Web-App `finanzmarktwoche/index.html`. Mode: Operate. Build: code-led.
Job: Woche finden, antippen, lesen (zwei Tipps). Bestätigt: schnell zum Bericht, nicht verspielt, nicht zu voll, nicht düster.

## Direction contract

THESIS: Das Archiv ist ein Regal beschrifteter Ordner. Jede Woche hat ein Rückenschild mit ihrer KW, jeder Monat einen eigenen Regalboden. Verweigert wird die austauschbare Banking-Liste mit blauer Navigationsleiste und Karten sowie das dunkle Trading-Terminal.

OWN-WORLD: Büroarchiv. Kühles Pappgrau als Grund, Ordnerblau als Kopfband und Leseleiste, weiße Etiketten mit schwarzer Normschrift-Ziffer (Sofia Sans Condensed, selbst gehostet), Signalgelb nur für das Etikett der neuesten Woche. Regalböden als kräftige Linie mit weichem Schatten darunter. Dunkel: tiefes Schiefer statt Schwarz, Etiketten hellgrau, kein Neon. UI-Text in der Systemschrift.

STORY: Öffnen, die neueste Woche ist sofort zu sehen und markiert; tippen und lesen. Ältere Wochen sind nach Monaten auffindbar, die Suche ist darüber.

FIRST VIEWPORT: Ordnerblaues Kopfband mit „Finanzmarktwoche“, Bestandszeile und Sperr-Symbol rechts. Darunter das Suchfeld. Dann der Regalboden des aktuellen Monats mit Zeilen: links das Etikett „KW 43“, daneben Zeitraum, Titel und eine Zeile Kernaussage, rechts ein Chevron. Die Zeile selbst ist die primäre Aktion.

FORM: Archivregal, Platz 1 meiner Liste (vom Nutzer gewählt statt der ausgelosten Platz 3). seed:2e75da810774b800. Signatur: Etikett-Ziffer gleitet beim Öffnen per View Transition in die Leseleiste.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
