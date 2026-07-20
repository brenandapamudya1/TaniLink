import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  requiredUserType?: 'buyer' | 'farmer'
}

export function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const { isLoggedIn, user } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  if (requiredUserType && user?.userType !== requiredUserType) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
