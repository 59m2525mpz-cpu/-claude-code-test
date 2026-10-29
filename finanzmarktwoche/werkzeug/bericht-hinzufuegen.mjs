#!/usr/bin/env node
// Legt einen Wochenbericht verschlüsselt im Archiv ab (daten/index.json + daten/<id>.json).
//
//   FMW_PASSWORT=... node bericht-hinzufuegen.mjs --datei bericht.html
//   FMW_PASSWORT=... node bericht-hinzufuegen.mjs --datei marktrueckblick-2026-10-09.md [--kw 41 --jahr 2026] [--titel "..."]
//   FMW_PASSWORT=... node bericht-hinzufuegen.mjs --datei bericht.md --pdf Finanzmarkt-Wochenbericht_KW41_2026.pdf
//   FMW_PASSWORT=... FMW_PASSWORT_NEU=... node bericht-hinzufuegen.mjs --passwort-aendern
//
// HTML-Berichte (Vorlage der geplanten Aufgabe) liefern KW, Jahr, Zeitraum und Titel selbst,
// dazu die eingebettete PDF (pdf-data). Die PDF landet verschlüsselt in daten/<id>.pdf.json.
// Bei Markdown kommen KW und Jahr aus --kw/--jahr oder aus dem Datum im Dateinamen.
// Ohne Änderung am Inhalt wird nichts geschrieben (Ausgabe "unverändert").

import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const subtle = globalThis.crypto.subtle;
const DATEN = join(dirname(fileURLToPath(import.meta.url)), "..", "daten");
const INDEX = join(DATEN, "index.json");
const ITERATIONEN = 600000;

const b64 = (buf) => Buffer.from(buf).toString("base64");
const unb64 = (s) => new Uint8Array(Buffer.from(s, "base64"));

function args() {
  const a = process.argv.slice(2), o = {};
  for (let i = 0; i < a.length; i++) {
    if (!a[i].startsWith("--")) continue;
    const k = a[i].slice(2);
    if (a[i + 1] !== undefined && !a[i + 1].startsWith("--")) o[k] = a[++i]; else o[k] = true;
  }
  return o;
}

async function schluessel(passwort, salt) {
  const basis = await subtle.importKey("raw", new TextEncoder().encode(passwort), "PBKDF2", false, ["deriveKey"]);
  return subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", salt, iterations: ITERATIONEN }, basis,
    { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}
async function verschluesseln(key, obj) {
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  const ct = await subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(JSON.stringify(obj)));
  return { iv: b64(iv), ct: b64(ct) };
}
async function bytesVerschluesseln(key, bytes) {
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  return { iv: b64(iv), ct: b64(await subtle.encrypt({ name: "AES-GCM", iv }, key, bytes)) };
}
async function bytesEntschluesseln(key, box) {
  return new Uint8Array(await subtle.decrypt({ name: "AES-GCM", iv: unb64(box.iv) }, key, unb64(box.ct)));
}
async function entschluesseln(key, box) {
  const pt = await subtle.decrypt({ name: "AES-GCM", iv: unb64(box.iv) }, key, unb64(box.ct));
  return JSON.parse(new TextDecoder().decode(pt));
}

async function ladeIndex(passwort) {
  if (!existsSync(INDEX)) {
    const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
    const key = await schluessel(passwort, salt);
    const index = { version: 1, kdf: { name: "PBKDF2", hash: "SHA-256", iterations: ITERATIONEN, salt: b64(salt) },
      pruefung: await verschluesseln(key, "ok"), berichte: [] };
    return { index, key };
  }
  const index = JSON.parse(await readFile(INDEX, "utf8"));
  const key = await schluessel(passwort, unb64(index.kdf.salt));
  try { await entschluesseln(key, index.pruefung); }
  catch { throw new Error("Falsches Passwort für dieses Archiv."); }
  return { index, key };
}

// ISO-Kalenderwoche eines Datums
function isoWoche(d) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const jahr = t.getUTCFullYear();
  return { jahr, kw: Math.ceil(((t - Date.UTC(jahr, 0, 1)) / 864e5 + 1) / 7) };
}
const ohneTags = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

function ausHtml(html) {
  // Eingebettete PDF sichern, dann Skelett, Skripte und PDF-Knopf entfernen; nur Titel, Stil und Inhalt bleiben
  const pdfTag = html.match(/<script[^>]*id="pdf-data"[^>]*>([\s\S]*?)<\/script>/i);
  let pdf = null;
  if (pdfTag) {
    const daten = pdfTag[1].replace(/\s+/g, "");
    const name = (pdfTag[0].match(/data-filename="([^"]+)"/) || [])[1];
    if (daten.length > 1000 && daten.startsWith("JVBER")) pdf = { name: name && name !== "PDF_FILENAME" ? name : null, bytes: unb64(daten) };
  }
  let h = html.replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<button\b[^>]*class="dl"[\s\S]*?<\/button>/gi, "");
  const body = h.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (body) h = body[1];
  const kw = Number((h.match(/class="week"[\s\S]*?class="n">\s*(\d{1,2})\s*</) || [])[1]);
  const jahr = Number((h.match(/class="week"[\s\S]*?class="y">\s*(\d{4})\s*</) || [])[1]);
  const sub = ohneTags((h.match(/class="sub">([\s\S]*?)<\/div>/) || [, ""])[1]);
  const zeitraum = sub.split("·")[0].replace(/^Woche vom\s*/i, "").trim();
  const summary = (h.match(/class="[^"]*summary[^"]*"[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/) || [, ""])[1];
  const ersterPunkt = (summary.match(/<li>([\s\S]*?)<\/li>/) || [, ""])[1];
  const titel = ohneTags((ersterPunkt.match(/<b>([\s\S]*?)<\/b>/) || [, ""])[1]).replace(/:$/, "");
  const kurz = ohneTags(ersterPunkt.replace(/<b>[\s\S]*?<\/b>/, ""));
  return { kw, jahr, zeitraum, titel, kurz, format: "html", inhalt: h.trim(), pdf };
}

