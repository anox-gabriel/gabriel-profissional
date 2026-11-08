// Edita um vídeo do Dr. Messias em Reel 1080x1920: cortes, legenda palavra a palavra, título fixo e cartela final.
// Uso: node reel.mjs <config.json>   (roda com cwd = scratchpad)
import fs from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import path from "node:path";

const cfg = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const FF = path.resolve("tools/node_modules/ffmpeg-static/ffmpeg.exe");
const GAP = cfg.maxGap ?? 0.35;      // pausa máxima mantida dentro de um trecho
const PADL = 0.08, PADR = 0.14;

// 1) palavras da transcrição, com correções
const tx = JSON.parse(fs.readFileSync(cfg.tx, "utf8"));
let words = tx.chunks.map(c => ({ t: c.text.trim(), s: c.timestamp[0], e: c.timestamp[1] ?? c.timestamp[0] + 0.3 }));
const fixes = cfg.fixes || {};
for (const w of words) {
  const k = w.t.toLowerCase().replace(/[.,?!;:]/g, "");
  if (k in fixes) { const p = /[.,?!;:]$/.test(fixes[k]) ? "" : (w.t.match(/[.,?!;:]+$/)?.[0] || ""); w.t = fixes[k] === "" ? "" : fixes[k] + p; }
}
// correções em sequência ("a b" -> "x")
for (const [seq, rep] of Object.entries(cfg.seqFixes || {})) {
  const parts = seq.split(" ");
  for (let i = 0; i + parts.length <= words.length; i++) {
    const ok = parts.every((p, j) => words[i + j].t.toLowerCase().replace(/[.,?!;:]/g, "") === p);
    if (ok) { const p = /[.,?!;:]$/.test(rep) ? "" : (words[i + parts.length - 1].t.match(/[.,?!;:]+$/)?.[0] || ""); words[i].t = rep + p; for (let j = 1; j < parts.length; j++) words[i + j].t = ""; }
  }
}

// 2) trechos mantidos -> peças (removendo pausas longas)
const pieces = [];
for (const [rs, re] of cfg.keep) {
  const ws = words.filter(w => !w.used && w.s < re - 0.05 && (w.e > rs + 0.15 || w.s >= rs - 0.05)); ws.forEach(w => w.used = true);
  if (!ws.length) continue;
  let cur = { s: Math.max(rs, ws[0].s - PADL), e: 0, words: [] };
  for (let i = 0; i < ws.length; i++) {
    const w = ws[i];
    if (cur.words.length && w.s - ws[i - 1].e > GAP) {
      cur.e = Math.min(re, ws[i - 1].e + PADR); pieces.push(cur);
      cur = { s: Math.max(rs, w.s - PADL), e: 0, words: [] };
    }
    cur.words.push(w);
  }
  cur.e = Math.min(re, ws[ws.length - 1].e + PADR); pieces.push(cur);
}
// evita sobreposição
for (let i = 1; i < pieces.length; i++) if (pieces[i].s < pieces[i - 1].e) pieces[i].s = pieces[i - 1].e;
// remove silêncios reais (áudio) dentro das peças, mesmo quando a transcrição "estica" a palavra
{
  const log = spawnSync(FF, ["-hide_banner", "-i", cfg.src, "-af", "silencedetect=n=-32dB:d=0.7", "-vn", "-f", "null", "-"], { encoding: "utf8" }).stderr;
  const sil = []; const re = /silence_start: ([\d.]+)[\s\S]*?silence_end: ([\d.]+)/g; let m;
  while ((m = re.exec(log))) sil.push([+m[1], +m[2]]);
  const res = [];
  for (const p of pieces) {
    let cur = { ...p, words: [] }; const cuts = sil.filter(([a, b]) => a > p.s + 0.2 && b < p.e - 0.2);
    for (const [a, b] of cuts) { const end = a + 0.15, nxt = b - 0.12; res.push({ ...cur, e: end }); cur = { ...p, s: nxt, words: [] }; }
    res.push(cur);
  }
  for (const p of pieces) for (const w of p.words) { const t = res.find(r => w.s >= r.s - 0.15 && w.s < r.e) || res.find(r => r.s >= w.s) ; if (t) t.words.push(w); }
  pieces.length = 0; pieces.push(...res.filter(r => r.e - r.s > 0.15));
}

