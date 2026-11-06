import type { SVGProps } from "react";

export function Diamond({ className = "", ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-8 -10 16 20" className={className} aria-hidden {...p}>
      <path d="M0,-9 L7,0 L0,9 L-7,0 Z" fill="currentColor" />
    </svg>
  );
}

export function Sparkle({ className = "", ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-9 -9 18 18" className={className} aria-hidden {...p}>
      <path d="M0,-8 C1,-2 2,-1 8,0 C2,1 1,2 0,8 C-1,2 -2,1 -8,0 C-2,-1 -1,-2 0,-8Z" fill="currentColor" />
    </svg>
  );
}

export function SectionHead({
  index,
  eyebrow,
  title,
  sub,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p
        className={`mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.42em] text-teal ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <Diamond className="h-3 w-3 text-ruby" />
        <span className="text-cream/45">{index}</span>
        <span>{eyebrow}</span>
      </p>
      <h2 className="font-display text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.05] tracking-wide text-cream">
        {title}
      </h2>
      {sub && <p className="mt-5 text-base leading-relaxed text-cream/60 md:text-lg">{sub}</p>}
    </div>
  );
}
