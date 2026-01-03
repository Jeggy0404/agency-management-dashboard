import express from 'express'

export function projectsRouter({ mode, models, memory }) {
  const router = express.Router()

  router.get('/', async (req, res) => {
    const { q, status, page = '1' } = req.query
    const p = Math.max(1, parseInt(String(page), 10) || 1)
    const limit = 8

    if (mode === 'mongo') {
      const filter = {}
      if (status) filter.status = status
      if (q) filter.name = { $regex: q, $options: 'i' }

      const items = await models.Project.find(filter)
        .sort({ updatedAt: -1 })
        .skip((p - 1) * limit)
        .limit(limit)
        .populate('clientId')
        .lean()

      return res.json(items.map((x) => ({
        _id: String(x._id),
        name: x.name,
        status: x.status,
        clientName: x.clientId?.name || '—',
        updatedAt: x.updatedAt
      })))
    }

    // memory-mode
    let items = memory.projects.slice()
    if (status) items = items.filter((x) => x.status === status)
    if (q) {
      const qq = String(q).toLowerCase()
      items = items.filter((x) => x.name.toLowerCase().includes(qq))
    }
    items = items.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
    items = items.slice((p - 1) * limit, (p - 1) * limit + limit)
    const out = items.map((x) => {
      const c = memory.clients.find((c) => c._id === x.clientId)
      return { _id: x._id, name: x.name, status: x.status, clientName: c?.name || '—', updatedAt: x.updatedAt }
    })
    return res.json(out)
  })

  router.get('/:id', async (req, res) => {
    const { id } = req.params

    if (mode === 'mongo') {
      const p = await models.Project.findById(id).populate('clientId').lean()
      if (!p) return res.status(404).json({ message: 'not found' })
      return res.json({
        _id: String(p._id),
        name: p.name,
        description: p.description,
        status: p.status,
        clientName: p.clientId?.name || '—',
        updatedAt: p.updatedAt,
        tasks: (p.tasks || []).map((t) => ({ _id: String(t._id), title: t.title, done: t.done }))
      })
    }

    const p = memory.projects.find((x) => x._id === id)
    if (!p) return res.status(404).json({ message: 'not found' })
    const c = memory.clients.find((c) => c._id === p.clientId)
    return res.json({
      _id: p._id,
      name: p.name,
      description: p.description,
      status: p.status,
      clientName: c?.name || '—',
      updatedAt: p.updatedAt,
      tasks: p.tasks
    })
  })

  router.patch('/:id', async (req, res) => {
    const { id } = req.params
    const { status } = req.body || {}
    if (!status) return res.status(400).json({ message: 'status required' })

    if (mode === 'mongo') {
      const p = await models.Project.findByIdAndUpdate(
        id,
        { $set: { status } },
        { new: true }
      ).populate('clientId').lean()
      if (!p) return res.status(404).json({ message: 'not found' })
      return res.json({ _id: String(p._id), name: p.name, status: p.status, clientName: p.clientId?.name || '—', updatedAt: p.updatedAt })
    }

    const idx = memory.projects.findIndex((x) => x._id === id)
    if (idx < 0) return res.status(404).json({ message: 'not found' })
    memory.projects[idx].status = status
    memory.projects[idx].updatedAt = new Date().toISOString()
    const c = memory.clients.find((c) => c._id === memory.projects[idx].clientId)
    return res.json({ _id: id, name: memory.projects[idx].name, status, clientName: c?.name || '—', updatedAt: memory.projects[idx].updatedAt })
  })

  return router
}
