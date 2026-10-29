---
name: Finanzmarktwoche
description: Privates Leseregal für wöchentliche Finanzmarkt-Berichte, gestaltet als Büroarchiv mit beschrifteten Ordnerrücken.
colors:
  binder: "#1f3a5f"
  binder-deep: "#172d4b"
  on-binder: "#ffffff"
  on-binder-muted: "#bccadc"
  signal: "#f2c230"
  signal-edge: "#d4a514"
  ground: "#e4e8ed"
  fach: "#f6f7f9"
  board: "#c3cbd5"
  rule: "#dde2e8"
  ink: "#18202d"
  muted: "#566173"
  label: "#ffffff"
  label-edge: "#c9d0d9"
  label-ink: "#121822"
  focus: "#2f6fd8"
  danger: "#b4232c"
  reader-sheet: "#ffffff"
  binder-dark: "#1d3352"
  binder-deep-dark: "#162740"
  on-binder-muted-dark: "#a9b9cf"
  signal-dark: "#ddb02a"
  signal-edge-dark: "#b98f12"
  ground-dark: "#111824"
  fach-dark: "#19222f"
  board-dark: "#2c3748"
  rule-dark: "#263142"
  ink-dark: "#e3e8ef"
  muted-dark: "#9aa6b8"
  label-dark: "#d9dfe7"
  label-edge-dark: "#aab4c2"
  label-ink-dark: "#111824"
  focus-dark: "#7aa7f0"
  danger-dark: "#ff8d86"
typography:
  display:
    fontFamily: "Sofia Sans Condensed, Arial Narrow, Roboto Condensed, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.005em"
  label-numeral:
    fontFamily: "Sofia Sans Condensed, Arial Narrow, Roboto Condensed, system-ui, sans-serif"
    fontSize: "31px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontFeature: "tnum"
  label-kw:
    fontFamily: "Sofia Sans Condensed, Arial Narrow, Roboto Condensed, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
  shelf-label:
    fontFamily: "Sofia Sans Condensed, Arial Narrow, Roboto Condensed, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.1em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.45
  body-small:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.45
  meta:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
    fontFeature: "tnum"
  button:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.45
rounded:
  board: "1px"
  sheet: "2px"
  fach: "6px"
  label: "7px"
  control-compact: "9px"
  control: "10px"
spacing:
  gutter: "16px"
  row: "12px"
  row-gap: "14px"
  shelf: "22px"
  column: "640px"
components:
  kopfband:
    backgroundColor: "{colors.binder}"
    textColor: "{colors.on-binder}"
    typography: "{typography.display}"
    padding: "20px 16px 18px"
  etikett:
    backgroundColor: "{colors.label}"
    textColor: "{colors.label-ink}"
    typography: "{typography.label-numeral}"
    rounded: "{rounded.label}"
    width: "54px"
    height: "62px"
  etikett-signal:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.label-ink}"
    rounded: "{rounded.label}"
  archiv-zeile:
    backgroundColor: "{colors.fach}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "12px"
  regalboden-titel:
    textColor: "{colors.muted}"
    typography: "{typography.shelf-label}"
  input-feld:
    backgroundColor: "{colors.fach}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 14px"
  button-primary:
    backgroundColor: "{colors.binder}"
    textColor: "{colors.on-binder}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px"
  button-primary-active:
    backgroundColor: "{colors.binder-deep}"
    textColor: "{colors.on-binder}"
  symbol-knopf:
    textColor: "{colors.on-binder}"
    rounded: "{rounded.control}"
    size: "44px"
  segment-aktiv:
    backgroundColor: "{colors.label}"
    textColor: "{colors.label-ink}"
    rounded: "{rounded.label}"
    padding: "6px 18px"
  leseleiste:
    backgroundColor: "{colors.binder}"
    textColor: "{colors.on-binder}"
---

# Design System: Finanzmarktwoche

## Overview

**Creative North Star: "Das Archivregal"**

