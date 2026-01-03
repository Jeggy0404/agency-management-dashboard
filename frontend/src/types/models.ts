export type User = {
  _id: string
  name: string
  email: string
}

export type Client = {
  _id: string
  name: string
  company?: string
  email?: string
}

export type ProjectStatus = 'active' | 'paused' | 'done'

export type Project = {
  _id: string
  name: string
  status: ProjectStatus
  clientName: string
  updatedAt: string
}

export type Task = {
  _id: string
  title: string
  done: boolean
}

export type ProjectDetails = Project & {
  description?: string
  tasks: Task[]
}
