# R-set · Front (React + Vite)

## Uso local
```
npm install
npm run dev        # http://localhost:5173
```
La encuesta llama a `/api/poll`. En local, Vite redirige `/api` a `http://localhost:3001` (levanta el backend con `npm start` en la carpeta `rset-back`). Si el servidor no responde, la encuesta sigue funcionando y guarda el voto solo en el dispositivo.

## Enlaces
Edita `src/data.js`: ahí están Instagram, Spotify y **TikTok** (vacío = muestra "Próximamente"; pega la URL y se activa solo).

## Publicar (Vercel / Netlify)
1. Sube la carpeta a GitHub e impórtala en Vercel (framework: Vite).
2. Variable de entorno `VITE_API_URL` = URL pública de tu backend (sin `/` al final).
3. Build: `npm run build` · Salida: `dist`.

## QR para la botella y los anuncios
Con la web ya publicada:
```
npm run qr -- https://tu-sitio.vercel.app
```
Genera `qr/rset-qr.png` (1200 px) y `qr/rset-qr.svg` (para imprimir) con corrección de errores alta. Tamaño mínimo recomendado en impreso: 2 × 2 cm, con margen blanco alrededor.
