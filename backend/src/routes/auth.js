import express from 'express'
import jwt from 'jsonwebtoken'

export function authRouter({ mode, models, memory }) {
  const router = express.Router()

  router.post('/login', async (req, res) => {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ message: 'email+password required' })

    const user = await findUser({ mode, models, memory }, email)
    if (!user || user.password !== password) return res.status(401).json({ message: 'invalid' })

    const token = jwt.sign(
      { sub: String(user._id), email: user.email, name: user.name },
      process.env.JWT_SECRET || 'dev_secret',
      { expiresIn: '7d' }
    )

    return res.json({ token, user: { _id: String(user._id), name: user.name, email: user.email } })
  })

  router.get('/me', (req, res) => {
    // In demo, frontend calls /me after login if needed; token payload contains basic user info.
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ message: 'Missing token' })

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
      return res.json({ _id: payload.sub, name: payload.name, email: payload.email })
    } catch {
      return res.status(401).json({ message: 'Invalid token' })
    }
  })

  return router
}

async function findUser(ctx, email) {
  if (ctx.mode === 'mongo') {
    return ctx.models.User.findOne({ email }).lean()
  }
  return ctx.memory.users.find((u) => u.email === email) || null
}
