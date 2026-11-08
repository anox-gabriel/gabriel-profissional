---
name: edicao-reels-local
description: "Edição de vídeo do cliente para Reels é feita localmente (ffmpeg + Whisper), sem IA no material; scripts prontos no Dr. Messias"
metadata:
  node_type: memory
  type: project
  originSessionId: 5f99d428-374c-4fac-b099-0fd5c8adbf8a
  modified: 2026-11-06T16:57:03.837Z
---

Pedidos de "editar vídeo pronto" (cortes + legenda para Instagram) são feitos localmente, sem Magnific e sem IA alterando imagem e voz. Exigência do gestor de Gabriel: material original, cada Reel com até ~75 s, nunca o vídeo de 4 min inteiro.

Pipeline pronto em `Clientes/Dr. Messias Pacheco/assets/2026-11-reels-novembro/_projeto/`:
- `transcribe.mjs`: Whisper `onnx-community/whisper-small_timestamped` via transformers.js. O download do modelo pelo Node trunca; baixe com `curl -C -`.
- `reel.mjs`: cortes, remoção de silêncio, legenda ASS palavra a palavra, título, B-roll e cartela.
- `qa.mjs`: re-transcreve o Reel final e compara com a legenda.

Ferramentas: ffmpeg via `npm i ffmpeg-static`. Normalizar vídeo de WhatsApp para 30 fps constantes antes de cortar (é VFR). No `.ass`, a fonte Montserrat da fontsource se chama "Montserrat Thin ExtraBold".

**Divisão de trabalho (feedback de 2026-11-06):** Gabriel achou ruins os cortes que fiz sozinho (escolha de trecho e ponto de corte). A partir de agora ele faz os cortes e eu entro depois com legenda palavra a palavra (estilo aprovado), B-roll de stock do Freepik, transições (flash, zoom etc.), título e cartela. Não reescolher nem recortar os trechos que ele mandar.

`video_analyze` do Magnific serve para transcrever, mas trava com vídeo 1080p longo. Ver [[drive-sincronizado-g]].
