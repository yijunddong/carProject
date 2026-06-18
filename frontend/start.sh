#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

HOST="${HOST:-0.0.0.0}"
PORT="${PORT:-5200}"

if [ ! -f dist/index.html ]; then
  npm run build
fi

exec npm run preview -- --host "$HOST" --port "$PORT"
