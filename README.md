# miqui.com.br

Meu site pessoal em formato de **terminal interativo**. Acesse [miqui.com.br](https://miqui.com.br) e digite `help`.

HTML, CSS e JavaScript puros: sem framework, sem build, sem dependências.

## Estrutura

| Arquivo | Função |
|---|---|
| `content.js` | Todo o conteúdo (sobre, experiência, projetos, skills, contato) |
| `terminal.js` | Comandos, histórico, autocompletar e o modo simples |
| `style.css` | Visual do terminal e temas |
| `index.html` | Página |
| `deploy.sh` | Publica via SFTP na hospedagem |

## Rodando localmente

```bash
python3 -m http.server 8080
```

## Deploy

Cada push na `main` publica o site automaticamente pelo GitHub Actions (`.github/workflows/deploy.yml`).
Para publicar manualmente, crie um `.deploy.env` (ignorado pelo git) com `DEPLOY_HOST=usuario@host` e rode `./deploy.sh`. No GitHub Actions, configure os secrets `DEPLOY_SSH_KEY` e `DEPLOY_HOST`.
