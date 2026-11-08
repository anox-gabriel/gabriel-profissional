"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/data";
import PlayingCard, { type CardKind } from "./PlayingCard";
import { Diamond, Sparkle } from "./ornaments";

const fan: { kind: CardKind; x: number; y: number; r: number; z: number; spread: { x: number; y: number; r: number } }[] = [
  { kind: "W", x: -118, y: 26, r: -14, z: 1, spread: { x: -190, y: 30, r: -20 } },
  { kind: "IA", x: 118, y: 26, r: 14, z: 1, spread: { x: 190, y: 30, r: 20 } },
  { kind: "D", x: 0, y: -10, r: 0, z: 2, spread: { x: 0, y: -34, r: 0 } },
];

const sparkles = [
  { x: "8%", y: "18%", s: 14, d: 0 },
  { x: "88%", y: "12%", s: 10, d: 0.8 },
  { x: "92%", y: "78%", s: 12, d: 1.6 },
  { x: "4%", y: "82%", s: 8, d: 2.2 },
  { x: "50%", y: "2%", s: 7, d: 1.1 },
];

export default function Hero() {
  const { lang, d } = useLang();
  const [hover, setHover] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 120, damping: 18 });

  const ease = [0.2, 0.7, 0.2, 1] as const;

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 md:pt-28">
      {/* brilho de fundo */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[620px] w-[620px] rounded-full bg-teal/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-ruby/10 blur-[140px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 md:px-8 xl:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-7 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.42em] text-teal"
          >
            <Diamond className="h-3 w-3 text-ruby" />
            {d.hero.kicker[lang]}
          </motion.p>

          <h1 className="font-display font-semibold leading-[0.98] tracking-wide text-cream">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease }}
              className="block whitespace-nowrap text-[clamp(2.5rem,7.4vw,6rem)]"
            >
              {d.hero.titleA[lang]} <span className="font-medium text-teal">&amp;</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.22, ease }}
              className="text-gradient block whitespace-nowrap text-[clamp(2.5rem,7.4vw,6rem)]"
            >
              {d.hero.titleB[lang]}
            </motion.span>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease }}
            className="my-8 h-px w-40 origin-left bg-gradient-to-r from-cream/60 to-transparent"
          />

          <motion.p
            key={lang}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="max-w-xl text-[17px] leading-relaxed text-cream/70 md:text-lg"
          >
            {d.hero.lead[lang]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#sites"
              className="group inline-flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-teal"
            >
              {d.hero.ctaWork[lang]}
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href={waLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-cream/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-cream transition hover:border-teal hover:text-teal"
            >
              <WhatsIcon className="h-4 w-4" />
              {d.hero.ctaWa[lang]}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.3em] text-cream/40"
          >
            <span>{d.hero.based[lang]}</span>
            <span className="hidden items-center gap-2 md:flex">
              <Sparkle className="h-3 w-3 text-teal" />
              {d.hero.hint[lang]}
            </span>
          </motion.div>
        </div>

        {/* leque de cartas */}
        <div
          className="relative mx-auto h-[380px] w-full max-w-[520px] sm:h-[460px]"
          style={{ perspective: 1200 }}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
            my.set(((e.clientY - r.top) / r.height) * 2 - 1);
          }}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => {
            setHover(false);
            mx.set(0);
            my.set(0);
          }}
        >
          {sparkles.map((s, i) => (
            <span key={i} className="absolute text-cream" style={{ left: s.x, top: s.y }}>
              <Sparkle className="animate-twinkle" style={{ width: s.s, height: s.s, animationDelay: `${s.d}s` }} />
            </span>
          ))}

          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 520 460" aria-hidden>
            <circle cx="260" cy="230" r="170" fill="none" stroke="#E5DAC8" strokeOpacity=".07" />
            <motion.circle
              cx="260"
              cy="230"
              r="205"
              fill="none"
              stroke="#26A69A"
              strokeOpacity=".22"
              strokeDasharray="2 10"
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              style={{ originX: "260px", originY: "230px" }}
            />
          </svg>

          <motion.div className="absolute inset-0 scale-[0.78] sm:scale-100" style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
            {fan.map((c, i) => {
              const t = hover ? c.spread : c;
              return (
                <motion.div
                  key={c.kind}
                  className="hero-card absolute left-1/2 top-1/2"
                  style={{ zIndex: c.z }}
                  initial={{ x: 0, y: 260, rotate: 0, opacity: 0 }}
                  animate={{ x: t.x, y: t.y, rotate: t.r, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 15,
                    delay: hover ? 0 : 0.35 + i * 0.14,
                  }}
                  whileHover={{ y: t.y - 18, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                >
                  <div className="drop-shadow-[0_24px_30px_rgba(0,0,0,.75)]">
                    <PlayingCard kind={c.kind} className="h-auto w-full" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function WhatsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.43-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.3 11.3 0 0 0 12.05.7C5.79.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.3l5.71-1.5a11.3 11.3 0 0 0 5.74 1.46h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03" />
    </svg>
  );
}
