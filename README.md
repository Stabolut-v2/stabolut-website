# 🌐 Stabolut Website

Landing page estática + Ghost blog para [stabolut.com](https://stabolut.com).

## Estructura

```
/
├── index.html          # Landing page actual (exportada de Framer)
├── assets/             # Imágenes, CSS, JS
├── docs/
│   ├── app-platform-setup.md   # Setup DO App Platform
│   └── seo-audit.md            # Auditoría SEO completa
├── research/           # Outputs de agentes de investigación
└── README.md
```

## Deploy

Hosteado en **Digital Ocean App Platform**:
- `stabolut.com` → Static Site (desde este repo, branch `main`)
- `blog.stabolut.com` → Ghost container ($5/mo)

Ver `docs/app-platform-setup.md` para instrucciones detalladas.

## Stack

- **Static site:** HTML plano (migración desde Framer)
- **Blog:** Ghost 5.x (Node.js)
- **Hosting:** DO App Platform
- **Dominio:** stabolut.com (vía DO DNS)

## Repos relacionados

- [Stabolut-v2/contracts-v1](https://github.com/Stabolut-v2/contracts-v1) — Smart contracts USB
- [Stabolut-v2/backend](https://github.com/Stabolut-v2/backend) — Indexer Ponder
- [Stabolut-v2/frontend](https://github.com/Stabolut-v2/frontend) — Frontend v2 testnet
