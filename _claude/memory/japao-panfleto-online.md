---
name: japao-panfleto-online
description: "Panfleto online da Japão da Construção = Next.js do v0 no repo anox-gabriel/panfleto-japao, publicado em panfleto-japao.vercel.app"
metadata:
  node_type: memory
  type: project
  originSessionId: f85e711f-551d-4661-853c-a6a3882e0884
  modified: 2026-11-05T17:55:08.095Z
---

O panfleto online mensal da Japão da Construção foi gerado no v0 (o Gabriel colou o prompt manualmente). O código fica no repo GitHub `anox-gabriel/panfleto-japao`, que é outra conta do Gabriel; a gabrieloliveira-v4 é colaboradora. Ele foi clonado em `V4 - Company/Clientes/Japão da Construção/panfleto-japao/`, pasta que está no .gitignore do workspace. Push na `main` publica sozinho em https://panfleto-japao.vercel.app.

- Ofertas do mês: só em `lib/ofertas.ts`. Imagens em `public/images/`. Layout em `components/black-november.tsx` e `app/globals.css`.
- A identidade git do repo foi configurada localmente (gabrieloliveira-v4). `git -C` com caminho `[VS]` falha; usar `cd`.
- A pasta antiga `panfleto-online/` (HTML estático + v0-prompt.md + ofertas.json) é só o rascunho e a fonte das imagens.

**Why:** a Vercel da empresa tem dados confidenciais de outros clientes, então o projeto ficou numa conta à parte. O HTML puro foi considerado "cru" demais.
**How to apply:** nos próximos meses, edite `lib/ofertas.ts` e as imagens, faça push e confira o deploy. Evite editar ao mesmo tempo pelo v0 e pelo git, para não dar conflito. Ver [[v4-workspace-estrutura]].
