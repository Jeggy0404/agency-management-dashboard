import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String },
    email: { type: String }
  },
  { timestamps: true }
)

export const Client = mongoose.model('Client', ClientSchema)
