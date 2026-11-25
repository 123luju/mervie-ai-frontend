# Mervie AI Frontend

React + Vite + Tailwind CSS + Bootstrap frontend for **Mervie AI - Intelligence for Maternal Health**.

## Stack
- React 19, Vite
- Tailwind CSS v4 + Bootstrap 5
- i18next (50+ language codes, auto-detection)
- Framer Motion, Lucide icons, Recharts-ready
- Axios API client

## Run
```bash
npm install
cp .env.example .env
npm run dev
```

## Build
```bash
npm run build
```

## Deploy (Vercel)
- Framework: Vite
- Build: `npm run build`
- Output: `dist`
- Env: `VITE_API_URL=https://<your-backend>.onrender.com/api`

## SEO
Includes meta tags, Open Graph, Twitter cards, JSON-LD, robots.txt, sitemap.xml, and manifest.
