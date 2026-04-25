#!/bin/sh
set -eu

cd /app

LOCK_HASH_FILE="/app/node_modules/.package-lock.sha256"
CURRENT_LOCK_HASH="$(sha256sum package-lock.json | awk '{print $1}')"
INSTALLED_LOCK_HASH="$(cat "$LOCK_HASH_FILE" 2>/dev/null || true)"

if [ ! -x /app/node_modules/.bin/vite ] || [ "$CURRENT_LOCK_HASH" != "$INSTALLED_LOCK_HASH" ]; then
  echo "Installing client dependencies..."
  npm ci --no-audit --no-fund
  echo "$CURRENT_LOCK_HASH" > "$LOCK_HASH_FILE"
else
  echo "Reusing cached client dependencies from node_modules volume."
fi

exec npm run dev
