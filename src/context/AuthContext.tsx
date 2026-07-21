import { useState, useCallback, createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { AuthContextType, AuthUser, UserType } from '@/types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DUMMY_FARMERS = [
  { email: 'petani@tanilink.id', password: 'petani123', name: 'Pak Amin Suryadi', farmerId: 'farmer-001' },
]

const DUMMY_BUYERS = [
  { email: 'pembeli@tanilink.id', password: 'pembeli123', name: 'Budi Santoso' },
]

const DUMMY_DISTRIBUTORS = [
  { email: 'distributor@tanilink.id', password: 'distributor123', name: 'Agus Prasetyo', distributorId: 'distributor-001' },
]

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)

  const login = useCallback((email: string, password: string, userType: UserType): boolean => {
    if (userType === 'farmer') {
      const found = DUMMY_FARMERS.find(
        (f) => f.email === email && f.password === password
      )
      if (found) {
        setUser({ email: found.email, name: found.name, userType: 'farmer', farmerId: found.farmerId })
        return true
      }
      return false
    }

    if (userType === 'distributor') {
      const found = DUMMY_DISTRIBUTORS.find(
        (d) => d.email === email && d.password === password
      )
      if (found) {
        setUser({ email: found.email, name: found.name, userType: 'distributor', distributorId: found.distributorId })
        return true
      }
      return false
    }

    const found = DUMMY_BUYERS.find(
      (b) => b.email === email && b.password === password
    )
    if (found) {
      setUser({ email: found.email, name: found.name, userType: 'buyer' })
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
