import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    done: { type: Boolean, default: false }
  },
  { _id: true }
)

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['active', 'paused', 'done'], default: 'active' },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    tasks: { type: [TaskSchema], default: [] }
  },
  { timestamps: true }
)

export const Project = mongoose.model('Project', ProjectSchema)
