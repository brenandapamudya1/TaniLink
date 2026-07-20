import { useAuth } from '@/context/AuthContext'
import DashboardPage from '@/pages/DashboardPage'
import FarmerDashboardPage from '@/pages/FarmerDashboardPage'

export default function SmartHomePage() {
  const { user } = useAuth()

  if (user?.userType === 'farmer') {
    return <FarmerDashboardPage />
  }

  return <DashboardPage />
}
