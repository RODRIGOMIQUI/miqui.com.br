#!/usr/bin/env bash
# Publica o site via SFTP (a hospedagem não tem shell, só SFTP).
# Configuração (nada sensível fica no repositório):
#   DEPLOY_HOST  usuario@host do SFTP (ou num arquivo .deploy.env, ignorado pelo git)
#   DEPLOY_KEY   caminho da chave privada (padrão: ~/.ssh/id_miquicombr)
set -euo pipefail

cd "$(dirname "$0")"
[ -f .deploy.env ] && . ./.deploy.env

HOST="${DEPLOY_HOST:?Defina DEPLOY_HOST (usuario@host) no ambiente ou em .deploy.env}"
KEY="${DEPLOY_KEY:-$HOME/.ssh/id_miquicombr}"
REMOTE="public_html"
FILES=(index.html style.css terminal.js content.js .htaccess)

{
  for f in "${FILES[@]}"; do echo "put $f $REMOTE/$f"; done
  for f in "${FILES[@]}"; do echo "chmod 644 $REMOTE/$f"; done
} | sftp -q -i "$KEY" -o IdentitiesOnly=yes -o BatchMode=yes -b - "$HOST"

echo "Publicado: https://miqui.com.br"
