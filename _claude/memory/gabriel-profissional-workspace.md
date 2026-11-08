---
name: gabriel-profissional-workspace
description: "Personal workspace \"Gabriel - Profissional\" (LinkedIn, portfolio, personal brand) plus his own company Grid Oculto as a client"
metadata:
  node_type: memory
  type: project
  originSessionId: da6ab2e7-03d4-4708-a21b-39f7645932f0
  modified: 2026-11-08T03:42:13.457Z
---

Since 2026-11-06 there is a second workspace, `c:\[VS] Claude\Workspaces\Gabriel - Profissional\`. It follows the same structure as the V4 workspace (CLAUDE.md, perfil.md, specs/, assets/), but the "client" is Gabriel himself: his LinkedIn, portfolio and personal brand. Gabriel's own company is `Clientes/Grid Oculto/`, on hold for now.

- LinkedIn: https://www.linkedin.com/in/gabriel-soares-02a033279/ (edited through Claude in Chrome, where he is logged in).
- Positioning: **Designer & Web Designer** is the main focus. AI is a differentiator ("domínio de IA generativa"). AI video is something he also does, not a focus. He has no AI certificate; he learned it on the job at V4.
- Personal visual identity uses the Grid Oculto palette with a design-and-magic look (playing cards).
- Portfolio site (built 2026-11-06): `Gabriel - Profissional/site-portfolio/`. Next.js 16 + Tailwind 4 + Motion, PT/EN. It has its own git repo and is ignored by the workspace repo. Works go in `lib/data.ts`, copy in `lib/i18n.tsx`. Portfolio pieces show **no dates or years** (Gabriel's request). Published at https://gabrielsoares-design.vercel.app, on the Vercel project `gabrielsoares-design` in Gabriel's personal account (`gabrieloliveira159951-5307`). The project is not connected to GitHub. To update it: `npx vercel@latest deploy --prod --yes` from inside the folder (the CLI is already logged in). Analytics: GTM `GTM-TZX8QSPM` with Consent Mode v2 and a cookie banner. The site pushes these events to the dataLayer (`lib/track.ts`): clique_whatsapp/email/linkedin/instagram (param `local`), abriu_site (`projeto`), abriu_criativo (`cliente`), filtro_criativos, trocou_idioma, virou_carta. GA4 is configured inside GTM by Gabriel.
- The Drive "Portfólio" folder (`1zmSt344NFpVlck_lJcjkXGreX5jUuE4A`) belongs to his personal account and is not on G:. It is public via link, so download with `curl "https://drive.google.com/thumbnail?id=ID&sz=w1600"`.
- Applying changes to LinkedIn requires his explicit approval of the spec. Skip the automatic posts LinkedIn offers.

**Why:** Gabriel wants the same spec-driven process for his own career that he uses for V4 clients.
**How to apply:** For personal or LinkedIn requests, work inside that folder and read its CLAUDE.md and perfil.md. See also [[v4-workspace-estrutura]].
