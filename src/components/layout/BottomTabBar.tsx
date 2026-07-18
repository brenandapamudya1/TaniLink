import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Leaf, ShoppingCart, Users, MoreHorizontal, ClipboardList, User, Info, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'

interface TabItem {
  label: string
  icon: typeof Home
  path: string
}

const tabs: TabItem[] = [
  { label: 'Beranda', icon: Home, path: '/' },
  { label: 'Produk', icon: Leaf, path: '/produk' },
  { label: 'Keranjang', icon: ShoppingCart, path: '/keranjang' },
  { label: 'Petani', icon: Users, path: '/petani' },
]

interface MoreMenuItem {
  label: string
  icon: typeof ClipboardList
  path: string
}

const moreMenuItems: MoreMenuItem[] = [
  { label: 'Pesanan', icon: ClipboardList, path: '/pesanan' },
  { label: 'Profil', icon: User, path: '/profil' },
  { label: 'Tentang', icon: Info, path: '/tentang' },
]

export function BottomTabBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { totalItems } = useCart()
  const [showSheet, setShowSheet] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const handleTabClick = (path: string) => {
    navigate(path)
  }

  const handleMoreClick = () => {
    setShowSheet(true)
  }

  const handleMoreMenuClick = (path: string) => {
    setShowSheet(false)
    navigate(path)
  }

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 h-[60px] bg-fog border-t border-cream md:hidden pb-[env(safe-area-inset-bottom)]">
        <div className="flex h-full">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = isActive(tab.path)
            return (
              <button
                key={tab.path}
                onClick={() => handleTabClick(tab.path)}
                className={`
                  flex-1 flex flex-col items-center justify-center gap-0.5 relative
                  transition-colors duration-150
                  ${active ? 'text-harvest' : 'text-earth/60'}
                `}
              >
                {active && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-harvest rounded-full" />
                )}
                <div className="relative">
                  <Icon size={20} />
                  {tab.path === '/keranjang' && totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 rounded-full bg-harvest text-soil text-[9px] font-bold flex items-center justify-center px-1">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold leading-tight">{tab.label}</span>
              </button>
            )
          })}

          <button
            onClick={handleMoreClick}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 text-earth/60 transition-colors duration-150"
          >
            <MoreHorizontal size={20} />
            <span className="text-[10px] font-semibold leading-tight">Lainnya</span>
          </button>
        </div>
      </nav>

      {showSheet && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-soil/50"
            onClick={() => setShowSheet(false)}
          />

          <div className="absolute bottom-0 left-0 right-0 bg-fog rounded-t-xl shadow-hero">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-earth/20" />
            </div>

            <div className="flex items-center justify-between px-4 pb-2">
              <h2 className="font-semibold text-soil text-base">Menu</h2>
              <button
                onClick={() => setShowSheet(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
                aria-label="Tutup menu"
              >
                <X size={18} className="text-earth" />
              </button>
            </div>

            <div className="pb-8 pb-[calc(2rem+env(safe-area-inset-bottom))]">
              {moreMenuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.path}
                    onClick={() => handleMoreMenuClick(item.path)}
                    className="w-full flex items-center gap-3 px-4 py-4 border-b border-cream hover:bg-cream/50 transition-colors"
                  >
                    <Icon size={20} className="text-harvest flex-shrink-0" />
                    <span className="text-soil text-base">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
