import { useNavigate } from 'react-router-dom'
import { User, ClipboardList, Heart, MapPin, Bell, Settings, HelpCircle, ChevronRight, Sprout, Truck, DollarSign, Clock, LogOut } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { useAuth } from '@/context/AuthContext'

interface MenuItem {
  icon: typeof ClipboardList
  label: string
  route: string
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, isLoggedIn, logout } = useAuth()

  const handleLogin = () => {
    navigate('/login')
  }

  const menuItems: MenuItem[] = [
    { icon: ClipboardList, label: 'Pesanan Saya', route: '/pesanan' },
    { icon: Heart, label: 'Wishlist', route: '/wishlist' },
    { icon: MapPin, label: 'Alamat Pengiriman', route: '/alamat' },
    { icon: Bell, label: 'Notifikasi', route: '/notifikasi' },
    { icon: Settings, label: 'Pengaturan', route: '/pengaturan' },
    { icon: HelpCircle, label: 'Bantuan', route: '/bantuan' },
  ]

  if (isLoggedIn && user?.userType === 'farmer') {
    menuItems.unshift({ icon: Sprout, label: 'Dashboard Petani', route: '/dashboard-petani' })
  }

  if (isLoggedIn && user?.userType === 'distributor') {
    menuItems.unshift(
      { icon: Truck, label: 'Dashboard Distributor', route: '/dashboard-distributor' },
      { icon: DollarSign, label: 'Pendapatan', route: '/pendapatan-distributor' },
      { icon: Clock, label: 'Riwayat & Performa', route: '/riwayat-distributor' },
    )
  }

  return (
    <PageWrapper>
      <div className="bg-soil px-4 py-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mb-4">
            {isLoggedIn ? (
              <Sprout size={32} className={user?.userType === 'farmer' ? 'text-leaf' : 'text-harvest'} />
            ) : (
              <User size={32} className="text-earth" />
            )}
          </div>
          <h1 className="font-display text-section text-cream mb-1">
            {isLoggedIn ? user?.name ?? 'User' : 'Tamu'}
          </h1>
          <p className="text-caption text-cream/70 mb-4">
            {isLoggedIn
              ? user?.userType === 'farmer'
                ? 'Akun Petani'
                : user?.userType === 'distributor'
                  ? 'Akun Distributor'
                  : 'Akun Pembeli'
              : 'Masuk untuk pengalaman lengkap'}
          </p>
          {isLoggedIn ? (
            <button
              onClick={() => { logout(); navigate('/') }}
              className="px-6 py-2.5 rounded-pill border border-cream text-cream font-semibold text-sm hover:bg-cream/10 transition-colors flex items-center gap-2"
            >
              <LogOut size={16} />
              Keluar
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-6 py-2.5 rounded-pill border border-cream text-cream font-semibold text-sm hover:bg-cream/10 transition-colors"
            >
              Masuk / Daftar
            </button>
          )}
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="bg-fog rounded-lg shadow-card overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.route)}
                className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-cream/50 transition-colors ${
                  index < menuItems.length - 1 ? 'border-b border-cream' : ''
                }`}
              >
                <Icon size={20} className="text-harvest flex-shrink-0" />
                <span className="text-soil text-base flex-1 text-left">{item.label}</span>
                <ChevronRight size={18} className="text-earth/40" />
              </button>
            )
          })}
        </div>
      </div>

      <div className="px-4 py-8 text-center">
        <p className="text-caption text-earth">TaniLink v0.1.0 — Phase 0</p>
      </div>
    </PageWrapper>
  )
}
