import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // Demo-only: store plain password for simplicity. In real projects, hash with bcrypt.
    password: { type: String, required: true }
  },
  { timestamps: true }
)

export const User = mongoose.model('User', UserSchema)
