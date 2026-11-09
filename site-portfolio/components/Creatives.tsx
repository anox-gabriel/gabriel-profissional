"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { creatives, type Group } from "@/lib/data";
import { SectionHead, Sparkle } from "./ornaments";
import Reveal from "./Reveal";
import Lightbox, { type LbItem } from "./Lightbox";
import { track } from "@/lib/track";

const groups: Group[] = ["all", "food", "health", "brands", "realestate", "events"];
const STEP = 12;

function useCols() {
  const [cols, setCols] = useState(2);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const md = window.matchMedia("(min-width: 768px)");
    const on = () => setCols(lg.matches ? 4 : md.matches ? 3 : 2);
    on();
    lg.addEventListener("change", on);
    md.addEventListener("change", on);
    return () => {
      lg.removeEventListener("change", on);
      md.removeEventListener("change", on);
    };
  }, []);
  return cols;
}

export default function Creatives() {
  const { lang, d } = useLang();
  const [group, setGroup] = useState<Group>("all");
  const [limit, setLimit] = useState(STEP);
  const [lb, setLb] = useState<number | null>(null);

  const list = useMemo(() => (group === "all" ? creatives : creatives.filter((c) => c.group === group)), [group]);
  const shown = list.slice(0, limit);
  const cols = useCols();
  const columns = useMemo(() => {
    const out: { c: (typeof creatives)[number]; i: number }[][] = Array.from({ length: cols }, () => []);
    shown.forEach((c, i) => out[i % cols].push({ c, i }));
    return out;
  }, [shown, cols]);

  const items: LbItem[] = useMemo(
    () =>
      list.map((c) => ({
        src: `/work/criativos/${c.id}.webp`,
        title: c.client,
        caption: d.creatives.filters[c.group][lang] + (c.ai ? ` · ${d.creatives.aiBadge[lang]}` : ""),
        w: c.w,
        h: c.h,
      })),
    [list, lang, d]
  );
  const close = useCallback(() => setLb(null), []);

  return (
    <section id="criativos" className="relative z-10 scroll-mt-20 py-16 sm:py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHead index="02" eyebrow={d.creatives.eyebrow[lang]} title={d.creatives.title[lang]} sub={d.creatives.sub[lang]} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-2.5" role="tablist">
            {groups.map((g) => (
              <button
                key={g}
                role="tab"
                aria-selected={group === g}
                onClick={() => {
                  setGroup(g);
                  setLimit(STEP);
                  track("filtro_criativos", { filtro: g });
                }}
                className={`relative rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition ${
                  group === g ? "border-cream text-ink" : "border-cream/20 text-cream/65 hover:border-cream/50 hover:text-cream"
                }`}
              >
                {group === g && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-cream" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">{d.creatives.filters[g][lang]}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 flex items-start gap-4 md:gap-5">
          {columns.map((col, ci) => (
            <div key={ci} className="flex min-w-0 flex-1 flex-col">
          {col.map(({ c, i }) => (
            <motion.button
              key={`${group}-${c.id}`}
              type="button"
              onClick={() => {
                setLb(i);
                track("abriu_criativo", { cliente: c.client, peca: c.id });
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
              className="group relative mb-4 block w-full overflow-hidden rounded-xl border border-cream/10 bg-ink-2 md:mb-5"
              aria-label={c.client}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/work/criativos/${c.id}.webp`}
                alt={c.client}
                width={c.w}
                height={c.h}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/10 to-transparent p-4 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="font-display text-base tracking-wider text-cream">{c.client}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-teal">{d.creatives.filters[c.group][lang]}</p>
              </div>
              {c.ai && (
                <span
                  title={d.creatives.aiBadge[lang]}
                  className="absolute bottom-3 right-3 grid h-7 w-7 place-items-center rounded-full border border-teal/50 bg-ink/75 text-teal backdrop-blur transition-opacity duration-300 group-hover:opacity-0"
                >
                  <Sparkle className="h-3 w-3" />
                </span>
              )}
            </motion.button>
          ))}
            </div>
          ))}
        </div>

        {limit < list.length && (
          <div className="mt-8 flex justify-center md:mt-12">
            <button
              type="button"
              onClick={() => setLimit((l) => l + STEP)}
              className="rounded-full border border-cream/25 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-cream transition hover:border-teal hover:text-teal"
            >
              {d.creatives.more[lang]} (+{Math.min(STEP, list.length - limit)})
            </button>
          </div>
        )}
      </div>

      <Lightbox items={items} index={lb} onClose={close} onIndex={setLb} mode="image" />
    </section>
  );
}
