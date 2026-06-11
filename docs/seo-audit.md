# STB-008: Auditoría SEO Completa — stabolut.com

## Fecha
2026-06-11

## Metodología
Análisis manual del HTML fuente, sitemap, robots.txt, meta tags, estructura de contenido, backlinks y competencia.

---

## Resumen Ejecutivo

**Estado actual: CRÍTICO para SEO técnico.**
La web está construida en Framer con configuración por defecto. Meta descriptions placeholder, sin estructura semántica, sin blog, sin contenido indexable, sin Schema.org. Las únicas dos URLs indexadas son `/` y `/privacy`. El site tiene 0 señales de contenido para posicionar en keywords relevantes.

**Si Stabolut quiere posicionar en Google para "yield-bearing stablecoin", "crypto-backed stablecoin", "USB stablecoin" o términos similares, necesita una reestructuración SEO completa.**

---

## 1) Auditoría Técnica

### ✅ Lo que funciona
- **robots.txt:** Presente, permite crawling general, bloquea crawlers de IA (GPTBot, ClaudeBot, Google-Extended, etc.)
- **Sitemap.xml:** Presente con 2 URLs (`/` y `/privacy`). Válido.
- **Canonical:** Homepage tiene canonical correcto.
- **HTTPS:** Redirección correcta a www.stabolut.com.
- **Responsive:** Framer genera diseño responsive (breakpoints: 1990, 1120, 810, 420px).
- **OG/Twitter tags:** Presentes (aunque mal optimizados).
- **Page speed:** Carga de fuentes optimizada con font-display:swap y woff2.

### ❌ Lo que está fatal

#### 1.1 Meta Description — "Made with Framer" 🔴
```html
<meta name="description" content="Made with Framer">
```
Esto es el **placeholder por defecto de Framer** y no se ha cambiado. Google puede mostrar esto en los SERPs. Es la primera impresión que tiene un usuario cuando busca Stabolut.

**Impacto:** Pérdida masiva de CTR en resultados de búsqueda.

#### 1.2 Title tag genérico 🔴
```html
<title>Stabolut -  The Stablecoin Standard</title>
```
Misma title para homepage Y privacy page. El doble espacio ( `Stabolut -  The` ) es un error de formato. El title no incluye keywords relevantes como "stablecoin", "yield-bearing", "USB", "crypto-backed".

**Impacto:** Baja relevancia semántica para búsquedas objetivo.

#### 1.3 Sin estructura de headings 🔴
- **No hay `<h1>`** en el HTML. El hero text no está marcado semánticamente.
- El contenido textual se renderiza mediante JS de Framer como `<div>` con clases, no como headings HTML.
- Las preguntas FAQ se renderizan como texto plano, no como `<h2>`/`<h3>` con schema FAQ.

**Impacto:** Google no entiende la jerarquía de contenido de la página.

#### 1.4 Sin Schema.org / JSON-LD 🔴
- No hay datos estructurados de ningún tipo.
- Sin `Organization` schema, sin `Product` (para USB), sin `FAQPage`, sin `BreadcrumbList`, sin `WebSite`.

**Impacto:** Sin rich snippets en SERPs. Sin estrella de reviews, sin FAQ expandible, sin knowledge panel.

#### 1.5 Sin blog / contenido indexable 🔴
- La web tiene exactamente **2 URLs**: homepage y privacy policy.
- **0 artículos**, **0 posts de blog**, **0 páginas de producto**, **0 landing pages**.

**Impacto:** Sin contenido para rankear en long-tail keywords. Google no tiene nada que rastrear más allá de la homepage.

#### 1.6 Sin alt text en imágenes 🟡
- Las imágenes se renderizan como background-images en Framer, sin atributos `alt`.
- Los logos de partners ("As seen on") están sin descripción.

**Impacto:** No accesible, no indexable por Google Images.

#### 1.7 Pagina de privacidad con canonical incorrecto 🔴
```html
<link rel="canonical" href="https://www.stabolut.com/">
```
La página `/privacy` tiene canonical apuntando a la homepage. Esto es un error técnico: le dices a Google que el contenido de privacidad es el mismo que el de la homepage.

**Impacto:** Confusión de indexación, posible penalización por canonical mal dirigido.

#### 1.8 Contenido JS-renderizado 🟡
- Framer es una SPA-type builder. Gran parte del contenido textual se inyecta via JavaScript.
- Aunque Googlebot (2026) renderiza JS, el contenido tarda más en ser indexado y tiene menos peso semántico que HTML estático.

**Impacto:** Menor velocidad de indexación. Posible pérdida de contenido en crawlers secundarios.

#### 1.9 Sin internal linking 🟡
- Sin navegación interna más allá del logo y enlace a privacidad.
- Sin footer con links relevantes (whitepaper, docs, blog, GitHub, etc.)

**Impacto:** Sin PageRank distribution. Google no descubre nuevas páginas.

---

## 2) Análisis de Contenido y Keywords