Die App ist ein Büroarchiv in der Hosentasche: Jede Woche steht als Ordner im Regal, mit einem weißen Rückenschild, auf dem in schwarzer Normschrift die Kalenderwoche steht. Jeder Monat bekommt einen eigenen Regalboden. Ordnerblau trägt den Kopf und die Leseleiste, kühles Pappgrau ist der Grund, und nur das Schild der neuesten Woche ist signalgelb. Das System ist ruhig, ernst und sachlich, aber nicht steril; es ist die Ordnung einer gut geführten Registratur, nicht die eines Handelsterminals.

Die Dichte ist niedrig: pro Woche ein Schild, ein Zeitraum, ein Titel, höchstens zwei Zeilen Kernaussage. Die Hülle tritt zurück, sobald gelesen wird. Der Bericht bringt sein eigenes helles Layout mit und wird auf weißem Blatt gezeigt; die App gestaltet nur Rahmen, Leiste und Wege dorthin.

Die einzige Bewegung mit Charakter ist die Signatur: Beim Öffnen gleitet das Etikett der angetippten Woche per View Transition aus der Zeile in die Leseleiste und beim Zurückkehren wieder an seinen Platz. Alles andere reagiert knapp und ohne Schmuck.

**Key Characteristics:**
- Ordnerblaues Kopfband und ordnerblaue Leseleiste als feste Klammer der App, auch unter der Statusleiste.
- Weiße Rückenschilder mit großer Normschrift-Ziffer (Sofia Sans Condensed) als Erkennungszeichen jeder Woche.
- Signalgelb ausschließlich für das Schild der neuesten Woche.
- Regalboden als kräftige graue Linie mit weichem Schatten darunter; sonst flach.
- UI-Text in der Systemschrift; die Etikettschrift bleibt Schildern, Kopf und Bodenbeschriftung vorbehalten.
- Dunkel: tiefes Schiefer statt Schwarz, hellgraue Schilder, kein Neon.

## Colors

Eine kühle, entsättigte Bürowelt aus Pappgrau und Ordnerblau mit genau einem warmen Signal.

### Primary
- **Ordnerblau** (`binder`): Kopfband, Leseleiste, Modusleiste, Statusleisten-Streifen, Hauptknopf „Archiv öffnen“ und die Häkchen-Akzentfarbe. Es ist die Farbe des Ordners selbst, nicht eine Linkfarbe.
- **Tiefes Ordnerblau** (`binder-deep`): nur der gedrückte Zustand des Hauptknopfs.
- **Weiß auf Ordner** (`on-binder`) und **Etikettgrau auf Ordner** (`on-binder-muted`): Text und Symbole auf dem Band; das gedämpfte Grau für Bestandszeile und Jahresangabe.

### Secondary
- **Signalgelb** (`signal`) mit **Signalgelb-Kante** (`signal-edge`): Füllung und Rand des Schilds der neuesten Woche, in Liste und Leseleiste; außerdem die Textauswahl. Nirgends sonst.

### Neutral
- **Pappgrau** (`ground`): Seitengrund hinter allen Regalen, Hintergrund der PDF-Ansicht.
- **Fachweiß** (`fach`): Innenfläche eines Regalfachs, Eingabefelder.
- **Brettgrau** (`board`): das Regalbrett unter jedem Monat, Ränder von Feldern und Nebenknöpfen.
- **Fugengrau** (`rule`): 1px-Trennlinie zwischen zwei Zeilen im selben Fach.
- **Tinte** (`ink`): Titel und Fließtext.
- **Bleistiftgrau** (`muted`): Zeitraum, Kernaussage, Bodenbeschriftung, Chevrons, Platzhalter.
- **Etikettweiß** (`label`), **Etikettkante** (`label-edge`), **Etikettschwarz** (`label-ink`): die Rückenschilder und das aktive Segment im Umschalter.
- **Leseblatt** (`reader-sheet`): fester weißer Grund hinter dem Bericht und den PDF-Seiten, in beiden Erscheinungsbildern.

