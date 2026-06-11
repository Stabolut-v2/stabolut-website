# STB-009: Setup Digital Ocean App Platform — Static Site + Ghost Blog

## Arquitectura

```
stabolut.com ──► Static Site (HTML estático, gratis)
blog.stabolut.com ──► Ghost Blog ($5/mo container)
```

Sin servidores que gestionar. Sin SSH. Sin Nginx. Sin `apt update`.

---

## 1) Crear cuenta en Digital Ocean

1. Ve a https://cloud.digitalocean.com
2. Regístrate o haz login
3. Ve a **Apps** → **Create App**

---

## 2) Configurar Static Site para stabolut.com

### Opción A: Desde GitHub (recomendada)
1. Sube los HTMLs estáticos de stabolut.com a un repo de GitHub
2. En DO App Platform: **Create App** → **GitHub** → selecciona el repo
3. Config:
   - **Resource Type:** Static Site
   - **Build Command:** `(vacío — solo HTML estático)`
   - **Output Directory:** `.` (o `./public` si tienes los HTMLs ahí)
   - **HTTP Port:** (no aplica a static site)
4. Plan: **Free** ($0/mo)
5. **Dominio:** `stabolut.com`
   - DO te da HTTPS automático con Let's Encrypt
   - Añade el CNAME en tu DNS apuntando a `stabolut-com.ondigitalocean.app`

### Opción B: Deploy directo (sin GitHub)
- DO App Platform necesita un source (GitHub, GitLab, DO Container Registry)
- Si no tienes repo, súbelos a GitHub y conecta

---

## 3) Configurar Ghost en App Platform

### Opción A: Ghost 1-Click (más fácil)
En App Platform hay Ghost preconfigurado. Pero cuidado:
- Ghost necesita **base de datos** (PostgreSQL o MySQL)
- App Platform te permite añadir una base de datos **managed**

Pasos:
1. **Create App** → elegir **Docker Hub** o **DO Container Registry**
2. Usa la imagen oficial: `ghost:5-alpine`
3. **Resource Type:** Web Service
4. Config:
   - **HTTP Port:** `2368` (puerto interno de Ghost)
   - **Plan:** $5/mo (Basic)
5. **Variables de entorno obligatorias:**
   ```
   url=https://blog.stabolut.com
   database__client=mysql
   database__connection__host=TU_DB_HOST
   database__connection__user=TU_DB_USER
   database__connection__password=TU_DB_PASS
   database__connection__database=ghost
   ```
6. **Añadir base de datos:**
   - Ve a **Databases** → **Create Database**
   - Elige MySQL 8
   - Plan: $7/mo (Basic, 1GB RAM, 10GB storage) o **Dev DB** (gratis, limitado a 25 años de vida)

🚨 **Coste total real con DB:**
   - Static site: $0
   - Ghost container: $5
   - MySQL DB: $7 (o $0 con Dev DB)
   - **Total: $5-12/mo**

### Opción B: Ghost + SQLite (más barato, sin DB externa)
Si no quieres pagar base de datos, puedes modificar Ghost para usar SQLite:
1. Usa `ghost:5-alpine`
2. Monta un volume persistente para la DB SQLite (App Platform lo soporta)
3. No necesitas MySQL → ahorras $7/mo

Config:
```
url=https://blog.stabolut.com
NODE_ENV=production
```
Monta `/var/lib/ghost/content` como persistent volume (DO App Platform lo permite en Web Services).

**Total: $5/mo** — solo el container de Ghost. La DB va en SQLite dentro del volume.

---

## 4) DNS

En tu gestor de dominios (donde tengas stabolut.com):

| Tipo | Nombre | Valor |
|---|---|---|
| CNAME | `@` | `stabolut-com.ondigitalocean.app` |
| CNAME | `blog` | `blog-stabolut-com.ondigitalocean.app` |

(Reemplaza los valores `.ondigitalocean.app` con los que te dé DO al crear las apps.)

---

## 5) Migrar la web actual (Framer → HTML estático)

La web actual está en Framer. Para pasar a HTML estático:

### Opción A: Exportar desde Framer
1. En Framer Editor: **File** → **Export as Static Site**
2. Te descarga una carpeta con HTML + CSS + JS
3. Sube eso al repo de GitHub → DO lo sirve

### Opción B: Reconstruir en HTML plano
Si prefieres no depender de Framer, podemos construir la landing desde cero:
- HTML semántico optimizado para SEO
- Sin JS pesado de Framer
- Carga instantánea

### Opción C: Dejar Framer como está, solo añadir Ghost para el blog
No hace falta mover la web principal. Solo añadir `blog.stabolut.com` para el contenido.

---

## 6) Recomendación final

**Setup mínimo viable ($5/mo):**
1. Ghost container ($5) con SQLite volume
2. Static site (gratis) — los HTMLs de la web actual
3. Añadir `blog` CNAME al DNS

**Setup completo ($12/mo) si esperas tráfico:**
1. Ghost container ($5)
2. MySQL managed DB ($7)
3. Static site (gratis)

---

## 7) Posts iniciales para el blog

Cuando esté funcionando, primeros 4 artículos:

1. **"What is a Yield-Bearing Stablecoin?"** — Educational cornerstone
2. **"How USB Works: Delta-Neutral Strategy Explained"** — Product deep-dive
3. **"Crypto-Backed Stablecoins vs Fiat-Backed: Complete Guide"** — Comparison piece (SEO gold)
4. **"Why Decentralized Stablecoins Matter in 2026"** — Thought leadership

---

## Costes resumen

| Componente | Plan mínimo | Plan completo |
|---|---|---|
| Static site (stabolut.com) | $0 | $0 |
| Ghost blog | $5/mo | $5/mo |
| Base de datos | $0 (SQLite) | $7/mo (MySQL) |
| Dominio | Ya lo tienes | Ya lo tienes |
| **Total** | **$5/mo** | **$12/mo** |
