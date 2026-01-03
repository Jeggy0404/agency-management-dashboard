import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useProjectsQuery } from '@/features/api/api'
import { useDebouncedValue } from '@/lib/useDebouncedValue'
import type { ProjectStatus } from '@/types/models'

const statuses: Array<{ label: string; value?: ProjectStatus }> = [
  { label: 'All' },
  { label: 'Active', value: 'active' },
  { label: 'Paused', value: 'paused' },
  { label: 'Done', value: 'done' }
]

export function ProjectsPage() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<ProjectStatus | undefined>(undefined)
  const [page, setPage] = useState(1)

  const qDebounced = useDebouncedValue(q, 250)
  const { data: projects = [], isFetching } = useProjectsQuery({ q: qDebounced || undefined, status, page })

  const emptyText = useMemo(() => {
    if (isFetching) return 'Loading…'
    if (qDebounced || status) return 'No matches. Try clearing filters.'
    return 'No projects yet.'
  }, [isFetching, qDebounced, status])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="mt-1 text-sm text-white/70">Search + filtering + pagination (API-driven).</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {statuses.map((s) => {
                const active = s.value === status || (!s.value && !status)
                return (
                  <button
                    key={s.label}
                    className={`rounded-full px-3 py-1 text-xs border transition ${
                      active ? 'border-white/20 bg-white/10 text-white' : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                    onClick={() => {
                      setPage(1)
                      setStatus(s.value)
                    }}
                  >
                    {s.label}
                  </button>
                )
              })}
            </div>
            <div className="w-full md:w-[320px]">
              <Input value={q} onChange={(e) => {
                setPage(1)
                setQ(e.target.value)
              }} placeholder="Search by name or client…" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-white/10">
            {projects.map((p) => (
              <Link key={p._id} to={`/app/projects/${p._id}`} className="flex items-center justify-between gap-3 py-3 hover:bg-white/5 rounded-xl px-2">
                <div>
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="text-xs text-white/60">{p.clientName}</div>
                </div>
                <Badge className="capitalize">{p.status}</Badge>
              </Link>
            ))}

            {projects.length === 0 && <div className="py-10 text-sm text-white/60">{emptyText}</div>}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-xs text-white/60">Page {page}</div>
            <div className="flex gap-2">
              <Button variant="ghost" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                Prev
              </Button>
              <Button variant="ghost" disabled={projects.length < 8} onClick={() => setPage((p) => p + 1)}>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
