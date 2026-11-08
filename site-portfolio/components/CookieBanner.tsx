"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { CONSENT_KEY } from "@/lib/track";
import { Diamond } from "./ornaments";

const txt = {
  text: {
    pt: "Uso cookies de análise para entender como o portfólio é visitado. Nada de anúncios.",
    en: "I use analytics cookies to understand how this portfolio is visited. No ads.",
  },
  accept: { pt: "Aceitar", en: "Accept" },
  deny: { pt: "Recusar", en: "Decline" },
};

function setConsent(v: "granted" | "denied") {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  w.gtag?.("consent", "update", { analytics_storage: v });
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {}
}

export default function CookieBanner() {
  const { lang } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(CONSENT_KEY);
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!saved) setShow(true);
  }, []);

  const choose = (v: "granted" | "denied") => {
    setConsent(v);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-xl rounded-2xl border border-cream/15 bg-ink-2/95 p-4 shadow-2xl backdrop-blur-xl sm:bottom-5 sm:p-5"
          role="dialog"
          aria-live="polite"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="flex flex-1 items-start gap-3 text-[13px] leading-relaxed text-cream/75">
              <Diamond className="mt-1 h-2.5 w-2.5 shrink-0 text-ruby" />
              {txt.text[lang]}
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => choose("denied")}
                className="flex-1 rounded-full border border-cream/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/70 transition hover:text-cream sm:flex-none"
              >
                {txt.deny[lang]}
              </button>
              <button
                onClick={() => choose("granted")}
                className="flex-1 rounded-full bg-teal px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-cream sm:flex-none"
              >
                {txt.accept[lang]}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
