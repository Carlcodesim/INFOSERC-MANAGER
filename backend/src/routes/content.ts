import { Router } from 'express'
import { z } from 'zod'
import { db } from '../database.js'

export const contentRouter = Router()

const contentTypes = ['tutorial', 'article', 'video', 'resource'] as const
const contentStatuses = ['idea', 'draft', 'planned', 'published', 'archived'] as const

const contentSchema = z.object({
  title: z.string().trim().min(1).max(160),
  summary: z.string().trim().max(2000).default(''),
  content_type: z.enum(contentTypes),
  status: z.enum(contentStatuses).default('draft'),
  platform: z.string().trim().max(120).default(''),
  planned_at: z.string().datetime().nullable().optional(),
  published_at: z.string().datetime().nullable().optional(),
})

type ContentInput = z.infer<typeof contentSchema>

function parseInput(body: unknown): ContentInput {
  return contentSchema.parse(body)
}

contentRouter.get('/', (_req, res) => {
  const items = db.prepare('SELECT * FROM content_items ORDER BY updated_at DESC, id DESC').all()
  res.json({ data: items })
})

contentRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ error: 'Identificador inválido.' })
  const item = db.prepare('SELECT * FROM content_items WHERE id = ?').get(id)
  if (!item) return res.status(404).json({ error: 'Contenido no encontrado.' })
  return res.json({ data: item })
})

contentRouter.post('/', (req, res) => {
  const parsed = contentSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Datos inválidos.', details: parsed.error.flatten() })
  const input = parsed.data
  const result = db.prepare(`
    INSERT INTO content_items (title, summary, content_type, status, platform, planned_at, published_at)
    VALUES (@title, @summary, @content_type, @status, @platform, @planned_at, @published_at)
  `).run({
    ...input,
    planned_at: input.planned_at ?? null,
    published_at: input.published_at ?? null,
  })
  const created = db.prepare('SELECT * FROM content_items WHERE id = ?').get(result.lastInsertRowid)
  return res.status(201).json({ data: created })
})

contentRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ error: 'Identificador inválido.' })
  const parsed = contentSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Datos inválidos.', details: parsed.error.flatten() })
  const input = parsed.data
  const result = db.prepare(`
    UPDATE content_items
    SET title = @title, summary = @summary, content_type = @content_type,
        status = @status, platform = @platform, planned_at = @planned_at,
        published_at = @published_at, updated_at = datetime('now')
    WHERE id = @id
  `).run({
    ...input,
    id,
    planned_at: input.planned_at ?? null,
    published_at: input.published_at ?? null,
  })
  if (!result.changes) return res.status(404).json({ error: 'Contenido no encontrado.' })
  return res.json({ data: db.prepare('SELECT * FROM content_items WHERE id = ?').get(id) })
})

contentRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ error: 'Identificador inválido.' })
  const result = db.prepare('DELETE FROM content_items WHERE id = ?').run(id)
  if (!result.changes) return res.status(404).json({ error: 'Contenido no encontrado.' })
  return res.status(204).end()
})
