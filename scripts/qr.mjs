// Uso: npm run qr -- https://tu-sitio.vercel.app
import QRCode from 'qrcode'; import fs from 'fs'
const url = process.argv[2]
if (!url) { console.error('Falta la URL. Ej: npm run qr -- https://tu-sitio.vercel.app'); process.exit(1) }
fs.mkdirSync('qr', { recursive: true })
const o = { errorCorrectionLevel: 'H', margin: 4, color: { dark: '#3A3427', light: '#FFFFFF' } }
await QRCode.toFile('qr/rset-qr.png', url, { ...o, width: 1200 })
fs.writeFileSync('qr/rset-qr.svg', await QRCode.toString(url, { ...o, type: 'svg' }))
console.log('Listo: qr/rset-qr.png y qr/rset-qr.svg ->', url)
