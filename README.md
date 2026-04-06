# Mi Nutricionista Personal 🥗

App personal de seguimiento de calorías con IA (Claude).

---

## Estructura del proyecto

```
nutricionista/
├── public/
│   └── index.html       ← La app web
├── api/
│   └── chat.js          ← Proxy serverless (oculta la API key)
├── vercel.json          ← Configuración de Vercel
└── README.md
```

---

## Paso 1 — Subir a GitHub

1. Ve a [github.com](https://github.com) e inicia sesión (o crea cuenta gratis)
2. Pulsa el botón verde **"New"** para crear un repositorio nuevo
3. Ponle nombre: `nutricionista` (o el que quieras)
4. Déjalo en **Public** o **Private** (ambos funcionan con Vercel)
5. Pulsa **"Create repository"**
6. En la página del repositorio vacío, pulsa **"uploading an existing file"**
7. Arrastra **toda la carpeta** (o los archivos uno a uno respetando la estructura)
8. Pulsa **"Commit changes"**

> ⚠️ Asegúrate de que la estructura queda así en GitHub:
> - `public/index.html`
> - `api/chat.js`
> - `vercel.json`

---

## Paso 2 — Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub
2. Pulsa **"Add New Project"**
3. Busca tu repositorio `nutricionista` y pulsa **"Import"**
4. En la pantalla de configuración **no cambies nada**, deja todo por defecto
5. Pulsa **"Deploy"**

Vercel detecta automáticamente que es un proyecto con funciones serverless.

---

## Paso 3 — Añadir la API key de Anthropic (IMPORTANTE)

La API key **nunca va en el código**. Se configura como variable de entorno en Vercel:

1. En tu proyecto de Vercel, ve a **Settings → Environment Variables**
2. Pulsa **"Add New"**
3. Rellena:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** tu API key (empieza por `sk-ant-...`)
   - **Environment:** marca los tres: Production, Preview, Development
4. Pulsa **Save**
5. Ve a **Deployments** y pulsa **"Redeploy"** para que coja la variable

> Puedes obtener tu API key en: https://console.anthropic.com/settings/keys

---

## Paso 4 — Acceder a tu app

Vercel te da una URL del tipo:
```
https://nutricionista-tuusuario.vercel.app
```

¡Listo! Guárdala en el móvil como acceso directo.

---

## Actualizaciones futuras

Cada vez que hagas cambios en GitHub, Vercel redespliega automáticamente en segundos.

---

## Coste estimado

- Vercel: **gratis** (plan hobby)
- Anthropic API: ~**0,01–0,05 €/día** con uso normal
