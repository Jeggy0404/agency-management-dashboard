import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-[#0b1020] p-6">
      <div className="text-center space-y-4">
        <div className="text-3xl font-semibold">404</div>
        <p className="text-sm text-white/70">Page not found.</p>
        <Link className="text-sm text-white/80 hover:text-white" to="/app">Go to dashboard →</Link>
      </div>
    </div>
  )
}
