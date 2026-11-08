---
name: v4-workspace-estrutura
description: User is the designer at V4 Company (Novaes); client folders live under V4 - Company/Clientes with spec-driven workflow
metadata:
  node_type: memory
  type: project
  originSessionId: d4b53479-44d6-48ab-9e75-c75f729a9985
  modified: 2026-11-04T14:12:31.238Z
---

User (Gabriel) is the designer at V4 Company (unidade Novaes). Root: `c:\[VS] Claude\Workspaces\V4 - Company`. Each client in `Clientes/<Nome>/` has CLAUDE.md (client rules), marca.md (brand dossier; In Natura uses in-natura-farmacia.md), specs/, assets/. Templates in `_templates/`. Organized 2026-11-04 with 20 clients from the v4novaes.com.br presentations list.

Google Drive connector is logged in as gabrieloliveira@v4company.com. Client folders live in the shared folder `_Clientes` (id 1NcAAKj_kmPjSLwVL9fNcrjUKr5BG0Wde). The client-to-folder map is in `V4 - Company/drive.md`, and each client's CLAUDE.md has a link to its own folder.

Before any new creation, look up references and past creatives through the Drive links in the client's `referencias.md`, and record the ones used in the spec. The user asked for this on 2026-11-04. Downloaded references go in the client's `referencias/` folder, not in `assets/`.

**Why:** User wants spec-driven design work with rules isolated per client.
**How to apply:** Work inside the client folder, read its CLAUDE.md + marca.md, start each demand with a spec from _templates/spec.md. Note: PowerShell Remove-Item is blocked on paths with `[VS]`; use [IO.File]::Delete.