// 3) linha do tempo de saída
let T = 0; const outWords = [];
pieces.forEach((p, i) => {
  p.zoom = cfg.zoomPattern ? cfg.zoomPattern[i % cfg.zoomPattern.length] : (i % 2 ? 1.1 : 1);
  for (const w of p.words) if (w.t) outWords.push({ t: w.t, s: T + Math.max(0, w.s - p.s), e: T + Math.min(p.e - p.s, w.e - p.s) });
  p.out = T; T += p.e - p.s;
});
const mainDur = T;
// recalibra a legenda com a transcrição do próprio Reel final (mesmos cortes), quando existir
if (cfg.qa && fs.existsSync(cfg.qa)) {
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9%]/g, "");
  const sp = JSON.parse(fs.readFileSync(cfg.qa, "utf8")).chunks.map(c => ({ w: norm(c.text), s: c.timestamp[0], e: c.timestamp[1] ?? c.timestamp[0] + 0.3 }));
  let j = 0, n = 0;
  for (const w of outWords) {
    const k0 = norm(w.t);
    for (let k = j; k < Math.min(j + 6, sp.length); k++) if (sp[k].w === k0 && k0.length > 2 && Math.abs(sp[k].s - w.s) < 3) {
      if (Math.abs(sp[k].s - w.s) > 0.35) { w.s = sp[k].s; n++; } j = k + 1; break; }
  }
  // mantém ordem crescente
  for (let i = 1; i < outWords.length; i++) if (outWords[i].s < outWords[i - 1].s + 0.05) outWords[i].s = outWords[i - 1].s + 0.05;
  console.log(`recalibradas ${n} palavras`);
}

// 4) legendas ASS
const ts = x => { const h = Math.floor(x / 3600), m = Math.floor(x / 60) % 60, s = (x % 60); return `${h}:${String(m).padStart(2, "0")}:${s.toFixed(2).padStart(5, "0")}`; };
const esc = s => s.replace(/\{/g, "(").replace(/\}/g, ")");
const groups = []; let g = [];
for (const w of outWords) {
  const len = g.map(x => x.t).join(" ").length + w.t.length;
  if (g.length && (g.length >= 4 || len > 22 || w.s - g[g.length - 1].e > 0.6)) { groups.push(g); g = []; }
  g.push(w);
  if (/[.?!,;:]$/.test(w.t)) { groups.push(g); g = []; }
}
if (g.length) groups.push(g);
const GOLD = "&H0066B2D6&", WHITE = "&H00FFFFFF&";
let ev = [];
groups.forEach((gr, gi) => {
  const gEnd = Math.min(gr[gr.length - 1].e + 0.25, groups[gi + 1] ? groups[gi + 1][0].s : mainDur);
  gr.forEach((w, i) => {
    const s = i === 0 ? gr[0].s : w.s, e = gr[i + 1] ? gr[i + 1].s : gEnd;
    if (e <= s) return;
    const txt = gr.map((x, j) => (j === i ? `{\\c${GOLD}}` : `{\\c${WHITE}}`) + esc(x.t.toUpperCase())).join(" ");
    ev.push(`Dialogue: 1,${ts(s)},${ts(e)},Cap,,0,0,0,,${txt}`);
  });
});
// título fixo no topo
const [l1, l2] = cfg.title;
const titleTxt = `{\\fs${cfg.titleSize || 70}}{\\c${WHITE}}${esc(l1)}\\N{\\c${GOLD}}${esc(l2)}`;
ev.unshift(`Dialogue: 0,${ts(0)},${ts(mainDur)},Title,,0,0,0,,${titleTxt}`);
const ass = `[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 2

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Montserrat Thin ExtraBold,70,${WHITE},${WHITE},&H00000000&,&H96000000&,0,0,0,0,100,100,0,0,1,5,3,2,80,80,400,1
Style: Title,Playfair Display SemiBold,70,${WHITE},${WHITE},&H40331A0B&,&H40331A0B&,0,0,0,0,100,100,0,0,3,24,0,8,80,80,190,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
${ev.join("\n")}
`;
const assName = `work/${cfg.name}.ass`;
fs.mkdirSync("work", { recursive: true });
fs.writeFileSync(assName, ass, "utf8");

