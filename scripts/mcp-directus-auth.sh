#!/usr/bin/env bash
# MCP Directus auth helper — reads DIRECTUS_TOKEN from .env and outputs
# the Authorization header as JSON for Claude Code's `headersHelper`.
# Invoked at each MCP connection (and reconnection). 10s timeout.
set -euo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
ENV_FILE="$ROOT/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "{}"
  exit 0
fi

TOKEN="$(grep -E '^DIRECTUS_TOKEN=' "$ENV_FILE" | head -1 | cut -d= -f2- | tr -d '"' | tr -d "'" | tr -d '\r')"

if [[ -z "$TOKEN" ]]; then
  echo "{}"
  exit 0
fi

printf '{"Authorization":"Bearer %s"}\n' "$TOKEN"
