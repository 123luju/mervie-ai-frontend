import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Use VITE_BASE=/mervie-ai-frontend/ for GitHub Pages; default / for Vercel/Render
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE || '/',
  server: { port: 5173 }
})
