// Eventos para o GTM (dataLayer). No GTM, crie gatilhos "Evento personalizado" com estes nomes.
export type TrackEvent =
  | "clique_whatsapp"
  | "clique_email"
  | "clique_linkedin"
  | "clique_instagram"
  | "abriu_site"
  | "abriu_criativo"
  | "filtro_criativos"
  | "trocou_idioma"
  | "virou_carta";

type DL = Record<string, unknown>[];

export function track(event: TrackEvent, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: DL };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

export const GTM_ID = "GTM-TZX8QSPM";
export const CONSENT_KEY = "cookie-consent"; // "granted" | "denied"
