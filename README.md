# BestUGCs — Roblox UGC Community

Site de comunidade para descobrir e compartilhar os melhores UGCs do Roblox.

## Deploy no Vercel

1. Importe este repositório no [Vercel](https://vercel.com)
2. Framework: **Vite** (detectado automaticamente)
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Adicione a variável de ambiente:
   - `DISCORD_WEBHOOK_URL` — URL do webhook Discord para logs

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Wouter (roteamento)
- Vercel Serverless Functions (pasta `api/`)

## Rotas da API

| Rota | Método | Descrição |
|------|--------|-----------|
| `/api/logs` | POST | Registra eventos e envia para Discord |
| `/api/roblox` | GET | Proxy para thumbnails do Roblox (`?ids=...`) |
