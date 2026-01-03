import 'dotenv/config'
import { connectDb } from './db.js'
import { User } from './models/User.js'
import { Client } from './models/Client.js'
import { Project } from './models/Project.js'

if (!process.env.MONGO_URL) {
  console.error('MONGO_URL is required for seeding')
  process.exit(1)
}

await connectDb(process.env.MONGO_URL)

await Promise.all([User.deleteMany({}), Client.deleteMany({}), Project.deleteMany({})])

const user = await User.create({ name: 'Demo User', email: 'demo@agency.com', password: 'demo' })

const clients = await Client.insertMany([
  { name: 'Anna Novak', company: 'Novak Studio', email: 'anna@novak.cz' },
  { name: 'Pavel Svoboda', company: 'Svoboda Retail', email: 'pavel@svoboda.cz' },
  { name: 'Marek K.', company: 'M.K. Media', email: 'marek@mk-media.cz' }
])

await Project.insertMany([
  {
    name: 'Landing page redesign',
    description: 'Pixel-perfect landing page from Figma; responsive + performance.',
    status: 'active',
    clientId: clients[0]._id,
    tasks: [{ title: 'Set up components + tokens', done: true }, { title: 'Implement hero + sections', done: false }]
  },
  {
    name: 'Admin dashboard',
    description: 'CRUD screens + routing + RTK Query caching.',
    status: 'paused',
    clientId: clients[1]._id,
    tasks: [{ title: 'API contract + mock server', done: true }, { title: 'Tables + filters', done: false }]
  },
  {
    name: 'Brand guidelines',
    description: 'Finalize UI kit and handoff to client.',
    status: 'done',
    clientId: clients[2]._id,
    tasks: [{ title: 'Deliver Figma library', done: true }, { title: 'Export assets', done: true }]
  }
])

console.log('Seeded. Demo user:', user.email)
process.exit(0)
