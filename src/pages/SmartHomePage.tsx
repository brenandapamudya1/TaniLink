import { useAuth } from '@/context/AuthContext'
import DashboardPage from '@/pages/DashboardPage'
import FarmerDashboardPage from '@/pages/FarmerDashboardPage'
import DistributorDashboardPage from '@/pages/DistributorDashboardPage'
import B2BDashboardPage from '@/pages/B2BDashboardPage'

export default function SmartHomePage() {
  const { user } = useAuth()

  if (user?.userType === 'farmer') {
    return <FarmerDashboardPage />
  }

  if (user?.userType === 'distributor') {
    return <DistributorDashboardPage />
  }

  if (user?.userType === 'b2b') {
    return <B2BDashboardPage />
  }

  return <DashboardPage />
}
