# Spec: Site institucional (recriação + novo layout)

- **Cliente:** Empreendi Contabilidade
- **Data:** 2026-11-10
- **Status:** em produção (o pedido de 2026-11-10 já autorizou criar o layout a partir dos textos novos)
- **Solicitante:** Gabriel (a pedido da cliente)

## 1. Objetivo
Recolocar no ar o site empreendicontabil.com.br, que a HostGator apagou, com layout novo baseado nos textos atualizados da cliente. A meta é gerar conversa no WhatsApp com quem chega do Google e do Instagram.

## 2. Contexto
- O site antigo era WordPress + WPBakery e foi apagado.
- O layout do Figma (`referencias/layout-antigo/`) é a base de estrutura e cores. Pode ser modernizado.
- A cliente mandou textos novos (`referencias/textos-site-cliente-2026-11.docx`) com foco em Saúde, Infoprodutos e Licitações.
- Hospedagem: HostGator compartilhada. Por isso o site é **estático (HTML + CSS + JS)**, sem WordPress e sem build.

## 3. Peças e formatos
| Peça | Canal | Formato | Quantidade |
|---|---|---|---|
| Landing page institucional (one-page) | empreendicontabil.com.br | HTML/CSS/JS responsivo | 1 |
| `.htaccess` (HTTPS, cache, gzip) | HostGator | arquivo | 1 |
| Guia de publicação | Gabriel | `COMO-PUBLICAR.md` | 1 |

## 4. Estrutura e copy (textos da cliente; ajustes mínimos)
1. **Header fixo:** logo · Sobre · Diferenciais · Serviços · Depoimentos · Clientes · botão "Falar no WhatsApp".
2. **Hero:** "Contabilidade digital especializada em saúde, infoprodutos e licitações" + subtítulo + CTA "Falar com uma contadora especialista" + selo Google 5,0.
3. **Faixa de pilares:** Saúde · Infoprodutos · Licitações · Equiparação hospitalar · Reforma Tributária.
4. **Sobre:** texto "Sobre a empresa" + propósito "Tornar simples aquilo que sempre pareceu complicado".
5. **Diferenciais:** os 6 do documento.
6. **Serviços:** abas com os 3 públicos (Saúde / Infoprodutores / Licitações), com a lista completa de cada um. Infoprodutores leva o selo "diferencial".
7. **Benefícios:** os 6 do documento.
8. **Depoimentos:** avaliações reais do Google (carrossel) + link para ver todas.
9. **Clientes e parceiros:** logos; a Laudo Master rotulada como parceira.
10. **CTA final:** "Sua contabilidade pode ser simples, estratégica e segura".
11. **Rodapé:** contatos, redes, CNPJ.
12. **Botão flutuante de WhatsApp.**

## 5. Direção visual
- Azul-marinho + azul da marca + detalhes em dourado (gradiente da logo). Muito respiro, cantos arredondados e cards com vidro sutil sobre o escuro.
- **Sem fotos de banco de imagens:** os visuais são feitos em código (cards de interface, ícones em SVG e as barras diagonais do símbolo como grafismo). O site fica leve e não usa imagem genérica de escritório.
- Interações: revelar ao rolar, abas de serviços, carrossel de depoimentos com arrastar, header que muda ao rolar, menu mobile e faixa de pilares em loop.
- Fonte: Plus Jakarta Sans (Google Fonts).

## 5.1 Referências
| Referência | O que aproveitar |
|---|---|
| `referencias/layout-antigo/layout-antigo-figma.png` | ordem das seções, paleta, CTAs, faixa do Google |
| `referencias/textos-site-cliente-2026-11.docx` | todo o texto |
| `referencias/depoimentos-google.md` | depoimentos (★) |
| `assets/marca/` | logos |

## 6. Restrições de marca
- Sem promessa de economia em número (CFC). Sem citar concorrentes. Sem depoimentos inventados.
- A Laudo Master é parceira, não cliente.

## 7. Critérios de aceite
- [ ] Todos os textos do documento da cliente estão no site
- [ ] Responsivo (360 px → 1440 px), sem rolagem horizontal
- [ ] Funciona abrindo o `index.html` direto e na HostGator (caminhos relativos)
- [ ] Links de WhatsApp abrindo com mensagem pronta
- [ ] SEO básico: title, description, Open Graph, dados estruturados, favicon
- [ ] Pendências marcadas (CNPJ, Instagram, LinkedIn, Facebook, e-mail)

## 8. Entregas
`assets/2026-11-site-institucional/` (subir o **conteúdo** desta pasta no `public_html`):
- `index.html`: página única com todas as seções
- `assets/css/style.css`, `assets/js/main.js`
- `assets/img/`: logos (520 px), favicon SVG/PNG, apple-touch-icon, og-image (1200×630), `clientes/*.webp`
- `.htaccess`: HTTPS, sem www, gzip, cache, redirecionamento das URLs antigas do WP
- `COMO-PUBLICAR.md`: passo a passo na HostGator (não sobe para o servidor)

Testado em 2026-11-10 no Chrome, em 1440 px e 400 px: sem erros no console e sem rolagem horizontal.
Contatos preenchidos em 2026-11-10 (e-mail, Instagram @wanessamlemos, CNPJ e razão social; WhatsApp confirmado). Sem Facebook/LinkedIn.
Nos depoimentos, corrigi acento e ortografia (ex.: "a quase" → "há quase") e abreviei os sobrenomes. O sentido não mudou.

## 9. Aprendizados
Preencher ao marcar como **entregue**.
- **O que funcionou:** 
- **Feedback do cliente:** 
- **O que eu faria diferente:** 
- **Performance (se houver):** 