### Keywords objetivo para Stabolut
| Keyword | Volumen estimado | Competencia | Estado actual |
|---|---|---|---|
| "yield-bearing stablecoin" | Medio | Alta (Ethena, Usual) | ❌ No optimizada |
| "crypto-backed stablecoin" | Medio-Bajo | Media | ❌ No optimizada |
| "USB stablecoin" | Bajo | Baja | ❌ No aparece en title |
| "decentralized stablecoin" | Alto | Muy alta | ❌ No optimizada |
| "delta-neutral stablecoin" | Bajo | Baja | ❌ No hay contenido |
| "bitcoin-backed stablecoin" | Medio | Media (Resolv) | ❌ No hay contenido dedicado |
| "stablecoin yield" | Alto | Muy alta | ❌ No optimizada |
| "Stabolut" | Bajo | Muy baja | ✅ La homepage aparece |

### Contenido actual vs necesario

**Lo que hay:**
- Hero con 6 bullet points genéricos
- Sección "Meet" con características
- Quote de Frederic Fernandez (DexTools)
- 2 report links (sin URL real, son enlaces rotos o placeholder)
- FAQ interactivo (7 preguntas)
- Formulario de contacto
- Privacy policy

**Lo que falta:**
- ❌ Whitepaper / technical paper
- ❌ Blog con artículos educativos
- ❌ Página de producto USB con specs detalladas
- ❌ Página "How it works" con el mecanismo de yield
- ❌ Página de roadmap / milestones
- ❌ Página del equipo
- ❌ Página de tokenomics para SBL
- ❌ Documentación técnica / developer docs
- ❌ Página de FAQ completa con Schema.org
- ❌ Landing pages para campañas

---

## 3) Backlinks y Autoridad

### Backlinks detectados (3 fuentes)
| Fuente | Tipo | DA estimado | Follow? |
|---|---|---|---|
| onchain.org (magazine article) | Editorial | Medio-Alto | ✅ Follow |
| businesswire.com (PR launch) | PR | Alto | ✅ Follow |
| GitHub (Whitepaper repo) | Técnico | Alto | ✅ Follow |

**Análisis:** Pocos backlinks pero de calidad. El artículo de Onchain.org es excellent content marketing. El problema es que Stabolut NO linkea a estos artículos desde su propia web, perdiendo la oportunidad de señalizar authority internamente.

### Oportunidades de link-building
- DexTools (Frederic Fernandez es Co-Founder + quote en la web) → potencial backlink
- Arbitrum ecosystem → posible feature
- DefiLlama listing
- CoinGecko / CoinMarketCap listings

---

## 4) Análisis de Competidores (SEO)

### Ethena (ethena.fi)
- 100+ páginas indexadas
- Blog activo con contenido educativo
- Documentación técnica completa (docs.ethena.fi subdomain)
- Schema.org implementado
- Meta tags optimizados por página
- Fuerte perfil de backlinks (referrals de DeFi, exchanges, medios)

### Usual (usual.money)
- Docs site separado (docs.usual.money)
- Blog / news section
- Roadmap público
- Tokenomics page dedicada
- FAQ con Schema

### Sky (sky.money)
- Site grande con múltiples subpáginas
- Docs separado (docs.sky.money)
- Blog / ecosystem content
- Optimización SEO avanzada

### Stabolut vs competencia
| Factor | Stabolut | Ethena | Usual | Sky |
|---|---|---|---|---|
| Páginas indexadas | 2 | 100+ | 50+ | 200+ |
| Blog | ❌ | ✅ | ✅ | ✅ |
| Docs site | ❌ | ✅ (docs.ethena.fi) | ✅ (docs.usual.money) | ✅ (docs.sky.money) |
| Schema.org | ❌ | ✅ | ✅ | ✅ |
| Meta descriptions | "Made with Framer" | Optimizadas | Optimizadas | Optimizadas |
| Backlinks (est.) | ~5 | 10,000+ | 5,000+ | 50,000+ |
| Content marketing | ❌ | ✅ | ✅ | ✅ |

---

## 5) Plan de Acción: Cambios Necesarios

### 🔴 Prioridad CRÍTICA (Semana 1)

**5.1 Arreglar meta description** 🎯
```
Actual:  <meta name="description" content="Made with Framer">
Cambiar: <meta name="description" content="USB is a multi-currency, yield-bearing stablecoin backed by Bitcoin and Ether. Earn yield while maintaining stability through delta-neutral strategies. The new standard for decentralized stablecoins.">
```
Esto solo requiere cambio en Framer → Site Settings → Meta Description.

**5.2 Arreglar title tag** 🎯
```
Actual:  <title>Stabolut -  The Stablecoin Standard</title>
Cambiar: <title>Stabolut | Yield-Bearing Crypto-Backed Stablecoin (USB)</title>
```

**5.3 Arreglar canonical de /privacy** 🎯
```html
<link rel="canonical" href="https://www.stabolut.com/privacy">
```
Configurar en Framer que cada página tenga su propio canonical.

