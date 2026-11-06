# Spec: Currículo em PDF

- **Cliente:** Gabriel Soares (perfil pessoal)
- **Data:** 2026-11-06
- **Status:** entregue (aguardando revisão do Gabriel)
- **Solicitante:** Gabriel

## 1. Objetivo
Currículo de 1 página em PDF para candidaturas, com a mesma trajetória e o mesmo posicionamento do LinkedIn (Designer & Web Designer, IA como diferencial).

## 2. Fonte
`perfil.md` (seções 1, 4, 5, 7b), spec `2026-11-06-linkedin-reposicionamento-ia.md` (Sobre, tópico de IA da V4), `site-portfolio/lib/data.ts` (contato e projetos).

## 3. Decisões
- **Sem foto:** padrão atual e mais amigável para ATS. A foto está disponível caso alguma vaga peça.
- Texto real no PDF (não é imagem), para ser lido por ATS. Links clicáveis (WhatsApp, e-mail, LinkedIn, Instagram, Drive).
- Visual: paleta da Grid Oculto (lateral preta com grid, verde-azulado, losango vermelho), Cinzel + Montserrat. Área principal branca, que imprime bem.
- "Cerca de 20 contas" = número de clientes em `V4 - Company/Clientes/` em 2026-11-06.
- Sem datas de formação nem idiomas (não constam no perfil).

## 4. Entregas
`assets/2026-11-curriculo/`
- `curriculo-gabriel-soares.pdf` (A4, 1 página)
- `curriculo-gabriel-soares.html` (fonte editável; exportar com Chrome headless `--print-to-pdf --no-pdf-header-footer`)

## 5. Pendências
- [ ] Ano de conclusão do Senac
- [ ] Idiomas (se houver)
- [ ] Certificados Growth V4 quando baixados
- [ ] Trocar o link do Drive pelo site-portfólio quando for publicado na Vercel
