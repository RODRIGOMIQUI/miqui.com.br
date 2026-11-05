#!/usr/bin/env bash
# Publica o site via SFTP (a hospedagem não tem shell, só SFTP).
# Configuração (nada sensível fica no repositório):
#   DEPLOY_HOST  usuario@host do SFTP (ou num arquivo .deploy.env, ignorado pelo git)
#   DEPLOY_KEY   caminho da chave privada (padrão: ~/.ssh/id_miquicombr)
#   DEPLOY_DEBUG=1  mostra o diálogo SSH (diagnóstico de conexão)
set -euo pipefail

cd "$(dirname "$0")"
[ -f .deploy.env ] && . ./.deploy.env

HOST="${DEPLOY_HOST:?Defina DEPLOY_HOST (usuario@host) no ambiente ou em .deploy.env}"
KEY="${DEPLOY_KEY:-$HOME/.ssh/id_miquicombr}"
REMOTE="public_html"
VERB=-q; [ "${DEPLOY_DEBUG:-}" = 1 ] && VERB=-vv
FILES=(index.html style.css terminal.js content.js .htaccess img/*)

{
  echo "-mkdir $REMOTE/img"  # o "-" ignora o erro se a pasta já existir
  for f in "${FILES[@]}"; do echo "put $f $REMOTE/$f"; done
  for f in "${FILES[@]}"; do echo "chmod 644 $REMOTE/$f"; done
} | sftp "$VERB" -i "$KEY" -o IdentitiesOnly=yes -o BatchMode=yes -b - "$HOST" \
  2> >(sed "s/${HOST%@*}/***/g" >&2)  # não expõe o usuário no log (o do CI é público)

echo "Publicado: https://miqui.com.br"
