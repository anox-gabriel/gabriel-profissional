# Spec: 4 posts de feed (lançamento, com o visual do site novo)

- **Cliente:** Empreendi Contabilidade
- **Data:** 2026-11-10
- **Status:** entregue v2 (aguardando aprovação)
- **Solicitante:** Gabriel

## 1. Objetivo
Manter o Instagram ativo enquanto a cliente não manda os contatos, apresentando os 3 públicos (saúde, infoprodutores, licitações) e a prova social do Google.

## 2. Contexto
Mesmo visual do site novo (`assets/2026-11-site-institucional/`). Os posts **não trazem telefone, @ nem link**, porque esses dados ainda estão pendentes. O CTA leva para a DM / "fale com uma contadora especialista".

## 3. Peças e formatos
| Peça | Canal | Dimensão | Quantidade |
|---|---|---|---|
| Feed | Instagram | 1080×1350 | 4 |

## 4. Copy (v2, a que foi entregue)
**01. Equiparação hospitalar:** selo EQUIPARAÇÃO HOSPITALAR · "Sua clínica pode pagar **menos imposto** dentro da lei." · CTA "Fale com uma especialista"
**02. Infoprodutores:** selo INFOPRODUTORES DA SAÚDE · "Vende **curso ou mentoria** na saúde?" · "Regime ideal, nota fiscal e repasses de Hotmart, Kiwify, Eduzz e Monetizze." · CTA
**03. Licitações:** selo LICITAÇÕES NA SAÚDE · "Quer vender para o governo? Comece pela **regularidade fiscal.**" · checklist: Certidões em dia / Ajustes para habilitação / Suporte contínuo em editais · CTA
**04. Prova social:** "Tornar **simples** o que sempre pareceu complicado." · card com o depoimento do Weinne S. (Google) · selo "5,0 no Google · 46 avaliações" · celular mostrando 5,0

(A copy da v1 está no histórico do Git.)

## 5. Direção visual
**v1 (reprovada):** fundo navy com cards de vidro, só tipografia e ícones, no estilo da interface do site. O Gabriel achou "estranho e sem graça". Os arquivos estão em `v1-reprovado/`.
**v2 (entregue):** editorial fotográfico e claro. Fundo off-white , foto realista do público à direita sobre uma grande forma azul , barras diagonais douradas (o símbolo da marca), título navy pesado e apertado com a palavra-chave em bloco azul de marca-texto, selo navy com texto dourado e botão navy com seta. Os modelos são gerados por IA, representam o público e não aparecem como equipe nem como autores dos depoimentos (no 04 há só uma mão segurando o celular).

## 5.1 Referências
| Referência | O que aproveitar |
|---|---|
| `raw/01-equiparacao-hospitalar.png` (v2) | o teste aprovado virou a referência de estilo dos outros 3 |
| Logo `logo-fundo-claro` | colado depois (210 px, x 86, y 46) |

## 6. Restrições de marca
Sem número de economia (CFC), sem citar concorrentes, sem contato inventado.

## 6.1 Processo
Magnific, `gpt-2-mini`, qualidade `medium`, 4:5 em 2k = **65 créditos por imagem** (simulado). Pós-produção (Node + sharp): recorte para 1080×1350 e logo colado.

## 7. Critérios de aceite
- [ ] Segue o visual do site
- [ ] 1080×1350
- [ ] Acentos corretos
- [ ] Salvos em `assets/2026-11-posts-feed-lancamento/`

## 8. Entregas
Em `assets/2026-11-posts-feed-lancamento/` (1080×1350): `01-equiparacao-hospitalar.png`, `02-infoprodutores-saude.png`, `03-licitacoes-saude.png`, `04-prova-social-google.png`, `_prancha.jpg`. Gerações originais em `raw/`; a v1 está em `v1-reprovado/`.

Custo: v1 4 × 65 + v2 4 × 65 = **520 créditos**. Gerei em 3:4 (o modelo não aceita 4:5), recortei 96 px em cima e 32 px embaixo e colei o logo para fundo claro. No 03, as letras "p" e "a" saíram com o miolo cinza; corrigi no pixel, trocando o cinza pela cor do fundo.

## 9. Aprendizados
- **O que funcionou:** a v2 com foto do público, fundo claro e marca-texto azul deu vida aos posts. Gerar 1 teste e usá-lo como referência deixou os outros 3 consistentes.
- **Feedback do cliente:** Gabriel reprovou a v1 (navy + cards de vidro, sem foto): "estranho e sem graça".
- **O que eu faria diferente:** para esta cliente, começar já com foto e fundo claro. Quando o Gabriel fala em "estilo predefinido do Magnific", ele quer dizer a configuração de custo (medium, até 2k, ~60 créditos), não um estilo visual.
