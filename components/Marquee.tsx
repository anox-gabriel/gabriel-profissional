"use client";

import { useLang } from "@/lib/i18n";
import { Diamond } from "./ornaments";

export default function Marquee() {
  const { lang, d } = useLang();
  const items = d.marquee[lang];
  const row = [...items, ...items];
  return (
    <div className="relative z-10 border-y border-cream/10 bg-ink-2/80 py-5 backdrop-blur-sm">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-10">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-lg tracking-[0.14em] text-cream/75 md:text-xl">
              {t}
              <Diamond className={`h-3 w-3 ${i % 3 === 0 ? "text-ruby" : "text-teal/70"}`} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
