import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/app/store'
import { closeSidebar, toggleSidebar } from '@/features/ui/uiSlice'
import { logout } from '@/features/auth/authSlice'
import { Briefcase, LayoutDashboard, LogOut, Menu, Users, X } from 'lucide-react'

const linkBase = 'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition'
const linkActive = 'bg-white/10 text-white'
const linkInactive = 'text-white/70 hover:bg-white/5 hover:text-white'

export function AppLayout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sidebarOpen = useSelector((s: RootState) => s.ui.sidebarOpen)
  const user = useSelector((s: RootState) => s.auth.user)

  const doLogout = () => {
    dispatch(logout())
    navigate('/auth/login')
  }

  return (
    <div className="min-h-screen bg-[#0b1020]">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#0b1020]/80 backdrop-blur px-4 py-3 md:hidden">
        <button
          aria-label="Open menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5"
          onClick={() => dispatch(toggleSidebar())}
        >
          <Menu size={18} />
        </button>
        <div className="text-sm font-semibold">Agency Portal</div>
        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-xs">
          {(user?.name || 'U').slice(0, 2).toUpperCase()}
        </div>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => dispatch(closeSidebar())}
        />
      )}

      <div className="mx-auto max-w-6xl grid md:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside
          className={`fixed z-50 h-full w-[280px] md:static md:w-auto md:h-auto md:block border-r border-white/10 bg-[#0b1020] md:bg-transparent p-4 transition-transform md:transition-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="flex items-center justify-between md:justify-start md:gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
                <Briefcase size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold leading-4">Agency Portal</div>
                <div className="text-xs text-white/60">Projects & clients</div>
              </div>
            </div>
            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5"
              onClick={() => dispatch(closeSidebar())}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-2">
            <NavLink
              to="/app"
              end
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
              onClick={() => dispatch(closeSidebar())}
            >
              <LayoutDashboard size={16} /> Dashboard
            </NavLink>
            <NavLink
              to="/app/projects"
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
              onClick={() => dispatch(closeSidebar())}
            >
              <Briefcase size={16} /> Projects
            </NavLink>
            <NavLink
              to="/app/clients"
              className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
              onClick={() => dispatch(closeSidebar())}
            >
              <Users size={16} /> Clients
            </NavLink>
          </nav>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/60">Signed in as</div>
            <div className="mt-1 text-sm font-semibold">{user?.name || '—'}</div>
            <button
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white text-[#0b1020] px-3 py-2 text-sm font-semibold"
              onClick={doLogout}
            >
              <LogOut size={16} /> Log out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
