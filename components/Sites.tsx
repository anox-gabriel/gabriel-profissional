"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { sites } from "@/lib/data";
import { SectionHead } from "./ornaments";
import Reveal from "./Reveal";
import Lightbox, { type LbItem } from "./Lightbox";

const INITIAL = 6;

export default function Sites() {
  const { lang, d } = useLang();
  const [all, setAll] = useState(false);
  const [lb, setLb] = useState<number | null>(null);

  const items: LbItem[] = useMemo(
    () =>
      sites.map((s) => ({
        src: `/work/sites/${s.id}-full.webp`,
        title: s.name,
        caption: s.tag[lang],
        w: 1440,
        h: Math.round((s.h / s.w) * 1440),
      })),
    [lang]
  );

  const shown = all ? sites : sites.slice(0, INITIAL);
  const close = useCallback(() => setLb(null), []);

  return (
    <section id="sites" className="relative z-10 scroll-mt-20 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHead index="01" eyebrow={d.sites.eyebrow[lang]} title={d.sites.title[lang]} sub={d.sites.sub[lang]} />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence initial={false}>
            {shown.map((s, i) => (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <button type="button" onClick={() => setLb(i)} className="group block w-full text-left" aria-label={`${d.sites.view[lang]}: ${s.name}`}>
                  <div className="relative overflow-hidden rounded-xl border border-cream/15 bg-ink-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-teal/60 group-hover:shadow-[0_40px_80px_-30px_rgba(38,166,154,.35)]">
                    <div className="flex items-center gap-1.5 border-b border-cream/10 px-3.5 py-2.5">
                      <span className="h-2 w-2 rounded-full bg-ruby/90" />
                      <span className="h-2 w-2 rounded-full bg-cream/35" />
                      <span className="h-2 w-2 rounded-full bg-teal/80" />
                      <span className="ml-3 h-4 flex-1 truncate rounded-full bg-cream/[0.06] px-3 text-[9px] leading-4 tracking-wider text-cream/35">
                        {s.name}
                      </span>
                    </div>
                    <div className="relative aspect-[16/11] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/work/sites/${s.id}.webp`}
                        alt={s.name}
                        width={s.w}
                        height={s.h}
                        loading="lazy"
                        decoding="async"
                        className="scroll-shot"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/60 to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
                    </div>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-wider text-cream transition-colors group-hover:text-teal">{s.name}</h3>
                      <p className="mt-1.5 text-[11px] uppercase tracking-[0.24em] text-cream/45">{s.tag[lang]}</p>
                    </div>
                    <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/20 text-cream/70 transition-all group-hover:rotate-45 group-hover:border-teal group-hover:text-teal">
                      ↗
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => {
              if (all) document.getElementById("sites")?.scrollIntoView({ behavior: "smooth" });
              setAll((a) => !a);
            }}
            className="rounded-full border border-cream/25 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-cream transition hover:border-teal hover:text-teal"
          >
            {all ? d.sites.less[lang] : `${d.sites.more[lang]} (${sites.length})`}
          </button>
        </div>
      </div>

      <Lightbox items={items} index={lb} onClose={close} onIndex={setLb} mode="page" />
    </section>
  );
}
