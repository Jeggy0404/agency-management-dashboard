import mongoose from 'mongoose'

export async function connectDb(mongoUrl) {
  if (!mongoUrl) {
    console.warn('[db] MONGO_URL not set. Running in memory-mode with seeded data only.')
    return { mode: 'memory' }
  }
  await mongoose.connect(mongoUrl)
  console.log('[db] connected')
  return { mode: 'mongo' }
}
