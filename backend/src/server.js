import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDb } from './db.js'
import { memory } from './memoryStore.js'
import { authRouter } from './routes/auth.js'
import { projectsRouter } from './routes/projects.js'
import { clientsRouter } from './routes/clients.js'
import { requireAuth } from './middleware/auth.js'
import { User } from './models/User.js'
import { Client } from './models/Client.js'
import { Project } from './models/Project.js'

const app = express()
app.use(cors())
app.use(express.json())

const port = parseInt(process.env.PORT || '4000', 10)

const { mode } = await connectDb(process.env.MONGO_URL)
const ctx = { mode, models: { User, Client, Project }, memory }

app.get('/api/health', (req, res) => res.json({ ok: true, mode }))

app.use('/api/auth', authRouter(ctx))

// Protected routes
app.use('/api', requireAuth)
app.use('/api/projects', projectsRouter(ctx))
app.use('/api/clients', clientsRouter(ctx))

app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port} (mode: ${mode})`)
})
