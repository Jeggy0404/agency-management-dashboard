import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-[#0b1020] via-[#0b1020] to-[#080b16] p-6">
      <div className="w-full max-w-md rounded-2xl bg-white/5 border border-white/10 shadow-soft p-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold">Agency Portal</h1>
          <p className="text-sm text-white/70">Demo app: Router + RTK Query + responsive dashboard</p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
