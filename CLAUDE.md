# Gabriel — Profissional

Workspace pessoal do Gabriel Soares (designer). Aqui ficam o meu perfil profissional (LinkedIn, portfólio, marca pessoal) e **os meus clientes próprios** (freelas e a Grid Oculto).
Este arquivo é autossuficiente: todas as regras de trabalho estão aqui, e não dependem de nenhuma outra pasta.

## Estrutura

```
Gabriel - Profissional/
├── CLAUDE.md          ← regras deste workspace (este arquivo)
├── COMECE-AQUI.md     ← prompt para configurar um computador novo
├── perfil.md          ← dossiê profissional: quem sou, cargo, skills, LinkedIn, ferramentas de IA, resultados
├── insights.md        ← o que funcionou no LinkedIn/portfólio + padrões que valem para vários clientes
├── referencias.md     ← links: LinkedIn, Drive de portfólio, sites, refs externas
├── _inbox.md          ← ideias soltas, sem organizar
├── _templates/        ← modelos: spec.md e cliente/
├── _scripts/reels/    ← pipeline de edição de Reels (ffmpeg + Whisper)
├── _claude/memory/    ← cópia das memórias do Claude (preferências do Gabriel)
├── referencias/       ← material baixado para consulta (não é entrega)
├── specs/             ← uma spec por demanda pessoal (AAAA-MM-DD-nome.md)
├── assets/            ← entregas pessoais, uma pasta por demanda (AAAA-MM-nome/)
├── site-portfolio/    ← site gabrielsoares-design.vercel.app (Next.js, deploy no Vercel)
└── Clientes/
    └── <Cliente>/
        ├── CLAUDE.md      ← regras específicas do cliente
        ├── marca.md       ← dossiê da marca (cores, fontes, logo, tom de voz, público)
        ├── insights.md    ← o que foi aprovado, reprovado, performou + ideias
        ├── referencias.md ← links (Drive do cliente, Instagram, concorrentes) + refs externas
        ├── referencias/   ← referências baixadas (não são entregas)
        ├── specs/         ← uma spec por demanda (AAAA-MM-DD-nome-da-demanda.md)
        └── assets/        ← artes finais, uma pasta por campanha (AAAA-MM-nome-da-campanha/)
```

Clientes atuais: **Grid Oculto** (minha marca/empresa) e **Empreendi Contabilidade** (freela: site em HTML estático na HostGator). Trabalhos feitos para a V4 Company não ficam aqui; entram no máximo como peça de portfólio.

## Cliente novo (sempre seguir)

Quando eu disser "cliente novo: <Nome>":
1. Copie `_templates/cliente/` para `Clientes/<Nome>/` e crie também `referencias.md`, `referencias/`, `specs/` e `assets/`.
2. Troque `{{CLIENTE}}` e `{{APRESENTACAO}}` pelos dados reais.
3. Monte o `marca.md` com o que eu passar (logo, cores, fontes, Instagram, site, público, tom de voz). Se eu mandar um link ou Instagram, leia e preencha. O que faltar, pergunte; não invente.
4. Coloque no `referencias.md` os links que eu passar (Drive do cliente, Instagram, site, concorrentes).
5. Mostre o resumo do que foi criado e o que ainda falta preencher.

## Trabalho guiado por spec

- **Toda demanda nova começa com uma spec** em `specs/` (minha) ou `Clientes/<Cliente>/specs/`, criada a partir de `_templates/spec.md`. Só produza a peça depois que a spec estiver preenchida e aprovada por mim.
- Antes de criar, leia o `CLAUDE.md`, o `marca.md` e o `insights.md` do cliente (para peças pessoais: `perfil.md` e `insights.md`). As regras do cliente têm prioridade sobre as gerais.
- Ao concluir, atualize o **Status** da spec, liste os arquivos entregues e preencha a seção 9 (**Aprendizados**).
- Arquivos finais vão em `assets/AAAA-MM-nome-da-campanha/`, com o mesmo nome da spec.
- Nunca misture assets, cores ou referências entre clientes.