### Status
- **Fokusblau** (`focus`): 2px-Fokusrahmen mit 2px Abstand an jedem bedienbaren Element; im Dunkeln auch die Schreibmarke.
- **Siegelrot** (`danger`): ausschließlich die Fehlermeldung der Sperre.

### Dunkles Erscheinungsbild
Jeder Token hat ein `-dark`-Gegenstück, das per `prefers-color-scheme: dark` greift. Grund und Fächer werden tiefes Schiefer (`ground-dark`, `fach-dark`), Schilder hellgrau (`label-dark`) mit dunkler Ziffer, das Signalgelb wird leicht gedämpft (`signal-dark`). Weiß auf Ordner bleibt weiß.

### Named Rules
**The Ein-Signal Rule.** Signalgelb markiert genau ein Schild: die neueste Woche. Kein Knopf, kein Hinweis, kein Status bekommt Gelb.

**The Ordnerklammer Rule.** Ordnerblau ist Fläche, nicht Text. Es füllt Band, Leiste und Hauptknopf; Links und Akzenttexte werden daraus nicht gefärbt.

**The Schiefer-statt-Schwarz Rule.** Das dunkle Erscheinungsbild bleibt blaugrau und gedämpft; kein reines Schwarz, keine leuchtenden Akzente.

## Typography

**Display Font:** Etikett, selbst gehostete Sofia Sans Condensed 700 und 800 (mit Arial Narrow, Roboto Condensed, Systemschrift)
**Body Font:** Systemschrift (-apple-system, SF Pro Text, Segoe UI, Roboto, Arial)

**Character:** Eine schmale, kräftige Normschrift wie auf gedruckten Ordnerschildern steht neben der unaufdringlichen Systemschrift des Geräts. Die Normschrift beschriftet, die Systemschrift erzählt.

### Hierarchy
- **Display** (800, 32px, 1): Name „Finanzmarktwoche“ im Kopfband von Sperre und Archiv.
- **Etikett-Ziffer** (800, 31px, 1, tabellarische Ziffern): die zweistellige KW auf dem Rückenschild. Auf der Sperre 37px, in der Leseleiste 21px.
- **Etikett-KW** (700, 12px, 0.08em, 70 % Deckkraft): das kleine „KW“ über der Ziffer; in der Leseleiste 11px.
- **Bodenbeschriftung** (700, 15px, 0.1em, Versalien): Monatsname mit Jahr über jedem Regalboden, in Bleistiftgrau. Sie ist die echte Überschrift (h2) des Bodens.
- **Title** (600, 16px, 1.3): Wochentitel in der Zeile, ausgeglichen umbrochen.
- **Body** (400, 16px, 1.45): Grundtext; Hinweise auf der Sperre 15px, höchstens 34ch breit.
- **Body small** (400, 14px): Kernaussage (höchstens zwei Zeilen, dann abgeschnitten), Bestandszeile, Jahresangabe.
- **Meta** (400, 13px, tabellarische Ziffern): Zeitraum „19.10. bis 23.10.2026“ über dem Titel.
- **Button** (600, 17px): Hauptknopf und Passwortfeld; kleine Knöpfe in Leiste und Umschalter 14px/600.

### Named Rules
**The Schildschrift Rule.** Die Etikettschrift erscheint nur auf Schildern, im Namen des Kopfbands und in der Bodenbeschriftung. Titel, Texte, Knöpfe und Felder stehen in der Systemschrift.

**The Ziffern-Stehen Rule.** Jede Zahl, die verglichen wird (KW, Zeiträume, Bestand), steht in tabellarischen Ziffern, damit die Schilder im Regal bündig wirken.

## Layout

Eine einzige Spalte von höchstens 640px, zentriert, mit einem seitlichen Abstand von mindestens 16px, der die Safe Areas des iPhones respektiert. Oben das Kopfband (auf der Sperre hoch, im Archiv knapp), darunter das Suchfeld, dann die Regalböden in absteigender Zeit, 22px voneinander getrennt. Jeder Boden besteht aus Beschriftung, Fach mit Zeilen und Brett.

