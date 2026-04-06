# NutriTrack con Supabase 🥗☁️

## Estructura
```
nutritrack/
├── public/index.html   ← App completa
├── api/chat.js         ← Proxy Anthropic
├── vercel.json
└── supabase_schema.sql ← Ejecutar en Supabase SQL Editor
```

## Setup en 3 pasos

### 1. Supabase (base de datos)
1. Crea proyecto en supabase.com → nombre: `nutritrack`
2. Ve a **SQL Editor** → New Query
3. Copia y pega todo el contenido de `supabase_schema.sql` → Run
4. Ve a **Project Settings → API** y copia:
   - **Project URL** → `https://xxxx.supabase.co`
   - **anon public key** → `eyJhbGci...`

### 2. GitHub + Vercel
1. Crea repo en GitHub, sube los archivos respetando la estructura
2. Importa en vercel.com
3. En Vercel → Settings → Environment Variables añade:
   - `ANTHROPIC_API_KEY` = `sk-ant-...`
4. Redeploy

### 3. Configurar Supabase en la app
1. Abre tu URL de Vercel
2. Ve a **Config** en la app
3. Introduce la Supabase URL y la Anon Key
4. Pulsa "Guardar y conectar"

✅ A partir de ahí todos los datos se sincronizan automáticamente.
Los datos se guardan también en localStorage como caché local.

## Coste
- Supabase: gratis (500MB, más que suficiente)
- Vercel: gratis
- Anthropic: ~0.01-0.05€/día
