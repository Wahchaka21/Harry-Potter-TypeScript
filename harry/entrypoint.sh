#!/bin/sh

set -e

if [ ! -d "node_modules" ]; then
    echo "==> Installation des dépendances npm..."
    npm install
fi

echo "==> Lancement de Vite"
exec "$@"