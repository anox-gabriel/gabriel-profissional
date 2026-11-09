"use client";

import { useLang } from "@/lib/i18n";
import { Sparkle, SectionHead } from "./ornaments";
import Reveal from "./Reveal";

const imgs = [
  { src: "/work/criativos/processo-1-produto.webp", w: 375, h: 666, contain: true },
  { src: "/work/criativos/processo-2-cena-ia.webp", w: 768, h: 1024 },
  { src: "/work/criativos/processo-3-final.webp", w: 900, h: 1125 },
];

const tools = ["Claude", "Magnific", "v0", "Figma", "Photoshop", "WordPress / Elementor"];

export default function AIProcess() {
  const { lang, d } = useLang();
  return (
    <section id="ia" className="relative z-10 scroll-mt-20 overflow-hidden border-y border-cream/10 bg-ink-2/70 py-16 sm:py-24 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-teal/[0.07] blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHead index="04" eyebrow={d.ai.eyebrow[lang]} title={d.ai.title[lang]} sub={d.ai.lead[lang]} />
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-10 md:mt-14 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-cream/45">
            <Sparkle className="h-3 w-3 text-teal" />
            {d.ai.case[lang]}
          </p>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-3 md:gap-8">
          {d.ai.steps.map((s, i) => (
            <Reveal key={i} delay={0.1 + i * 0.12}>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-cream/15 bg-[#1b1b1b]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgs[i].src}
                    alt={s.title[lang]}
                    width={imgs[i].w}
                    height={imgs[i].h}
                    loading="lazy"
                    className={imgs[i].contain ? "h-full w-full object-contain p-6" : "h-full w-full object-cover object-top"}
                  />
                  <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-cream/30 bg-ink/70 font-display text-lg text-cream backdrop-blur">
                    {i + 1}
                  </span>
                </div>
                {i < 2 && (
                  <span className="absolute -right-6 top-1/2 z-10 hidden -translate-y-1/2 text-2xl text-teal md:block" aria-hidden>
                    →
                  </span>
                )}
                <h3 className="mt-6 font-display text-xl font-semibold tracking-wider text-cream">{s.title[lang]}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-cream/60">{s.text[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 md:mt-16 flex flex-col gap-8 rounded-2xl border border-cream/10 bg-ink/60 p-7 md:flex-row md:items-center md:justify-between md:p-9">
            <p className="flex items-center gap-3 text-base text-cream/80 md:text-lg">
              <Sparkle className="h-5 w-5 shrink-0 text-teal" />
              {d.ai.video[lang]}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/40">{d.ai.tools[lang]}</span>
              {tools.map((t) => (
                <span key={t} className="rounded-full border border-cream/15 px-3.5 py-1.5 text-xs text-cream/75">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