Eine Zeile ist die ganze Schaltfläche: Schild links (54 × 62px), daneben Zeitraum, Titel und Kernaussage gestapelt (2px Abstand), rechts ein Chevron; Innenabstand 12px, Abstand zwischen Schild und Text 14px. Zeilen im selben Fach sind nur durch eine 1px-Fuge getrennt.

Die Leseansicht füllt den Bildschirm: Leseleiste als dreispaltiges Raster (Zurück links, Schild mit Jahr mittig, Blättern rechts), darunter die Modusleiste mit Umschalter Seite/PDF und Teilen, dann der Bericht randlos. PDF-Seiten stehen auf Pappgrau, 10px voneinander, höchstens 900px breit.

Unten bekommt jede Ansicht den Safe-Area-Abstand plus 32 bis 40px Luft. Übersicht und Sperre sind nicht zoombar; der Bericht schon.

## Elevation & Depth

Das System ist flach. Tiefe entsteht durch Tonstufen (Pappgrau → Fachweiß → Etikettweiß) und an genau zwei Stellen durch weiche Schatten, die beide aus der Archivwelt kommen: das Regalbrett und das Papierblatt.

### Shadow Vocabulary
- **Brettschatten** (`box-shadow: 0 8px 12px -6px rgba(18, 28, 45, .35)`): unter dem 6px hohen Regalbrett jedes Monats, das 6px links und rechts über das Fach hinausragt.
- **Blattschatten** (`box-shadow: 0 1px 3px rgba(18, 28, 45, .18)`): unter jeder gerenderten PDF-Seite.

### Named Rules
**The Brett-trägt Rule.** Schatten gibt es nur dort, wo im Archiv etwas aufliegt: Brett und Blatt. Zeilen, Fächer, Felder und Knöpfe bleiben flach.

## Shapes

Weiche, aber knappe Ecken, wie gestanzte Pappe. Schilder 7px, Fächer oben 6px und unten gerade, weil sie auf dem Brett stehen. Bedienfelder in voller Breite (Passwort, Suche, Hauptknopf, Sperr-Symbol) 10px, kompakte Knöpfe in Leiste, Umschalter und Leerzustand 9px. Das Brett hat 1px, PDF-Seiten 2px. Ränder sind 1px und farbig nach Rolle: Etikettkante um Schilder, Brettgrau um Felder.

## Components

### Rückenschild (Etikett)
Das Erkennungszeichen jeder Woche. Weißes Schild mit 1px-Etikettkante, oben „KW“ klein und gesperrt, darunter die zweistellige Ziffer groß. Die neueste Woche bekommt Signalgelb mit gelber Kante. In der Leseleiste wird das Schild waagerecht (30px hoch, KW und Ziffer nebeneinander) und trägt dieselbe Markierung, wenn die neueste Woche offen ist.

**Signatur:** Beim Öffnen gleitet das Schild per View Transition (240ms, `cubic-bezier(.22, 1, .36, 1)`) aus der Zeile in die Leseleiste, beim Zurückkehren zurück; der Rest der Seite blendet in 180ms. Ohne View-Transition-Unterstützung oder bei reduzierter Bewegung wechselt die Ansicht sofort.

### Archivzeile
- **Form:** volle Breite des Fachs, transparent auf Fachweiß, keine eigene Ecke.
- **Inhalt:** Schild, Zeitraum (Meta), Titel (Title), Kernaussage (Body small, zwei Zeilen), Chevron in Bleistiftgrau.
- **Druck:** Hintergrund wird für 120ms leicht ordnerblau getönt (7 % im Hellen, 5 % Weiß im Dunkeln).
- **Barrierefreiheit:** die Zeile ist ein Knopf mit vollständiger Beschriftung inklusive „neueste Woche“.

### Regalboden
Bodenbeschriftung (Monat und Jahr), darunter das Fach mit den Zeilen, darunter das Brett mit Brettschatten. Treffer der Suche und der Leerzustand stehen im selben Fach.

