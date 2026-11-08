"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/data";
import { Diamond } from "./ornaments";
import { track } from "@/lib/track";

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`relative flex rounded-full border border-cream/15 p-0.5 text-[11px] font-semibold tracking-[0.2em] ${className}`}
      role="group"
      aria-label="Idioma / Language"
    >
      {(["pt", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => {
            if (l !== lang) track("trocou_idioma", { idioma: l });
            setLang(l);
          }}
          aria-pressed={lang === l}
          className={`relative z-10 rounded-full px-3 py-1.5 uppercase transition-colors ${
            lang === l ? "text-ink" : "text-cream/60 hover:text-cream"
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 -z-10 rounded-full bg-cream"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const { lang, d } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    { href: "#sites", label: d.nav.work[lang] },
    { href: "#servicos", label: d.nav.services[lang] },
    { href: "#ia", label: d.nav.ai[lang] },
    { href: "#sobre", label: d.nav.about[lang] },
    { href: "#contato", label: d.nav.contact[lang] },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-cream/10 bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center rounded-full border border-teal/50">
            <Diamond className="h-4 w-4 text-ruby transition-transform duration-500 group-hover:rotate-180" />
          </span>
          <span className="whitespace-nowrap font-display text-[13px] font-semibold tracking-[0.14em] text-cream sm:text-[15px] sm:tracking-[0.18em]">
            GABRIEL SOARES
          </span>
        </a>

        <div className="hidden items-center gap-8 xl:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[12px] font-medium uppercase tracking-[0.24em] text-cream/65 transition-colors hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangToggle />
          <a
            href={waLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden whitespace-nowrap rounded-full bg-teal px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-cream sm:inline-block"
          >
            {d.nav.talk[lang]}
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 xl:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-px w-4 bg-cream transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-4 bg-cream transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-cream/10 bg-ink/95 backdrop-blur-xl xl:hidden"
          >
            <div className="flex flex-col px-5 py-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 border-b border-cream/5 py-4 font-display text-xl tracking-wider text-cream"
                >
                  <Diamond className="h-2.5 w-2.5 text-ruby" />
                  {l.label}
                </a>
              ))}
              <a
                href={waLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 rounded-full bg-teal py-3.5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-ink"
              >
                {d.nav.talk[lang]}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