function ausMarkdown(md, datei) {
  const datum = basename(datei).match(/(\d{4})-(\d{2})-(\d{2})/);
  const w = datum ? isoWoche(new Date(+datum[1], +datum[2] - 1, +datum[3])) : {};
  const titel = ((md.match(/^#\s+(.+)$/m) || [, ""])[1]).trim();
  const kurz = ((md.split("\n").find((z) => /^\s*[-*]\s+\S/.test(z)) || "").replace(/^\s*[-*]\s+/, "").replace(/[*_`]/g, "")).trim();
  return { kw: w.kw, jahr: w.jahr, zeitraum: "", titel, kurz, format: "md", inhalt: md, pdf: null };
}

async function hinzufuegen(o, passwort) {
  if (!o.datei) throw new Error("--datei fehlt.");
  const roh = await readFile(o.datei, "utf8");
  const b = /\.md$/i.test(o.datei) ? ausMarkdown(roh, o.datei) : ausHtml(roh);
  if (o.kw) b.kw = Number(o.kw);
  if (o.jahr) b.jahr = Number(o.jahr);
  if (o.titel) b.titel = String(o.titel);
  if (o.zeitraum) b.zeitraum = String(o.zeitraum);
  if (o.pdf) {
    const bytes = new Uint8Array(await readFile(o.pdf));
    if (new TextDecoder().decode(bytes.slice(0, 5)) !== "%PDF-") throw new Error(o.pdf + " ist keine PDF.");
    b.pdf = { name: basename(o.pdf), bytes };
  }
  if (!(b.kw >= 1 && b.kw <= 53) || !(b.jahr >= 2000)) throw new Error("KW/Jahr nicht erkannt. Bitte --kw und --jahr angeben.");
  if (!b.titel) b.titel = "Wochenbericht KW " + b.kw;

  const id = `${b.jahr}-kw${String(b.kw).padStart(2, "0")}`;
  const h = createHash("sha256").update(b.format + "\n" + b.inhalt);
  if (b.pdf) h.update(b.pdf.bytes);
  const hash = h.digest("hex").slice(0, 16);
  const { index, key } = await ladeIndex(passwort);
  const alt = index.berichte.find((x) => x.id === id);
  if (alt && alt.hash === hash && !o.erzwingen) { console.log(`unverändert: ${id}`); return; }

  const pdfName = b.pdf ? b.pdf.name || `Finanzmarkt-Wochenbericht_KW${b.kw}_${b.jahr}.pdf` : null;
  const meta = { jahr: b.jahr, kw: b.kw, titel: b.titel, zeitraum: b.zeitraum, kurz: b.kurz, format: b.format,
    pdf: pdfName, gespeichert: new Date().toISOString() };
  await mkdir(DATEN, { recursive: true });
  await writeFile(join(DATEN, id + ".json"), JSON.stringify(await verschluesseln(key, { inhalt: b.inhalt })));
  const pdfDatei = join(DATEN, id + ".pdf.json");
  if (b.pdf) await writeFile(pdfDatei, JSON.stringify(await bytesVerschluesseln(key, b.pdf.bytes)));
  else if (existsSync(pdfDatei)) await rm(pdfDatei);
  const eintrag = { id, hash, ...(await verschluesseln(key, meta)) };
  index.berichte = index.berichte.filter((x) => x.id !== id).concat(eintrag).sort((x, y) => y.id.localeCompare(x.id));
  await writeFile(INDEX, JSON.stringify(index, null, 1) + "\n");
  console.log(`${alt ? "ersetzt" : "neu"}: ${id} · ${b.titel}${b.pdf ? " (mit PDF)" : " (ohne PDF)"}`);
}

async function passwortAendern(passwort) {
  const neu = process.env.FMW_PASSWORT_NEU;
  if (!neu || neu.length < 10) throw new Error("FMW_PASSWORT_NEU fehlt oder ist kürzer als 10 Zeichen.");
  const { index, key } = await ladeIndex(passwort);
  const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
  const neuKey = await schluessel(neu, salt);
  for (const e of index.berichte) {
    const meta = await entschluesseln(key, e);
    const datei = join(DATEN, e.id + ".json");
    const inhalt = await entschluesseln(key, JSON.parse(await readFile(datei, "utf8")));
    await writeFile(datei, JSON.stringify(await verschluesseln(neuKey, inhalt)));
    const pdfDatei = join(DATEN, e.id + ".pdf.json");
    if (existsSync(pdfDatei)) {
      const bytes = await bytesEntschluesseln(key, JSON.parse(await readFile(pdfDatei, "utf8")));
      await writeFile(pdfDatei, JSON.stringify(await bytesVerschluesseln(neuKey, bytes)));
    }
    Object.assign(e, await verschluesseln(neuKey, meta));
  }
  index.kdf.salt = b64(salt);
  index.pruefung = await verschluesseln(neuKey, "ok");
  await writeFile(INDEX, JSON.stringify(index, null, 1) + "\n");
  console.log(`Passwort geändert, ${index.berichte.length} Berichte neu verschlüsselt.`);
}

const o = args();
const passwort = process.env.FMW_PASSWORT;
try {
  if (!passwort) throw new Error("Umgebungsvariable FMW_PASSWORT fehlt.");
  if (o["passwort-aendern"]) await passwortAendern(passwort); else await hinzufuegen(o, passwort);
} catch (e) {
  console.error("Fehler: " + e.message);
  process.exit(1);
}
