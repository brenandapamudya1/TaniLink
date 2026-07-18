import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { BottomTabBar } from '@/components/layout/BottomTabBar'
import LandingPage from '@/pages/LandingPage'
import ProductListPage from '@/pages/ProductListPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import FarmerListPage from '@/pages/FarmerListPage'
import FarmerDetailPage from '@/pages/FarmerDetailPage'
import CartPage from '@/pages/CartPage'
import ProfilePage from '@/pages/ProfilePage'
import OrdersPage from '@/pages/OrdersPage'
import AboutPage from '@/pages/AboutPage'

function App() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div className="min-h-screen bg-fog">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/produk" element={<ProductListPage />} />
        <Route path="/produk/:id" element={<ProductDetailPage />} />
        <Route path="/petani" element={<FarmerListPage />} />
        <Route path="/petani/:id" element={<FarmerDetailPage />} />
        <Route path="/keranjang" element={<CartPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/pesanan" element={<OrdersPage />} />
        <Route path="/tentang" element={<AboutPage />} />
      </Routes>
      {!isLanding && <BottomTabBar />}
    </div>
  )
}

export default App
