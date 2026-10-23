import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { ZodError } from 'zod'
import { contentRouter } from './routes/content.js'

const app = express()
const port = Number(process.env.PORT ?? 4000)
const host = process.env.HOST ?? '127.0.0.1'
const allowedOrigin = process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173'

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: allowedOrigin }))
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'infoserc-manager-api' })
})

app.use('/api/content', contentRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' })
})

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ error: 'Datos inválidos.', details: error.flatten() })
  }
  console.error('Error interno de API:', error)
  return res.status(500).json({ error: 'Error interno del servidor.' })
})

app.listen(port, host, () => {
  console.log(`INFOSERC Manager API disponible en http://${host}:${port}`)
})
