# NutriTrack 🥗

App personal de seguimiento nutricional con IA, gamificación y progresión.

## Estructura
```
nutricionista/
├── public/index.html   ← App completa
├── api/chat.js         ← Proxy serverless (oculta API key)
├── vercel.json         ← Config Vercel
└── README.md
```

## Despliegue en Vercel (5 min)

### 1. Sube a GitHub
- github.com → New repository → nombre: `nutritrack`
- "uploading an existing file" → arrastra los archivos respetando carpetas
- Commit changes

### 2. Despliega en Vercel
- vercel.com → Add New Project → importa `nutritrack`
- No cambies nada → Deploy

### 3. Añade la API key
- Vercel → Settings → Environment Variables
- Name: `ANTHROPIC_API_KEY`  Value: `sk-ant-...`
- Marca los 3 entornos → Save → Redeploy

## Uso local (sin Vercel)
Abre `public/index.html` directamente en el navegador.
En Config → introduce tu API key de Anthropic (se guarda en el navegador).

## Obtener API key
https://console.anthropic.com/settings/keys

## Coste estimado
- Vercel: gratis (plan hobby)
- Anthropic: ~0.01–0.05€/día
