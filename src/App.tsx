import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { BottomTabBar } from '@/components/layout/BottomTabBar'
import { SplashScreen } from '@/components/ui/SplashScreen'
import DashboardPage from '@/pages/DashboardPage'
import ProductListPage from '@/pages/ProductListPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import FarmerListPage from '@/pages/FarmerListPage'
import FarmerDetailPage from '@/pages/FarmerDetailPage'
import CartPage from '@/pages/CartPage'
import ProfilePage from '@/pages/ProfilePage'
import OrdersPage from '@/pages/OrdersPage'
import WishlistPage from '@/pages/WishlistPage'
import AlamatPage from '@/pages/AlamatPage'
import NotifikasiPage from '@/pages/NotifikasiPage'
import PengaturanPage from '@/pages/PengaturanPage'
import BantuanPage from '@/pages/BantuanPage'
import LoginPage from '@/pages/LoginPage'
import AboutPage from '@/pages/AboutPage'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }

  return (
    <div className="min-h-screen bg-fog">
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/produk" element={<ProductListPage />} />
        <Route path="/produk/:id" element={<ProductDetailPage />} />
        <Route path="/petani" element={<FarmerListPage />} />
        <Route path="/petani/:id" element={<FarmerDetailPage />} />
        <Route path="/keranjang" element={<CartPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/pesanan" element={<OrdersPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/alamat" element={<AlamatPage />} />
        <Route path="/notifikasi" element={<NotifikasiPage />} />
        <Route path="/pengaturan" element={<PengaturanPage />} />
        <Route path="/bantuan" element={<BantuanPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tentang" element={<AboutPage />} />
      </Routes>
      <BottomTabBar />
    </div>
  )
}

export default App
