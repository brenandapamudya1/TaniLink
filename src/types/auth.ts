export type UserType = 'buyer' | 'farmer' | 'distributor'

export interface AuthUser {
  email: string
  name: string
  userType: UserType
  farmerId?: string
  distributorId?: string
}

export interface AuthContextType {
  user: AuthUser | null
  isLoggedIn: boolean
  login: (email: string, password: string, userType: UserType) => boolean
  logout: () => void
}
