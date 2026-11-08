/** Cartas no estilo "ás" da identidade (mesmo desenho do banner do LinkedIn). */
export type CardKind = "D" | "W" | "IA";

const label: Record<CardKind, string> = { D: "DESIGN", W: "WEB DESIGN", IA: "CRIATIVOS IA" };

export default function PlayingCard({ kind, className = "" }: { kind: CardKind; className?: string }) {
  const suitColor = kind === "D" ? "#B71C1C" : "#26A69A";
  return (
    <svg viewBox="0 0 150 220" className={className} role="img" aria-label={label[kind]}>
      <defs>
        <linearGradient id={`face-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#181614" />
          <stop offset="1" stopColor="#0C0C0B" />
        </linearGradient>
      </defs>
      <rect x="0.7" y="0.7" width="148.6" height="218.6" rx="11" fill={`url(#face-${kind})`} stroke="#E5DAC8" strokeOpacity=".75" strokeWidth="1.4" />
      <rect x="9" y="9" width="132" height="202" rx="6" fill="none" stroke="#E5DAC8" strokeOpacity=".2" />

      <g>
        <text x="18" y="34" fontFamily="var(--font-cinzel)" fontSize={kind === "IA" ? 19 : 22} fill="#E5DAC8">
          {kind}
        </text>
        <path d="M0,-9 L7,0 L0,9 L-7,0 Z" transform="translate(25 52) scale(.8)" fill={suitColor} />
      </g>
      <g transform="rotate(180 75 110)">
        <text x="18" y="34" fontFamily="var(--font-cinzel)" fontSize={kind === "IA" ? 19 : 22} fill="#E5DAC8">
          {kind}
        </text>
        <path d="M0,-9 L7,0 L0,9 L-7,0 Z" transform="translate(25 52) scale(.8)" fill={suitColor} />
      </g>

      {kind === "D" && (
        <g transform="translate(75 110)" fill="none" stroke="#E5DAC8" strokeWidth="1">
          <rect x="-40" y="-40" width="80" height="80" strokeOpacity=".35" />
          <line x1="-13.3" y1="-40" x2="-13.3" y2="40" strokeOpacity=".22" />
          <line x1="13.3" y1="-40" x2="13.3" y2="40" strokeOpacity=".22" />
          <line x1="-40" y1="-13.3" x2="40" y2="-13.3" strokeOpacity=".22" />
          <line x1="-40" y1="13.3" x2="40" y2="13.3" strokeOpacity=".22" />
          <circle r="27" stroke="#26A69A" strokeOpacity=".85" />
          <path d="M0,-9 L7,0 L0,9 L-7,0 Z" transform="scale(2.1)" fill="#B71C1C" stroke="none" />
        </g>
      )}

      {kind === "W" && (
        <g transform="translate(75 110)" fill="none" stroke="#E5DAC8" strokeWidth="1.3" strokeOpacity=".9">
          <rect x="-38" y="-30" width="76" height="58" rx="5" />
          <line x1="-38" y1="-17" x2="38" y2="-17" />
          <circle cx="-30" cy="-23.5" r="1.8" fill="#B71C1C" stroke="none" />
          <circle cx="-24" cy="-23.5" r="1.8" fill="#E5DAC8" stroke="none" opacity=".6" />
          <rect x="-28" y="-8" width="32" height="5" fill="#26A69A" stroke="none" opacity=".85" />
          <rect x="-28" y="2" width="22" height="3" fill="#E5DAC8" stroke="none" opacity=".5" />
          <rect x="-28" y="10" width="18" height="7" rx="2" stroke="#26A69A" />
          <rect x="10" y="-8" width="20" height="25" rx="2" strokeOpacity=".5" />
        </g>
      )}

      {kind === "IA" && (
        <g transform="translate(75 110)">
          <path d="M0,-8 C1,-2 2,-1 8,0 C2,1 1,2 0,8 C-1,2 -2,1 -8,0 C-2,-1 -1,-2 0,-8Z" transform="scale(3.4)" fill="none" stroke="#26A69A" strokeWidth=".45" />
          <path d="M0,-8 C1,-2 2,-1 8,0 C2,1 1,2 0,8 C-1,2 -2,1 -8,0 C-2,-1 -1,-2 0,-8Z" transform="translate(26 -26) scale(1.2)" fill="#E5DAC8" />
          <path d="M0,-8 C1,-2 2,-1 8,0 C2,1 1,2 0,8 C-1,2 -2,1 -8,0 C-2,-1 -1,-2 0,-8Z" transform="translate(-24 24) scale(.8)" fill="#E5DAC8" opacity=".7" />
          <circle r="3" fill="#26A69A" />
        </g>
      )}

      <text x="75" y="190" textAnchor="middle" fontFamily="var(--font-montserrat)" fontWeight="500" fontSize="8.5" letterSpacing="2.6" fill="#E5DAC8" fillOpacity=".7">
        {label[kind]}
      </text>
    </svg>
  );
}
