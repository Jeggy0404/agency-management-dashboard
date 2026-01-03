import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useClientsQuery, useProjectsQuery } from '@/features/api/api'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'

export function DashboardPage() {
  const { data: projects = [], isFetching: loadingProjects } = useProjectsQuery({ page: 1 })
  const { data: clients = [], isFetching: loadingClients } = useClientsQuery()

  const stats = {
    active: projects.filter((p) => p.status === 'active').length,
    paused: projects.filter((p) => p.status === 'paused').length,
    done: projects.filter((p) => p.status === 'done').length
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-white/70">RTK Query caching + responsive layout + reusable components.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <div className="text-xs text-white/60">Projects (active)</div>
            <div className="mt-1 text-2xl font-semibold">{loadingProjects ? '…' : stats.active}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="text-xs text-white/60">Projects (paused)</div>
            <div className="mt-1 text-2xl font-semibold">{loadingProjects ? '…' : stats.paused}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="text-xs text-white/60">Projects (done)</div>
            <div className="mt-1 text-2xl font-semibold">{loadingProjects ? '…' : stats.done}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="text-xs text-white/60">Clients</div>
            <div className="mt-1 text-2xl font-semibold">{loadingClients ? '…' : clients.length}</div>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Recently updated</div>
              <div className="text-xs text-white/60">Click project to view details + tasks + status updates</div>
            </div>
            <Link to="/app/projects" className="text-sm text-white/80 hover:text-white">All projects →</Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-white/10">
            {projects.slice(0, 6).map((p) => (
              <Link
                key={p._id}
                to={`/app/projects/${p._id}`}
                className="flex items-center justify-between gap-3 py-3 hover:bg-white/5 rounded-xl px-2"
              >
                <div>
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="text-xs text-white/60">{p.clientName}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="capitalize">{p.status}</Badge>
                  <div className="hidden sm:block text-xs text-white/60">
                    {formatDistanceToNow(new Date(p.updatedAt), { addSuffix: true })}
                  </div>
                </div>
              </Link>
            ))}
            {projects.length === 0 && <div className="py-8 text-sm text-white/60">No projects yet (or backend not running).</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
