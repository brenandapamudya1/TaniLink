import { useLocation, useNavigate } from 'react-router-dom'
import { Home, ClipboardList, ShoppingBag, TrendingUp, User } from 'lucide-react'

interface TabItem {
  label: string
  icon: typeof Home
  path: string
}

const tabs: TabItem[] = [
  { label: 'Dashboard', icon: Home, path: '/dashboard-b2b' },
  { label: 'Pesanan', icon: ClipboardList, path: '/b2b/lacak-pesanan' },
  { label: 'Bulk', icon: ShoppingBag, path: '/b2b/pesanan-bulk' },
  { label: 'Analitik', icon: TrendingUp, path: '/b2b/analitik' },
  { label: 'Profil', icon: User, path: '/profil' },
]

export function B2BBottomTabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => {
    if (path === '/dashboard-b2b') {
      return location.pathname === '/' || location.pathname === '/dashboard-b2b'
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