**5.4 Añadir H1 semántico** 🎯
Asegurar que el hero title esté marcado como `<h1>` en Framer.

**5.5 Añadir Schema Organization + WebSite + Product** 🎯
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Stabolut",
  "url": "https://www.stabolut.com",
  "description": "Multi-currency, yield-bearing stablecoin platform backed by Bitcoin and Ether.",
  "sameAs": ["https://github.com/Stabolut", "https://twitter.com/stabolut"]
}
</script>
```

### 🟠 Prioridad ALTA (Semana 2-3)

**5.6 Crear FAQ Page con Schema FAQPage**
Las 7 preguntas actuales deben tener Schema FAQPage markup para rich snippets.

**5.7 Crear blog/content hub**
Mínimo 4-6 artículos cornerstone:
- "What is a Yield-Bearing Stablecoin?" (educational)
- "How USB Works: Delta-Neutral Strategy Explained"
- "Crypto-Backed Stablecoins vs Fiat-Backed: Complete Guide"
- "Stabolut USB: The First Bitcoin-Backed Yield Stablecoin"
- "Why Decentralized Stablecoins Matter in 2026"

**5.8 Crear página "How It Works"**
Explicación visual del mecanismo: BTC/ETH collateral → delta-neutral hedge → yield generation. Optimizada para keywords "how does USB work", "delta neutral stablecoin explained".

**5.9 Link building inicial**
- Conseguir backlink desde DexTools (Frederic Fernandez es Co-Founder)
- Listar en DefiLlama
- Listar en CoinGecko
- Guest post en Onchain.org / CryptoBriefing

### 🟡 Prioridad MEDIA (Semana 4-6)

**5.10 Crear docs.stabolut.com subdomain**
Documentación técnica separada: whitepaper, smart contracts, API, audit reports. Esto también genera páginas indexables adicionales.

**5.11 Implementar alt text en todas las imágenes**
En Framer: seleccionar cada imagen y añadir alt text descriptivo.

**5.12 Añadir internal linking en footer**
- Whitepaper → docs.github.com/Stabolut/Whitepaper
- Blog → /blog
- GitHub → github.com/Stabolut
- Docs → docs.stabolut.com
- Privacy → /privacy
- Terms → /terms

**5.13 Optimizar Open Graph tags**
- OG title: "Stabolut USB | The Yield-Bearing Stablecoin Standard"
- OG description: (misma que meta description optimizada)
- OG image: Custom branded image with USB logo + yield stat

**5.14 Crear páginas de producto/feature**
- /usb — página dedicada a USB stablecoin
- /sbl — página dedicada al token SBL (governance)
- /ecosystem — partners, integrations, DeFi protocols
- /roadmap — milestones públicos (genera confianza + contenido)

**5.15 Implementar Google Search Console + Analytics**
Si no está ya hecho. Fundamental para monitorizar indexación y tráfico.

---

## 6) Roadmap SEO Recomendado

```
Semana 1:  Fix críticos (meta, title, canonical, schema, H1)
           → Impacto inmediato en indexación y CTR

Semana 2-3: FAQ schema + Blog (4 artículos) + "How It Works" page
            → Comienza a rankear para keywords de cola larga

Semana 4-6: Docs subdomain + Link building + Páginas de producto
            → Señales de autoridad y contenido indexable

Semana 7-12: Content calendar + Outreach + DefiLlama/CoinGecko listings
             → Crecimiento sostenido de tráfico orgánico

Métrica objetivo (3 meses):
- 20-30 páginas indexadas (vs 2 ahora)
- Tráfico orgánico inicial para branded ("Stabolut", "USB stablecoin")
- 3-5 keywords en top 20 para términos de cola larga
```

---

## 7) Coste estimado (horas)

| Tarea | Horas |
|---|---|
| Fix meta/description/title (Framer) | 0.5h |
| Fix canonical /privacy | 0.5h |
| Schema Organization + FAQ | 2h |
| Blog setup + 4 artículos | 16h |
| "How It Works" page | 4h |
| Alt text + OG images | 2h |
| Docs subdomain | 8h |
| Link building outreach | 8h |
| Footer + internal links | 1h |
| **Total** | **~42h** |

---

## 8) Conclusión

Stabolut tiene un producto sólido y contenido de calidad (Onchain article, whitepaper, PR coverage), pero la web actual **no está preparada para SEO**. Es una landing page de Framer con placeholder tags y sin arquitectura de contenido.

**La buena noticia:** Las correcciones críticas son cambios de configuración en Framer que se hacen en minutos. El contenido existe en otros formatos (whitepaper, entrevistas, research) — solo necesita transformarse en páginas web indexables.

**La mala noticia:** Sin blog, sin docs, sin Schema, Stabolut es invisible para Google más allá de búsquedas de marca exacta. Los competidores (Ethena, Usual, Sky) tienen cientos de páginas indexadas y perfiles de backlinks establecidos.

**Prioridad #1 esta semana:** Cambiar la meta description de "Made with Framer" a algo real. Eso solo ya mejora el CTR en SERPs drásticamente.
