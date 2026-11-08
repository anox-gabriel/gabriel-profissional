"use client";

import { useEffect } from "react";
import { track, type TrackEvent } from "@/lib/track";

/** Rastreia cliques em WhatsApp, e-mail e redes em qualquer lugar da página. */
export default function LinkTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      let ev: TrackEvent | null = null;
      if (href.startsWith("https://wa.me")) ev = "clique_whatsapp";
      else if (href.startsWith("mailto:")) ev = "clique_email";
      else if (href.includes("linkedin.com")) ev = "clique_linkedin";
      else if (href.includes("instagram.com")) ev = "clique_instagram";
      if (!ev) return;
      const local = a.closest("header") ? "menu" : a.closest("section")?.id || "rodape";
      track(ev, { local });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
