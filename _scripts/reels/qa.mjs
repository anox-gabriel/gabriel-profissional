// Compara legenda (ASS) com a fala real do Reel final (Whisper): sincronia e repetições.
// node qa.mjs <ass> <qa.json>
import fs from "node:fs";
const [assF, qaF] = process.argv.slice(2);
const toS = t => { const [h, m, s] = t.split(":"); return +h * 3600 + +m * 60 + +s; };
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9%]/g, "");
const cap = [];
for (const l of fs.readFileSync(assF, "utf8").split("\n")) {
  if (!l.startsWith("Dialogue: 1,")) continue;
  const p = l.split(","); const st = toS(p[1]);
  const m = l.match(/\{\\c&H0066B2D6&\}([^{]+)/); if (m) cap.push({ w: norm(m[1]), raw: m[1].trim(), s: st });
}
const sp = JSON.parse(fs.readFileSync(qaF, "utf8")).chunks.map(c => ({ w: norm(c.text), raw: c.text.trim(), s: c.timestamp[0] }));
// alinhamento guloso por janela
let j = 0; const diffs = []; const late = [];
for (const c of cap) {
  for (let k = j; k < Math.min(j + 8, sp.length); k++) if (sp[k].w === c.w && c.w.length > 2) { const d = c.s - sp[k].s; diffs.push(d); if (Math.abs(d) > 0.5) late.push(`${c.s.toFixed(1)}s "${c.raw}" legenda ${d > 0 ? "atrasada" : "adiantada"} ${Math.abs(d).toFixed(2)}s`); j = k + 1; break; }
}
diffs.sort((a, b) => a - b);
const med = diffs[Math.floor(diffs.length / 2)] ?? 0;
// repetições de 3+ palavras seguidas na fala
const reps = [];
for (let i = 0; i + 6 <= sp.length; i++) { const a = sp.slice(i, i + 3).map(x => x.w).join(" "), b = sp.slice(i + 3, i + 6).map(x => x.w).join(" "); if (a === b && a.length > 8) reps.push(`${sp[i].s.toFixed(1)}s "${sp.slice(i, i + 3).map(x => x.raw).join(" ")}" repetido`); }
console.log(`casadas ${diffs.length}/${cap.length} | desvio mediano ${med.toFixed(2)}s | >0.5s: ${late.length}`);
late.slice(0, 12).forEach(x => console.log("  " + x));
reps.forEach(x => console.log("  REPETIÇÃO " + x));
