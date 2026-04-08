# Nootrit

App de seguimiento nutricional personal.

## Estructura

```
public/index.html          → App completa (HTML + CSS + JS en un solo archivo)
supabase/functions/ai/     → Edge Function proxy de Anthropic API
supabase/functions/app/    → Edge Function que sirve el HTML (deploy en Supabase)
```

## URLs de producción (Supabase)

- App: https://zwvcqhqyhtrsirolxdjm.supabase.co/functions/v1/app
- AI proxy: https://zwvcqhqyhtrsirolxdjm.supabase.co/functions/v1/ai

## Deploy

### Opción 1 — Supabase CLI
```bash
supabase functions deploy ai --project-ref zwvcqhqyhtrsirolxdjm
```

### Opción 2 — Manual (subir index.html a cualquier hosting)
El archivo `public/index.html` es autocontenido. Se puede subir a:
- Netlify drop (drag & drop)
- Vercel (requiere vercel.json)
- GitHub Pages
- Cualquier servidor estático

## Variables de entorno necesarias

En Supabase Dashboard → Project Settings → Edge Functions → Secrets:
- `ANTHROPIC_API_KEY` → tu API key de Anthropic

## Login

- Email: depalomero@gmail.com  
- Contraseña: Nootrit2026! (cámbiala desde la app o desde Supabase Auth)

## Base de datos (Supabase)

Tablas principales:
- `profiles` — perfil físico del usuario
- `meal_history` — registro de comidas
- `weight_history` — historial de peso
- `food_kb` — base de datos personal de alimentos
