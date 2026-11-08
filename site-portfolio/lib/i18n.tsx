"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang } from "./data";

const dict = {
  nav: {
    work: { pt: "Trabalhos", en: "Work" },
    services: { pt: "Serviços", en: "Services" },
    ai: { pt: "IA", en: "AI" },
    about: { pt: "Sobre", en: "About" },
    contact: { pt: "Contato", en: "Contact" },
    talk: { pt: "Vamos conversar", en: "Let's talk" },
  },
  hero: {
    kicker: { pt: "Portfólio · Gabriel Soares", en: "Portfolio · Gabriel Soares" },
    titleA: { pt: "Designer", en: "Designer" },
    titleB: { pt: "Web Designer", en: "Web Designer" },
    lead: {
      pt: "Sites, landing pages e criativos que fazem marcas se destacarem no digital, com domínio de IA generativa para entregar mais rápido sem abrir mão do acabamento.",
      en: "Websites, landing pages and creatives that make brands stand out online, powered by generative AI to deliver faster without cutting corners on craft.",
    },
    ctaWork: { pt: "Ver trabalhos", en: "See my work" },
    ctaWa: { pt: "Chamar no WhatsApp", en: "Message me on WhatsApp" },
    hint: { pt: "mova o cursor: o grid oculto aparece", en: "move your cursor to reveal the hidden grid" },
    based: { pt: "Goiânia · Brasil · projetos remotos", en: "Goiânia · Brazil · remote projects" },
  },
  marquee: {
    pt: ["Web Design", "Landing Pages", "UI/UX", "WordPress & Elementor", "Social Media", "Criativos para anúncios", "Identidade Visual", "IA generativa", "Vídeo com IA", "Figma", "Photoshop"],
    en: ["Web Design", "Landing Pages", "UI/UX", "WordPress & Elementor", "Social Media", "Ad creatives", "Visual Identity", "Generative AI", "AI video", "Figma", "Photoshop"],
  },
  services: {
    eyebrow: { pt: "O baralho", en: "The deck" },
    title: { pt: "Cinco cartas na manga", en: "Five cards up my sleeve" },
    sub: { pt: "Passe o mouse (ou toque) para virar cada carta.", en: "Hover (or tap) to flip each card." },
    items: [
      {
        rank: "A",
        title: { pt: "Web Design", en: "Web Design" },
        text: {
          pt: "Sites completos, do layout no Figma à publicação no WordPress/Elementor. Responsivos, rápidos e fáceis de atualizar.",
          en: "Complete websites, from Figma layout to WordPress/Elementor launch. Responsive, fast and easy to update.",
        },
      },
      {
        rank: "K",
        title: { pt: "Landing Pages", en: "Landing Pages" },
        text: {
          pt: "Páginas de captação pensadas para conversão (CRO): hierarquia clara, prova social e a chamada certa no lugar certo.",
          en: "Lead-generation pages built for conversion (CRO): clear hierarchy, social proof and the right call to action in the right place.",
        },
      },
      {
        rank: "Q",
        title: { pt: "Social Media & Anúncios", en: "Social Media & Ads" },
        text: {
          pt: "Posts, carrosséis, stories e criativos de performance para Meta e Google Ads, alinhados ao tráfego pago.",
          en: "Posts, carousels, stories and performance creatives for Meta and Google Ads, aligned with paid media.",
        },
      },
      {
        rank: "J",
        title: { pt: "Identidade Visual", en: "Visual Identity" },
        text: {
          pt: "Logos, paletas e sistemas visuais que deixam a marca consistente em todos os canais.",
          en: "Logos, palettes and visual systems that keep a brand consistent across every channel.",
        },
      },
      {
        rank: "✦",
        title: { pt: "IA aplicada", en: "Applied AI" },
        text: {
          pt: "Imagens geradas e tratadas com IA, upscale e vídeos curtos para anúncios e reels: mais velocidade, mesmo acabamento.",
          en: "AI-generated and retouched images, upscaling and short videos for ads and reels: more speed, same finish.",
        },
      },
    ],
  },
  sites: {
    eyebrow: { pt: "Sites & Landing Pages", en: "Websites & Landing Pages" },
    title: { pt: "Páginas que trabalham pela marca", en: "Pages that work for the brand" },
    sub: {
      pt: "Passe o mouse para rolar a página dentro do navegador. Clique para ver inteira.",
      en: "Hover to scroll each page inside the browser. Click to see it in full.",
    },
    more: { pt: "Mostrar todos os sites", en: "Show all websites" },
    less: { pt: "Mostrar menos", en: "Show less" },
    view: { pt: "Ver página", en: "View page" },
  },
  creatives: {
    eyebrow: { pt: "Criativos & Social Media", en: "Creatives & Social Media" },
    title: { pt: "Peças que param o scroll", en: "Pieces that stop the scroll" },
    sub: { pt: "Feed, carrosséis, stories e anúncios para marcas de vários segmentos.", en: "Feed posts, carousels, stories and ads for brands across many industries." },
    filters: {
      all: { pt: "Todos", en: "All" },
      food: { pt: "Bebidas", en: "Beverages" },
      health: { pt: "Saúde", en: "Healthcare" },
      brands: { pt: "Marcas & Serviços", en: "Brands & Services" },
      realestate: { pt: "Imobiliário", en: "Real estate" },
      events: { pt: "Eventos & Datas", en: "Events & Seasonal" },
    },
    aiBadge: { pt: "com IA", en: "AI-assisted" },
    more: { pt: "Ver mais criativos", en: "See more creatives" },
  },
  ai: {
    eyebrow: { pt: "IA no processo", en: "AI in the process" },
    title: { pt: "A IA é o truque. O mágico continua sendo o designer.", en: "AI is the trick. The designer is still the magician." },
    lead: {
      pt: "Uso IA generativa no dia a dia para criar cenas, tratar imagens e ganhar velocidade. Mas o que transforma uma imagem bonita em anúncio é direção de arte, tipografia e composição.",
      en: "I use generative AI every day to create scenes, retouch images and move faster. But what turns a pretty image into an ad is art direction, typography and composition.",
    },
    steps: [
      {
        title: { pt: "Produto real", en: "Real product" },
        text: { pt: "Parto da foto original do produto. Rótulo e garrafa ficam fiéis.", en: "I start from the original product photo. Label and bottle stay true to life." },
      },
      {
        title: { pt: "Cena com IA", en: "AI-made scene" },
        text: {
          pt: "Com a garrafa como referência, gero a cena com IA: ambiente, luz, reflexo e sombra.",
          en: "Using the bottle as reference, I generate the scene with AI: setting, light, reflections and shadows.",
        },
      },
      {
        title: { pt: "Peça final", en: "Final piece" },
        text: {
          pt: "Expando para o formato do feed, aplico marca e textos legais e refino cada detalhe.",
          en: "I expand it to the feed format, apply branding and legal copy, and refine every detail.",
        },
      },
    ],
    case: { pt: "Caso: Malu Vinhos · campanha de feed", en: "Case: Malu Vinhos · feed campaign" },
    video: {
      pt: "Também produzo vídeos curtos com IA para anúncios e reels.",
      en: "I also produce short AI videos for ads and reels.",
    },
    tools: { pt: "Ferramentas", en: "Tools" },
  },
  about: {
    eyebrow: { pt: "Sobre", en: "About" },
    title: { pt: "Prazer, Gabriel.", en: "Nice to meet you, I'm Gabriel." },
    p1: {
      pt: "Sou designer e web designer. Transformo ideias em sites, landing pages e peças visuais que ajudam negócios a se destacar no digital, do layout no Figma até a publicação no WordPress, sempre com foco em design responsivo, boa experiência para o usuário e conversão.",
      en: "I'm a designer and web designer. I turn ideas into websites, landing pages and visuals that help businesses stand out online, from Figma layout to WordPress launch, always focused on responsive design, great user experience and conversion.",
    },
    p2: {
      pt: "Hoje sou Designer Pleno na V4 Company, onde atendo empresas de segmentos variados que investem em tráfego pago. A IA não substitui o olhar de designer: é a ferramenta que me deixa entregar mais rápido e com mais qualidade.",
      en: "I'm currently a Mid-level Designer at V4 Company, working with businesses from many industries that invest in paid media. AI doesn't replace a designer's eye: it's the tool that lets me deliver faster and better.",
    },
    expTitle: { pt: "Experiência", en: "Experience" },
    exp: [
      { role: { pt: "Designer Pleno", en: "Mid-level Designer" }, org: "V4 Company" },
      { role: { pt: "Designer & Web Designer", en: "Designer & Web Designer" }, org: "Mestres do Seguro" },
      { role: { pt: "Web Designer & Designer Gráfico", en: "Web & Graphic Designer" }, org: "Lumina Studio Digital" },
      { role: { pt: "Designer de Interface UX/UI", en: "UX/UI Interface Designer" }, org: "Freelance" },
      { role: { pt: "Web Designer", en: "Web Designer" }, org: "Heyon Digital" },
    ],
    eduTitle: { pt: "Formação", en: "Education" },
    edu: [
      { pt: "Tecnólogo em Design Gráfico · Faculdade Senac Goiás", en: "Associate Degree in Graphic Design · Faculdade Senac Goiás" },
      { pt: "Photoshop para matte painting · Domestika", en: "Photoshop for matte painting · Domestika" },
      { pt: "WordPress & Elementor · Rocket", en: "WordPress & Elementor · Rocket" },
      { pt: "HTML & CSS · Onebitcode", en: "HTML & CSS · Onebitcode" },
    ],
  },
  contact: {
    eyebrow: { pt: "Contato", en: "Contact" },
    title: { pt: "Vamos criar algo que pareça mágica?", en: "Shall we make something that feels like magic?" },
    sub: {
      pt: "Me conta sobre o seu projeto: site, landing page, social media ou identidade. Respondo rápido.",
      en: "Tell me about your project: website, landing page, social media or identity. I reply fast.",
    },
    wa: { pt: "Chamar no WhatsApp", en: "Message on WhatsApp" },
    email: { pt: "Enviar e-mail", en: "Send an email" },
    copy: { pt: "copiar", en: "copy" },
    copied: { pt: "copiado!", en: "copied!" },
  },
  footer: {
    rights: { pt: "Feito à mão (e com um pouco de mágica).", en: "Handcrafted (with a little magic)." },
    top: { pt: "Voltar ao topo", en: "Back to top" },
  },
  lightbox: {
    close: { pt: "Fechar", en: "Close" },
    prev: { pt: "Anterior", en: "Previous" },
    next: { pt: "Próximo", en: "Next" },
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangCtx = createContext<Ctx>({ lang: "pt", setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("lang");
    } catch {}
    const initial: Lang =
      saved === "pt" || saved === "en" ? saved : navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  }, []);

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(LangCtx);
  return { lang, setLang, d: dict };
}
