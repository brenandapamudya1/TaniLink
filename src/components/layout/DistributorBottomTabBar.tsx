import { useLocation, useNavigate } from 'react-router-dom'
import { Truck, ClipboardList, DollarSign, Clock, User } from 'lucide-react'

interface TabItem {
  label: string
  icon: typeof Truck
  path: string
}

const tabs: TabItem[] = [
  { label: 'Dashboard', icon: Truck, path: '/dashboard-distributor' },
  { label: 'Tugas', icon: ClipboardList, path: '/tugas-pengambilan' },
  { label: 'Pendapatan', icon: DollarSign, path: '/pendapatan-distributor' },
  { label: 'Riwayat', icon: Clock, path: '/riwayat-distributor' },
  { label: 'Profil', icon: User, path: '/profil' },
]

export function DistributorBottomTabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => {
    if (path === '/dashboard-distributor') {
      return location.pathname === '/' || location.pathname === '/dashboard-distributor'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-[60px] bg-fog border-t border-cream md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-full">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = isActive(tab.path)
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-colors duration-150 ${
                active ? 'text-harvest' : 'text-earth/60'
              }`}
            >
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-harvest rounded-full" />
              )}
              <Icon size={20} />
              <span className="text-[10px] font-semibold leading-tight">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
