"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/lib/i18n";

export type LbItem = { src: string; title: string; caption: string; w: number; h: number };

export default function Lightbox({
  items,
  index,
  onClose,
  onIndex,
  mode,
}: {
  items: LbItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
  mode: "page" | "image";
}) {
  const { lang, d } = useLang();
  const scroller = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index! + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index! - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, items.length, onClose, onIndex]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [index]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <div className="flex items-center justify-between gap-4 border-b border-cream/10 px-5 py-4 md:px-8">
            <div className="min-w-0">
              <p className="truncate font-display text-lg tracking-wider text-cream">{item.title}</p>
              <p className="truncate text-[11px] uppercase tracking-[0.25em] text-teal">{item.caption}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="mr-2 hidden text-xs tabular-nums text-cream/40 sm:inline">
                {index! + 1} / {items.length}
              </span>
              <NavBtn label={d.lightbox.prev[lang]} onClick={() => onIndex((index! - 1 + items.length) % items.length)}>
                ←
              </NavBtn>
              <NavBtn label={d.lightbox.next[lang]} onClick={() => onIndex((index! + 1) % items.length)}>
                →
              </NavBtn>
              <NavBtn label={d.lightbox.close[lang]} onClick={onClose}>
                ✕
              </NavBtn>
            </div>
          </div>

          <div ref={scroller} className="flex-1 overflow-y-auto overscroll-contain" onClick={onClose}>
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={
                mode === "page"
                  ? "mx-auto w-full max-w-5xl px-3 py-6 md:px-8 md:py-10"
                  : "mx-auto flex min-h-full w-full max-w-3xl items-center justify-center px-4 py-6"
              }
              onClick={(e) => e.stopPropagation()}
            >
              {mode === "page" ? (
                <div className="overflow-hidden rounded-xl border border-cream/15 bg-ink-2 shadow-2xl">
                  <div className="flex items-center gap-2 border-b border-cream/10 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-ruby" />
                    <span className="h-2.5 w-2.5 rounded-full bg-cream/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-teal" />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.title} width={item.w} height={item.h} className="block h-auto w-full" />
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={item.title}
                  width={item.w}
                  height={item.h}
                  className="h-auto max-h-[calc(100svh-120px)] w-auto max-w-full rounded-lg object-contain shadow-2xl"
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavBtn({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream transition hover:border-teal hover:text-teal"
    >
      {children}
    </button>
  );
}
