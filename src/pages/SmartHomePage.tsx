import { useAuth } from '@/context/AuthContext'
import DashboardPage from '@/pages/DashboardPage'
import FarmerDashboardPage from '@/pages/FarmerDashboardPage'
import DistributorDashboardPage from '@/pages/DistributorDashboardPage'

export default function SmartHomePage() {
  const { user } = useAuth()

  if (user?.userType === 'farmer') {
    return <FarmerDashboardPage />
  }

  if (user?.userType === 'distributor') {
    return <DistributorDashboardPage />
  }

  return <DashboardPage />
}