// 5) filtro ffmpeg
const END = cfg.endDur ?? 3;
let fc = "";
pieces.forEach((p, i) => {
  const z = p.zoom || 1, W = Math.round(1088 * z / 2) * 2, H = Math.round(1922 * z / 2) * 2;
  const y = Math.round((H - 1920) * 0.30), x = Math.round((W - 1080) / 2);
  const d = (p.e - p.s);
  fc += `[0:v]trim=${p.s.toFixed(3)}:${p.e.toFixed(3)},setpts=PTS-STARTPTS,scale=${W}:${H},crop=1080:1920:${x}:${y},fps=30,setsar=1[v${i}];`;
  fc += `[0:a]atrim=${p.s.toFixed(3)}:${p.e.toFixed(3)},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st=${Math.max(0, d - 0.03).toFixed(3)}:d=0.03[a${i}];`;
});
fc += pieces.map((_, i) => `[v${i}][a${i}]`).join("") + `concat=n=${pieces.length}:v=1:a=1[mv0][ma];`;
// B-roll: imagem/vídeo de apoio num card sobre fundo navy, no tempo da fala (tempo do vídeo original)
const map = t => { for (const p of pieces) if (t >= p.s - 0.05 && t <= p.e + 0.05) return p.out + Math.min(Math.max(t - p.s, 0), p.e - p.s); const nx = pieces.find(p => p.s > t); return nx ? nx.out : mainDur; };
const extraInputs = [];
let last = "mv0";
(cfg.broll || []).forEach((b, k) => {
  const idx = 2 + k;
  extraInputs.push(...(b.image ? ["-loop", "1", "-t", "200", "-i", b.file] : ["-i", b.file]));
  const t0 = map(b.at[0]), t1 = map(b.at[1]);
  const src = b.image ? `[${idx}:v]` : `[${idx}:v]trim=${b.from || 0}:${(b.from || 0) + (t1 - t0) + 0.5},setpts=PTS-STARTPTS,`;
  fc += `${src}${b.image ? "" : ""}${b.crop ? (b.image ? "" : "") + `crop=${b.crop},` : ""}scale=${b.w || 960}:${b.h || 1040}:force_original_aspect_ratio=increase,crop=${b.w || 960}:${b.h || 1040},setsar=1,format=yuv420p[bc${k}];`;
  fc += `color=c=0x0B1A33:s=1080x1920:r=30:d=${(t1 - t0 + 0.5).toFixed(2)}[bb${k}];[bb${k}][bc${k}]overlay=(W-w)/2:${b.y || 400},drawbox=x=(iw-${b.w || 960})/2-4:y=${(b.y || 400) - 4}:w=${(b.w || 960) + 8}:h=${(b.h || 1040) + 8}:color=0xD6B266@0.9:t=3,setpts=PTS-STARTPTS+${t0.toFixed(3)}/TB[bf${k}];`;
  fc += `[${last}][bf${k}]overlay=0:0:enable='between(t,${t0.toFixed(3)},${t1.toFixed(3)})':eof_action=pass[mvb${k}];`;
  last = `mvb${k}`;
});
fc += `[${last}]eq=contrast=1.04:saturation=1.05,ass=${assName}:fontsdir=fonts[mvs];`;
fc += `[ma]loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100[mas];`;
// cartela final
fc += `color=c=0x0B1A33:s=1080x1920:d=${END}:r=30,format=yuv420p[bg];[1:v]scale=560:-1[lg];[bg][lg]overlay=(W-w)/2:620[e1];`;
fc += `[e1]drawtext=fontfile=fonts2/Montserrat-SemiBold.ttf:text='AGENDE SUA AVALIAÇÃO':fontcolor=0xD6B266:fontsize=46:x=(w-tw)/2:y=1110,`;
fc += `drawtext=fontfile=fonts2/Montserrat-SemiBold.ttf:text='Paranavaí-PR  ·  Neurocirurgia':fontcolor=white:fontsize=36:x=(w-tw)/2:y=1190,setsar=1,fade=t=in:d=0.4[ev];`;
fc += `anullsrc=r=44100:cl=stereo,atrim=0:${END}[ea];`;
fc += `[mvs][mas][ev][ea]concat=n=2:v=1:a=1[ov][oa]`;
fs.writeFileSync(`work/${cfg.name}.fc.txt`, fc);
const args = ["-y", "-loglevel", "error", "-i", cfg.src, "-i", "work/logo-branco.png", ...extraInputs, "-filter_complex_script", `work/${cfg.name}.fc.txt`,
  "-map", "[ov]", "-map", "[oa]", "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", cfg.out];
execFileSync(FF, args, { stdio: "inherit" });
console.log(`${cfg.name}: ${pieces.length} cortes, ${mainDur.toFixed(1)}s + ${END}s cartela`);
fs.writeFileSync(`work/${cfg.name}.captions.txt`, groups.map(g => `${g[0].s.toFixed(1)} ${g.map(w => w.t).join(" ")}`).join("\n"));
