---
name: drive-sincronizado-g
description: "Google Drive dos clientes está sincronizado no PC em G:, use-o para ler/copiar arquivos grandes em vez do conector"
metadata:
  node_type: memory
  type: reference
  originSessionId: 5f99d428-374c-4fac-b099-0fd5c8adbf8a
  modified: 2026-11-06T14:21:17.744Z
---

O Google Drive for Desktop está montado em `G:`. A pasta compartilhada `_Clientes` fica em `G:\.shortcut-targets-by-id\1NcAAKj_kmPjSLwVL9fNcrjUKr5BG0Wde\_Clientes\<Cliente>\` (nomes de pasta do Drive podem diferir do workspace, ex.: "Dr. Messias Junior").

Use esse caminho para copiar imagens/vídeos e para devolver entregas no Drive (copiar o arquivo para a pasta já sincroniza). O conector `download_file_content` devolve base64 no contexto e não serve para arquivos grandes.

Cuidados: caminhos com `[VS]` precisam de `-LiteralPath` no PowerShell; curl e ffmpeg (Windows) falham com `[VS]`/`/c/` — copie para o scratchpad ou use `cygpath -w`. ffmpeg não vem instalado: `npm i ffmpeg-static` no scratchpad. Ver [[v4-workspace-estrutura]].
