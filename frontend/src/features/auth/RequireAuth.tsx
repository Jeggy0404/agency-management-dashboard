import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import type { RootState } from '@/app/store'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = useSelector((s: RootState) => s.auth.token)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }
  return <>{children}</>
}
