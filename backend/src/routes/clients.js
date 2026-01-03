import express from 'express'

export function clientsRouter({ mode, models, memory }) {
  const router = express.Router()

  router.get('/', async (req, res) => {
    if (mode === 'mongo') {
      const items = await models.Client.find().sort({ createdAt: -1 }).lean()
      return res.json(items.map((c) => ({ _id: String(c._id), name: c.name, company: c.company, email: c.email })))
    }
    return res.json(memory.clients)
  })

  return router
}
