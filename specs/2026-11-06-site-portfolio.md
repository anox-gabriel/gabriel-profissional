# Spec: Site portfólio (Grid Oculto)

- **Cliente:** Gabriel Soares (marca pessoal)
- **Data:** 2026-11-06
- **Status:** pronto e testado localmente (build ok, desktop + celular, PT/EN); falta publicar na Vercel (login do Gabriel)
- **Solicitante:** Gabriel

## 1. Objetivo
Site portfólio próprio, bilíngue (PT/EN), que vende o Gabriel como **Designer & Web Designer** com IA como diferencial. O destino é fazer o visitante (recrutador ou cliente) chamar no WhatsApp ou mandar e-mail.

## 2. Decisões do Gabriel
- Identidade **Grid Oculto**: preto `#0A0A0A`, creme `#E5DAC8`, verde-azulado `#26A69A`, vermelho `#B71C1C` só no losango. Estética: cartas de baralho e mágica.
- **Sem datas/anos** nos trabalhos nem na experiência, para tudo parecer recente.
- Pode usar tudo da pasta Portfólio do Drive (`1zmSt344NFpVlck_lJcjkXGreX5jUuE4A`).
- Contato: WhatsApp (62) 99324-7585 · gabrieloliveira159951@gmail.com · LinkedIn · Instagram @sgabriel_designer.
- Idiomas: português e inglês (botão PT/EN).
- Código feito pelo Claude: **Next.js + Tailwind + Framer Motion**, deploy gratuito na Vercel. Sem v0 e sem Lovable.

## 3. Estrutura (uma página)
1. **Hero:** "Designer & Web Designer", leque de 3 cartas (D, W, IA) animado e grid oculto revelado pelo cursor. CTAs: ver trabalhos e WhatsApp.
2. **Faixa (marquee):** serviços e ferramentas.
3. **O baralho (serviços):** cartas que viram no hover.
   - Web Design
   - Landing Pages
   - Social Media & Criativos
   - Identidade Visual
   - IA aplicada (inclui vídeo)
4. **Sites:**
   - Grade de sites; o print rola dentro de uma moldura de navegador no hover.
   - Lightbox com a página inteira.
5. **Criativos:**
   - Galeria de social media e anúncios por cliente.
   - Lightbox.
6. **IA no processo:**
   - Destaque para Malu Vinhos (garrafa real + cena por IA).
   - Explicação do fluxo, sem números inventados.
7. **Sobre:** texto do LinkedIn, experiência sem datas, formação e ferramentas.
8. **Contato:**
   - CTA grande, WhatsApp e e-mail.
   - Redes.

## 4. Seleção de trabalhos (Drive)
- **Sites:**
  - Paxman, Port Engenharia, Empreendi, Luzia Helena, HDerma, Cipasa, Pousada Contêiner, Rogos Telecom e DIMP.
  - Tropical Urbanismo, Condomínios Jardins, News Viagens, AlicoRemit, Incorp, Gramas Perimetral e h.company.
- **Criativos:**
  - Malu Vinhos, Dr. Messias Pacheco, Paxman (SBOC), Kados, Madu, OrcaPP e Veico.
  - Ana Carolina, Consultoria Rodrigues e Simonato.
  - Posts imobiliários (Reserva do Parque, Lux, Urban Garden, Ilumine) e Isadora 15 anos.
- Ficaram de fora: layouts antigos (2023) de estilo mais datado.

## 5. Critérios de aceite
- [ ] Visual na identidade Grid Oculto, sem cara de template
- [ ] PT/EN completos
- [ ] Nenhuma data/ano visível
- [ ] Responsivo (celular 360 px até desktop) e imagens otimizadas (webp)
- [ ] Build sem erros; publicado na Vercel

## 6. Entregas
`site-portfolio/` (repo git próprio, ignorado no git do workspace).
- Trabalhos: `lib/data.ts`. Textos: `lib/i18n.tsx`. Imagens: `public/work/`. Prévia de compartilhamento: `public/og.png`.
- Imagens do Drive baixadas pelo link público (`drive.google.com/thumbnail?id=ID&sz=w1600`) porque a pasta é da conta pessoal, que não está sincronizada no G:.
- Processo IA (Malu): `referencias/garrafas/Suave 750ml.png` → `raw/1k/01` → peça final 01.

## 7. Aprendizados
- O Next 16 gera um `next.config` com `@tailwindcss/turbopack`. Funcionou no caminho com `[VS]`.
- Não rodar `npm i` enquanto o create-next-app ainda está instalando: corrompe o `node_modules`.
- Prints da página: puppeteer-core + Chrome instalado, rolando a página antes para disparar as animações.
