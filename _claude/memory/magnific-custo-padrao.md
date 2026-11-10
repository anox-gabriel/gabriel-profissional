---
name: magnific-custo-padrao
description: "Magnific generations for every client: target about 60 credits per image, quality \"medium\", max 2k resolution"
metadata:
  node_type: memory
  type: feedback
  originSessionId: da15c869-936c-4311-adfe-c3215920a0bd
  modified: 2026-11-10T12:54:43.320Z
---

On Magnific, every image generation for every client should cost about 60 credits, or close to that. Use quality `medium`, and only go up to 2k resolution if needed, never above.

**Why:** On 2026-11-04 the In Natura Black Friday prices used GPT 2.5 at quality `high`, which cost 95 credits per image. The user accepted it that time but asked not to repeat it.

**How to apply:** Before generating, run `simulate_cost` with `quality: "medium"` (and resolution ≤ 2k when the model has that option). If it costs well over about 60, lower the settings or pick a cheaper model before going ahead. Write the cost in the spec. See [[v4-workspace-estrutura]] and [[formato-criativo-padrao]].

When the user says "estilo predefinido do Magnific" or "naquele estilo do Magnific", they mean these cost settings, not a visual style. Do not reuse the look of a previous client because of that phrase. (Confirmed 2026-11-10 with Empreendi.)

Nota (2026-11-06, Malu Vinhos): `gpt-2-mini` não tem 4:5 (vira 3:4) e em 1k sai 768×1024, abaixo de 1080. Para criativo final usar `resolution: "2k"` (65 créditos, 1536×2048) e recortar para 4:5. Para abrir margem sem regerar: `images_expand` modo `classic` custa 10 créditos.