### Kopfband
Ordnerblau, reicht unter die Statusleiste. Archiv: Name und Bestandszeile („3 Berichte · zuletzt KW 43/2026“) links, Sperr-Symbol (44 × 44px, 10 % Weiß, beim Drücken 20 %) rechts, unten bündig. Sperre: höheres Band mit großem Schild (64 × 74px, Ziffer 37px) neben dem Namen und „Archiv gesperrt“.

### Buttons
- **Shape:** Bedienfeld-Ecke (10px).
- **Primary:** Ordnerblau mit weißer Schrift, 14px Innenabstand, volle Breite. Beim Drücken tiefes Ordnerblau und 98 % Größe (160ms). Deaktiviert 65 % Deckkraft.
- **Leistenknöpfe:** transparent auf Ordnerblau, Ecke 9px, beim Drücken 14 % Weiß, deaktiviert 35 %.
- **Nebenknopf** (Leerzustand „Suche löschen“, Teilen): transparent mit 1px-Rand (Brettgrau bzw. 30 % Weiß), Ecke 9px, 14 bis 15px/600.

### Umschalter Seite/PDF
Segmentgruppe auf 12 % Weiß über Ordnerblau, 2px Innenrand, Ecke 9px. Das aktive Segment ist ein kleines Etikett: Etikettweiß mit Etikettschwarz, Ecke 7px. Wechsel 160ms.

### Inputs / Fields
- **Style:** Fachweiß, 1px Brettgrau, Ecke 10px, 13 × 14px Innenabstand, 17px Schrift (verhindert iOS-Zoom). Suche mit Lupe 12px vom linken Rand.
- **Focus:** globaler Fokusrahmen in Fokusblau; Schreibmarke Ordnerblau (dunkel: Fokusblau).
- **Error:** Text in Siegelrot unter dem Hauptknopf, Platz ist reserviert, damit nichts springt.

### Leseleiste
Ordnerblau, dreispaltig: „‹ Archiv“ links, waagerechtes Schild und Jahr mittig, Pfeile für neuere und ältere Woche rechts (40 × 40px). Darunter die Modusleiste im selben Blau. Der Bericht selbst steht auf weißem Leseblatt in beiden Erscheinungsbildern.

## Do's and Don'ts

### Do:
- **Do** jede Woche mit einem Rückenschild zeigen: „KW“ klein, Ziffer zweistellig, Etikettschrift 800, tabellarisch.
- **Do** Signalgelb nur auf das Schild der neuesten Woche legen (The Ein-Signal Rule).
- **Do** Wochen nach Monat auf Regalböden gruppieren: Bodenbeschriftung, Fach mit 1px-Fugen, Brett mit Brettschatten.
- **Do** Kopfband und Leseleiste ordnerblau halten, auch unter der Statusleiste.
- **Do** die ganze Zeile als Schaltfläche bauen; das Chevron ist Hinweis, nicht Ziel.
- **Do** neue Ansichten an die Signatur anbinden: das Schild ist das Objekt, das zwischen Archiv und Bericht wandert, und es respektiert reduzierte Bewegung.
- **Do** im Dunkeln auf Schiefer (`ground-dark`) und hellgraue Schilder wechseln.

### Don't:
- **Don't** Wochen als einzeln schwebende Karten mit eigenem Schatten darstellen; Zeilen teilen sich ein Fach.
- **Don't** Schatten außer Brett und Blatt einsetzen (The Brett-trägt Rule).
- **Don't** die Etikettschrift für Titel, Fließtext oder Knöpfe verwenden (The Schildschrift Rule).
- **Don't** Gelb, Rot oder Blau für Kursbewegungen, Status oder Kennzahlen einführen; die App zeigt keine eigenen Zahlen.
- **Don't** reines Schwarz, Neon oder leuchtende Akzente im dunklen Erscheinungsbild.
- **Don't** den Bericht einfärben oder in das dunkle Schema zwingen; das Leseblatt bleibt weiß.
