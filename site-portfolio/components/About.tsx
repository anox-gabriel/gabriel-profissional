"use client";

import { useLang } from "@/lib/i18n";
import { Diamond, SectionHead } from "./ornaments";
import Reveal from "./Reveal";
import PlayingCard from "./PlayingCard";

export default function About() {
  const { lang, d } = useLang();
  return (
    <section id="sobre" className="relative z-10 scroll-mt-20 py-16 sm:py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div>
          <Reveal>
            <SectionHead index="05" eyebrow={d.about.eyebrow[lang]} title={d.about.title[lang]} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-cream/70">
              <p>{d.about.p1[lang]}</p>
              <p>{d.about.p2[lang]}</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative mt-14 hidden h-56 sm:block" aria-hidden>
              {(["W", "D", "IA"] as const).map((k, i) => (
                <div
                  key={k}
                  className="absolute top-0 w-32 transition-transform duration-500 hover:-translate-y-3"
                  style={{ left: i * 92, transform: `rotate(${(i - 1) * 8}deg)`, zIndex: i === 1 ? 2 : 1 }}
                >
                  <PlayingCard kind={k} className="h-auto w-full drop-shadow-[0_20px_25px_rgba(0,0,0,.7)]" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="space-y-14">
          <Reveal delay={0.1}>
            <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.36em] text-teal">{d.about.expTitle[lang]}</h3>
            <ul className="divide-y divide-cream/10 border-y border-cream/10">
              {d.about.exp.map((e, i) => (
                <li key={i} className="group flex items-center justify-between gap-6 py-5">
                  <div className="flex items-center gap-4">
                    <Diamond className={`h-2.5 w-2.5 shrink-0 ${i === 0 ? "text-ruby" : "text-cream/25"}`} />
                    <span className="font-display text-lg tracking-wider text-cream transition-colors group-hover:text-teal">{e.org}</span>
                  </div>
                  <span className="text-right text-[11px] uppercase tracking-[0.2em] text-cream/50">{e.role[lang]}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.36em] text-teal">{d.about.eduTitle[lang]}</h3>
            <ul className="space-y-3.5">
              {d.about.edu.map((e, i) => (
                <li key={i} className="flex items-start gap-4 text-[15px] text-cream/75">
                  <Diamond className="mt-1.5 h-2 w-2 shrink-0 text-teal/70" />
                  {e[lang]}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
