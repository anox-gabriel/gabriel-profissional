"use client";

import { useEffect } from "react";

/** Atualiza --mx/--my para revelar o grid oculto ao redor do cursor. */
export default function CursorGrid() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const root = document.documentElement;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${e.clientX}px`);
        root.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    const onLeave = () => {
      root.style.setProperty("--mx", "-999px");
      root.style.setProperty("--my", "-999px");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="hidden-grid" />
      <div className="hidden-grid-reveal" />
    </>
  );
}