## Busca de referências (obrigatório antes de criar)

1. Abra o `referencias.md` do cliente.
2. Consulte a base do cliente (logo, fontes, cores, fotos) e os criativos anteriores para manter consistência e não repetir peças.
3. Quando fizer sentido, busque referências externas (Instagram do cliente, concorrentes, Pinterest, Behance).
4. Registre as referências usadas na seção **Referências** da spec; as boas para o futuro vão também para o `referencias.md`.
5. Arquivos baixados vão em `referencias/`, nunca em `assets/`.

## Insights (o que aprendemos)

- **Ao entregar:** copie os pontos relevantes dos Aprendizados da spec para o `insights.md` do cliente, com data e link da spec.
- Feedback do cliente ou dado de performance que chegar depois também vai para o `insights.md`.
- Ideias soltas vão para o `_inbox.md`. Quando eu pedir "organiza o inbox", distribua cada item no `insights.md` certo e limpe o inbox.
- Quando um insight se repetir em 2 ou mais clientes, registre no `insights.md` da raiz (seção "Padrões gerais") com a evidência.
- Ritual semanal (sexta): organizar o inbox → revisar specs entregues e preencher aprendizados → commit.

## Regras gerais

- **Idioma:** sempre responder em português (pt-BR). Textos das peças em pt-BR; prompts de geração de imagem em inglês.
- **Formato padrão de criativo:** "criativo" ou "criativo para Instagram" = **1080×1350 px** (4:5), a menos que eu informe outra dimensão. Stories/Reels: 1080×1920.
- **Formatos LinkedIn:** banner 1584×396 px; foto de perfil 400×400 px; post 1080×1350 (padrão) ou 1200×627 (link).
- **Custo no Magnific:** cada imagem deve custar perto de **60 créditos**: qualidade `medium`, resolução de no máximo **2k**, só quando precisar. Antes de gerar, rode `simulate_cost` e anote o custo na spec.
- **Edição de Reels (vídeo do cliente):** feita localmente com ffmpeg + Whisper, sem IA alterando imagem ou voz. Scripts em `_scripts/reels/` (`transcribe.mjs`, `reel.mjs`, `qa.mjs`; adaptar textos/caminhos ao cliente). ffmpeg via `npm i ffmpeg-static`. Vídeo de WhatsApp é VFR: normalizar para 30 fps constantes antes de cortar. Cada Reel com até ~75 s. **Eu faço os cortes**; o Claude entra depois com legenda palavra a palavra, B-roll de stock, transições, título e cartela. Não reescolher os trechos que eu mandar.
- **Entregas e Git:** se a pasta estiver num repositório Git, quando eu disser "commita tudo", faça commit e push. Nunca suba chaves de API, `.env` ou senhas.

## Regras do perfil pessoal

- Antes de qualquer peça pessoal (banner, post, portfólio), leia `perfil.md` e `insights.md`.
- **LinkedIn:** nunca publicar ou alterar nada no perfil sem aprovação explícita do texto/arte final. Primeiro rascunho na spec, depois aplicar.
- **Claims de IA:** descrever competência com provas (ferramentas, entregas, números reais). Não inventar certificações, cargos ou resultados.
- **Identidade visual pessoal = paleta da Grid Oculto** (preto `#0A0A0A`, creme `#E5DAC8`, verde-azulado `#26A69A`, vermelho `#B71C1C`) + estética design e mágica (cartas de baralho, naipes, brilhos, grid oculto). Detalhes em `perfil.md` seção 8 e `Clientes/Grid Oculto/marca.md`.
- **Posicionamento:** foco principal é Designer & Web Designer; IA é diferencial (domínio de IA generativa para velocidade e qualidade); vídeo com IA aparece como algo que também faz, não como foco.
- **Site portfólio:** `site-portfolio/`, publicado em https://gabrielsoares-design.vercel.app (Next.js no Vercel).
