import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { useClientsQuery } from '@/features/api/api'

export function ClientsPage() {
  const { data = [], isFetching } = useClientsQuery()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Clients</h1>
        <p className="mt-1 text-sm text-white/70">Example of list rendering + empty/loading states.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="text-sm font-semibold">All clients</div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-white/10">
            {isFetching && <div className="py-8 text-sm text-white/60">Loading…</div>}
            {!isFetching && data.map((c) => (
              <div key={c._id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-white/60">{c.company || '—'}</div>
                </div>
                <div className="text-xs text-white/70">{c.email || '—'}</div>
              </div>
            ))}
            {!isFetching && data.length === 0 && <div className="py-8 text-sm text-white/60">No clients yet.</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
