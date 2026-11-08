"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { contact, waLink } from "@/lib/data";
import { Diamond, Sparkle } from "./ornaments";
import Reveal from "./Reveal";
import { WhatsIcon } from "./Hero";

export default function Contact() {
  const { lang, d } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section id="contato" className="relative z-10 scroll-mt-20 overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/[0.06]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-teal/15" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <p className="mb-6 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.42em] text-teal">
            <Diamond className="h-3 w-3 text-ruby" />
            <span className="text-cream/45">06</span>
            {d.contact.eyebrow[lang]}
          </p>
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.8rem)] font-semibold leading-[1.04] tracking-wide text-cream">
            {d.contact.title[lang]}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/65 md:text-lg">{d.contact.sub[lang]}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={waLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-teal px-8 py-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-cream sm:w-auto"
            >
              <WhatsIcon className="h-5 w-5" />
              {d.contact.wa[lang]}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-cream/25 px-8 py-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-cream transition hover:border-teal hover:text-teal sm:w-auto"
            >
              ✉ {d.contact.email[lang]}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-col items-center gap-3 text-sm text-cream/55">
            <p>
              {contact.whatsappLabel}
              <span className="mx-3 text-cream/20">|</span>
              <button onClick={copy} className="underline-offset-4 transition hover:text-teal hover:underline" title={d.contact.copy[lang]}>
                {contact.email}
              </button>
              <span className={`ml-2 text-xs text-teal transition-opacity ${copied ? "opacity-100" : "opacity-0"}`}>{d.contact.copied[lang]}</span>
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Social href={contact.linkedin} label="LinkedIn">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              </Social>
              <Social href={contact.instagram} label="Instagram">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </Social>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream/70 transition hover:border-teal hover:text-teal"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const { lang, d } = useLang();
  return (
    <footer className="relative z-10 border-t border-cream/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-[11px] uppercase tracking-[0.24em] text-cream/40 md:flex-row md:px-8">
        <p className="flex items-center gap-2">
          <Diamond className="h-2.5 w-2.5 text-ruby" />
          Gabriel Soares · Designer & Web Designer
        </p>
        <p className="flex items-center gap-2 normal-case tracking-wider">
          <Sparkle className="h-3 w-3 text-teal" />
          {d.footer.rights[lang]}
        </p>
        <a href="#top" className="transition hover:text-teal">
          {d.footer.top[lang]} ↑
        </a>
      </div>
    </footer>
  );
}
