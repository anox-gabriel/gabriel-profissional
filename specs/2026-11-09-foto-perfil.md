# Spec: Foto de perfil (LinkedIn) na identidade Grid Oculto

- **Data:** 2026-11-09
- **Status:** entregue (o Gabriel troca no LinkedIn manualmente)

## Pedido
Selfie tirada no carro, sem o carro no fundo. Fundo simples na paleta da Grid Oculto e sem efeitos, para não brigar com o banner.

## Processo
1. Remoção de fundo no Magnific (3 créditos).
2. Os ombros estavam colados na borda, o que deixava o rosto grande demais no círculo. Fiz um expand com IA no Magnific (50 créditos) para completar os ombros e o suéter, e outra remoção de fundo (3 créditos). Total: **56 créditos**.
3. Montagem local (sharp):
   - O expand sai em 1024 px, então usei a versão ampliada como base e coloquei por cima o recorte original em alta.
   - Recorte quadrado mais aberto; o corte de baixo exclui o logo laranja do suéter.
   - Fundo com gradiente radial bem leve, sem outros efeitos.

## Entregas
`assets/2026-11-foto-perfil/`
- `foto-perfil-creme-1080.jpg` (recomendada: contrasta com o banner escuro e combina com o suéter marrom)
- `foto-perfil-preto-1080.jpg`
- `foto-perfil-teal-1080.jpg`
- `foto-perfil-recorte-transparente-1080.png`
- `raw/`: original, recortes, expandida e montagem híbrida em 1800 px

## v2: segunda selfie (2026-11-09)
- Pedido: "melhore a qualidade" da nova selfie.
- Upscale no Magnific custaria 72 créditos ou mais (acima do teto de ~60), e o LinkedIn exibe a foto em 400 px. Por isso a melhoria foi feita localmente, sem custo:
  - redução de ruído leve, contraste e saturação;
  - cor um pouco mais quente e nitidez.
- Fundo removido no Magnific (3 créditos).
- O enquadramento não precisou de expand: o recorte quadrado de 1200 px da própria foto já tem respiro.
- Entregas: `foto-perfil-v2-creme-1080.jpg` (recomendada), `-preto`, `-teal` e `foto-perfil-v2-recorte-transparente-1080.png`.
