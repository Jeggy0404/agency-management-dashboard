import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useProjectByIdQuery, useUpdateProjectStatusMutation } from '@/features/api/api'
import type { ProjectStatus } from '@/types/models'

const options: ProjectStatus[] = ['active', 'paused', 'done']

export function ProjectDetailsPage() {
  const { projectId = '' } = useParams()
  const { data, isFetching, isError } = useProjectByIdQuery(projectId)
  const [updateStatus, { isLoading: isUpdating }] = useUpdateProjectStatusMutation()

  if (isError) {
    return (
      <div className="space-y-4">
        <div className="text-sm text-red-200">Project not found (or backend not running).</div>
        <Link className="text-sm text-white/80 hover:text-white" to="/app/projects">← Back</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link className="text-sm text-white/80 hover:text-white" to="/app/projects">← Back to projects</Link>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-xs text-white/60">Client</div>
              <div className="text-sm font-semibold">{data?.clientName || (isFetching ? '…' : '—')}</div>
              <h1 className="mt-2 text-2xl font-semibold">{data?.name || (isFetching ? 'Loading…' : '—')}</h1>
              {data?.description && <p className="mt-2 text-sm text-white/70 max-w-2xl">{data.description}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60">Status:</span>
                <Badge className="capitalize">{data?.status || '—'}</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {options.map((s) => {
                  const active = data?.status === s
                  return (
                    <Button
                      key={s}
                      variant={active ? 'primary' : 'ghost'}
                      disabled={isUpdating || isFetching}
                      onClick={() => updateStatus({ id: projectId, status: s })}
                    >
                      {s}
                    </Button>
                  )
                })}
              </div>
              <div className="text-xs text-white/60">Updates invalidate RTK Query cache (projects list + details).</div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div>
            <div className="text-sm font-semibold">Tasks</div>
            <div className="mt-3 space-y-2">
              {(data?.tasks || []).map((t) => (
                <div key={t._id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <div className="text-sm">{t.title}</div>
                  <Badge className={t.done ? 'text-green-200 border-green-200/20 bg-green-200/10' : ''}>
                    {t.done ? 'done' : 'todo'}
                  </Badge>
                </div>
              ))}
              {(data?.tasks?.length ?? 0) === 0 && <div className="text-sm text-white/60">No tasks.</div>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
