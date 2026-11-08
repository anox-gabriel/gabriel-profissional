export type Lang = "pt" | "en";
export type L = { pt: string; en: string };

export const contact = {
  whatsapp: "5562993247585",
  whatsappLabel: "(62) 99324-7585",
  email: "gabrieloliveira159951@gmail.com",
  linkedin: "https://www.linkedin.com/in/gabriel-soares-02a033279/",
  instagram: "https://www.instagram.com/sgabriel_designer/",
};

export const waLink = (lang: Lang) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    lang === "pt"
      ? "Olá, Gabriel! Vi seu portfólio e quero conversar sobre um projeto."
      : "Hi Gabriel! I saw your portfolio and would like to talk about a project."
  )}`;

export type Site = {
  id: string;
  name: string;
  tag: L;
  w: number;
  h: number;
};

// Ordem = ordem de exibição. Imagens em /public/work/sites/{id}.webp e {id}-full.webp
export const sites: Site[] = [
  { id: "paxman", name: "Paxman", tag: { pt: "Site institucional · Saúde", en: "Corporate website · Healthcare" }, w: 900, h: 2967 },
  { id: "port", name: "Port Engenharia", tag: { pt: "Site institucional · Construção", en: "Corporate website · Construction" }, w: 900, h: 2045 },
  { id: "draluzia", name: "Luzia Helena Advocacia", tag: { pt: "Landing page · Direito", en: "Landing page · Law" }, w: 900, h: 2769 },
  { id: "hderma", name: "HDerma", tag: { pt: "Catálogo online · Estética", en: "Online catalog · Aesthetics" }, w: 900, h: 2091 },
  { id: "rogos", name: "Rogos Telecom", tag: { pt: "Site institucional · TI & Telecom", en: "Corporate website · IT & Telecom" }, w: 900, h: 1964 },
  { id: "cipasa", name: "Cipasa", tag: { pt: "Site institucional · Urbanismo", en: "Corporate website · Urban development" }, w: 900, h: 2887 },
  { id: "empreendi", name: "Empreendi Contabilidade", tag: { pt: "Landing page · Contabilidade", en: "Landing page · Accounting" }, w: 900, h: 2283 },
  { id: "pousada", name: "Pousada Contêiner", tag: { pt: "Site · Turismo", en: "Website · Hospitality" }, w: 900, h: 1937 },
  { id: "dimp", name: "DIMP", tag: { pt: "Site · Móveis planejados", en: "Website · Custom furniture" }, w: 900, h: 2656 },
  { id: "tropical", name: "Tropical Urbanismo", tag: { pt: "Portal · Imobiliário", en: "Portal · Real estate" }, w: 900, h: 1786 },
  { id: "newsviagens", name: "News Viagens", tag: { pt: "Site · Turismo de eventos", en: "Website · Event travel" }, w: 900, h: 2202 },
  { id: "alico", name: "AlicoRemit", tag: { pt: "Site · Fintech", en: "Website · Fintech" }, w: 900, h: 2552 },
  { id: "jardins", name: "Condomínios Jardins", tag: { pt: "Landing page · Imobiliário", en: "Landing page · Real estate" }, w: 900, h: 2580 },
  { id: "gramas", name: "Gramas Perimetral", tag: { pt: "Catálogo · Paisagismo", en: "Catalog · Landscaping" }, w: 900, h: 3158 },
  { id: "incorp", name: "Incorp", tag: { pt: "Site · Serviços empresariais", en: "Website · Business services" }, w: 900, h: 2108 },
  { id: "hcompany", name: "h.company", tag: { pt: "Site · Tecnologia", en: "Website · Technology" }, w: 900, h: 2815 },
];

export type Group = "all" | "food" | "health" | "brands" | "realestate" | "events";

export type Creative = {
  id: string;
  client: string;
  group: Exclude<Group, "all">;
  ai?: boolean;
  w: number;
  h: number;
};

// Imagens em /public/work/criativos/{id}.webp
export const creatives: Creative[] = [
  { id: "malu-05", client: "Malu Vinhos", group: "food", ai: true, w: 900, h: 1125 },
  { id: "messias-hernia", client: "Dr. Messias Pacheco", group: "health", ai: true, w: 900, h: 1125 },
  { id: "kados-02", client: "Kados", group: "brands", w: 900, h: 1150 },
  { id: "malu-01", client: "Malu Vinhos", group: "food", ai: true, w: 900, h: 1125 },
  { id: "paxman-podcast", client: "Paxman", group: "health", w: 900, h: 1125 },
  { id: "orca-post", client: "OrcaPP", group: "brands", w: 900, h: 1125 },
  { id: "malu-07", client: "Malu Vinhos", group: "food", ai: true, w: 900, h: 1125 },
  { id: "messias-neuralgia", client: "Dr. Messias Pacheco", group: "health", ai: true, w: 900, h: 1125 },
  { id: "madu-01", client: "Madu", group: "brands", w: 900, h: 1150 },
  { id: "malu-09", client: "Malu Vinhos", group: "food", ai: true, w: 900, h: 1125 },
  { id: "veico-carrossel", client: "Veico", group: "brands", w: 900, h: 1125 },
  { id: "kados-04", client: "Kados", group: "brands", w: 900, h: 1150 },
  { id: "paxman-estande", client: "Paxman", group: "health", w: 900, h: 1125 },
  { id: "malu-10", client: "Malu Vinhos", group: "food", ai: true, w: 900, h: 1125 },
  { id: "luxcapa", client: "Lux Oeste", group: "realestate", w: 900, h: 900 },
  { id: "messias-3perguntas", client: "Dr. Messias Pacheco", group: "health", ai: true, w: 900, h: 1125 },
  { id: "kados-01", client: "Kados", group: "brands", w: 900, h: 1150 },
  { id: "malu-02", client: "Malu Vinhos", group: "food", ai: true, w: 900, h: 1125 },
  { id: "ana-01", client: "Ana Carolina", group: "health", w: 900, h: 1150 },
  { id: "urban4", client: "Urban Garden", group: "realestate", w: 900, h: 900 },
  { id: "madu-02", client: "Madu", group: "brands", w: 900, h: 1150 },
  { id: "malu-06", client: "Malu Vinhos", group: "food", ai: true, w: 900, h: 1125 },
  { id: "isadora-convite", client: "Isadora 15 anos", group: "events", w: 900, h: 1600 },
  { id: "orca-carrossel", client: "OrcaPP", group: "brands", w: 900, h: 1125 },
  { id: "reserva4", client: "Reserva do Parque", group: "realestate", w: 900, h: 900 },
  { id: "kados-03", client: "Kados", group: "brands", w: 900, h: 1150 },
  { id: "malu-08", client: "Malu Vinhos", group: "food", ai: true, w: 900, h: 1125 },
  { id: "veico-post", client: "Veico", group: "brands", w: 900, h: 1125 },
  { id: "simonato", client: "Simonato & Mendanha", group: "events", w: 900, h: 1600 },
  { id: "madu-04", client: "Madu", group: "brands", w: 900, h: 1150 },
  { id: "ilumi", client: "Ilumine", group: "realestate", w: 900, h: 899 },
  { id: "malu-04", client: "Malu Vinhos", group: "food", ai: true, w: 900, h: 1125 },
  { id: "cr01", client: "Consultoria Rodrigues", group: "brands", w: 900, h: 900 },
  { id: "reserva2", client: "Reserva do Parque", group: "realestate", w: 900, h: 900 },
  { id: "vertice1", client: "Vértice", group: "realestate", w: 900, h: 900 },
  { id: "madu-05", client: "Madu", group: "brands", w: 900, h: 1150 },
  { id: "isadora-cardapio", client: "Isadora 15 anos", group: "events", w: 900, h: 1920 },
];
