"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Diamond, SectionHead, Sparkle } from "./ornaments";
import Reveal from "./Reveal";

function Pip({ i }: { i: number }) {
  if (i === 4) return <Sparkle className="h-5 w-5 text-teal" />;
  return <Diamond className={`h-4 w-4 ${i === 0 ? "text-ruby" : "text-teal"}`} />;
}

export default function Services() {
  const { lang, d } = useLang();
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section id="servicos" className="relative z-10 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHead index="03" eyebrow={d.services.eyebrow[lang]} title={d.services.title[lang]} sub={d.services.sub[lang]} />
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {d.services.items.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <button
                type="button"
                className="flip block aspect-[5/7] w-full text-left"
                data-flipped={flipped === i}
                onClick={() => setFlipped((f) => (f === i ? null : i))}
                aria-label={s.title[lang]}
              >
                <div className="flip-inner h-full w-full">
                  {/* frente */}
                  <div className="flip-face rounded-2xl border border-cream/25 bg-gradient-to-b from-ink-3 to-ink p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,.9)]">
                    <div className="relative flex h-full flex-col items-center justify-center rounded-xl border border-cream/10">
                      <div className="absolute left-4 top-3 flex flex-col items-center gap-1.5">
                        <span className="font-display text-2xl text-cream">{s.rank}</span>
                        <Pip i={i} />
                      </div>
                      <div className="absolute bottom-3 right-4 flex rotate-180 flex-col items-center gap-1.5">
                        <span className="font-display text-2xl text-cream">{s.rank}</span>
                        <Pip i={i} />
                      </div>
                      <div className="grid h-16 w-16 place-items-center rounded-full border border-teal/50 sm:h-24 sm:w-24">
                        {i === 4 ? (
                          <Sparkle className="h-8 w-8 text-cream sm:h-12 sm:w-12" />
                        ) : (
                          <Diamond className={`h-8 w-8 sm:h-12 sm:w-12 ${i === 0 ? "text-ruby" : "text-cream/90"}`} />
                        )}
                      </div>
                      <h3 className="mt-5 px-3 text-center font-display text-base font-semibold tracking-wider text-cream sm:mt-7 sm:px-6 sm:text-xl">
                        {s.title[lang]}
                      </h3>
                    </div>
                  </div>
                  {/* verso */}
                  <div className="flip-face flip-back rounded-2xl border border-teal/60 bg-ink-2 p-3">
                    <div
                      className="flex h-full flex-col justify-between rounded-xl border border-teal/20 p-3.5 sm:p-6"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, rgba(38,166,154,.05) 0 1px, transparent 1px 14px), repeating-linear-gradient(-45deg, rgba(38,166,154,.05) 0 1px, transparent 1px 14px)",
                      }}
                    >
                      <div className="flex items-center gap-2 text-teal">
                        <Pip i={i} />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">{s.title[lang]}</span>
                      </div>
                      <p className="text-[12.5px] leading-snug text-cream/85 sm:text-[15px] sm:leading-relaxed">{s.text[lang]}</p>
                      <span className="font-display text-3xl text-cream/30">{s.rank}</span>
                    </div>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
