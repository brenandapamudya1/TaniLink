import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Package, ShoppingBag, Star, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { useAuth } from '@/context/AuthContext'
import { farmers } from '@/data/farmers'
import { products } from '@/data/products'
import { farmerOrders } from '@/data/farmerOrders'
import { formatPrice } from '@/utils/formatPrice'

const salesData = [
  { month: 'Feb', value: 32 },
  { month: 'Mar', value: 45 },
  { month: 'Apr', value: 38 },
  { month: 'Mei', value: 52 },
  { month: 'Jun', value: 61 },
  { month: 'Jul', value: 45 },
  { month: 'Agu', value: 62 },
  { month: 'Sep', value: 38 },
  { month: 'Okt', value: 71 },
  { month: 'Nov', value: 55 },
  { month: 'Des', value: 88 },
  { month: 'Jan', value: 65 },
]

const statusConfig = {
  baru: { label: 'Baru', bg: 'bg-harvest', text: 'text-soil' },
  diproses: { label: 'Diproses', bg: 'bg-earth', text: 'text-cream' },
  dikirim: { label: 'Dikirim', bg: 'bg-leaf', text: 'text-cream' },
  selesai: { label: 'Selesai', bg: 'bg-cream', text: 'text-earth' },
}

export default function FarmerDashboardPage() {
  const { user, logout } = useAuth()

  const farmer = useMemo(() => {
    if (!user?.farmerId) return undefined
    return farmers.find((f) => f.id === user.farmerId)
  }, [user])

  const farmerProducts = useMemo(() => {
    if (!user?.farmerId) return []
    return products.filter((p) => p.farmerId === user.farmerId)
  }, [user])

  const stats = useMemo(() => {
    const totalSales = farmerOrders
      .filter((o) => o.status === 'selesai')
      .reduce((sum, o) => sum + o.total, 0)
    const monthOrders = farmerOrders.length
    const activeProducts = farmerProducts.length
    const avgRating = farmer?.rating ?? 0

    return { totalSales, monthOrders, activeProducts, avgRating }
  }, [farmerProducts, farmer])

  const maxSales = Math.max(...salesData.map((d) => d.value))

  const recentOrders = farmerOrders.slice(0, 3)

  return (
    <PageWrapper>
      <div className="bg-soil px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-caption text-cream/70">Selamat datang,</p>
            <h1 className="font-display text-section text-cream">
              {farmer?.name ?? user?.name ?? 'Petani'}
            </h1>
          </div>
          <button
            onClick={logout}
            className="text-caption text-cream/70 font-semibold hover:text-cream transition-colors"
          >
            Keluar
          </button>
        </div>

        {farmer && (
          <div className="flex items-center gap-2 text-caption text-cream/70">
            <span className="text-leaf">●</span>
            <span>Aktif menerima pesanan</span>
          </div>
        )}
      </div>

      <div className="px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-fog rounded-lg shadow-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-harvest/20 flex items-center justify-center">
                <TrendingUp size={16} className="text-harvest" />
              </div>
            </div>
            <p className="text-caption text-earth mb-1">Total Penjualan</p>
            <p className="font-mono text-lg font-bold text-soil">{formatPrice(stats.totalSales)}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight size={12} className="text-leaf" />
              <span className="text-caption text-leaf font-semibold">+12%</span>
            </div>
          </div>

          <div className="bg-fog rounded-lg shadow-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-leaf/20 flex items-center justify-center">
                <Package size={16} className="text-leaf" />
              </div>
            </div>
            <p className="text-caption text-earth mb-1">Pesanan Bulan Ini</p>
            <p className="font-mono text-lg font-bold text-soil">{stats.monthOrders}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowDownRight size={12} className="text-harvest" />
              <span className="text-caption text-harvest font-semibold">-3%</span>
            </div>
          </div>

          <div className="bg-fog rounded-lg shadow-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-earth/20 flex items-center justify-center">
                <ShoppingBag size={16} className="text-earth" />
              </div>
            </div>
            <p className="text-caption text-earth mb-1">Produk Aktif</p>
            <p className="font-mono text-lg font-bold text-soil">{stats.activeProducts}</p>
          </div>

          <div className="bg-fog rounded-lg shadow-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-harvest/20 flex items-center justify-center">
                <Star size={16} className="text-harvest" />
              </div>
            </div>
            <p className="text-caption text-earth mb-1">Rating</p>
            <p className="font-mono text-lg font-bold text-soil">{stats.avgRating}</p>
          </div>
        </div>

        <div className="bg-fog rounded-lg shadow-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-soil text-base">Grafik Penjualan</h2>
            <span className="text-caption text-earth">12 bulan terakhir</span>
          </div>
          <div className="flex items-end gap-1 h-40">
            {salesData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-earth font-semibold">{d.value}</span>
                <div
                  className="w-full rounded-t-md bg-harvest transition-all hover:bg-harvest/80"
                  style={{ height: `${(d.value / maxSales) * 85}%` }}
                />
                <span className="text-[9px] text-earth font-medium">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-fog rounded-lg shadow-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-soil text-base">Pesanan Terbaru</h2>
            <Link to="/pesanan-petani" className="text-caption text-harvest font-semibold">
              Lihat semua
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const config = statusConfig[order.status]
              return (
                <div key={order.id} className="flex items-center gap-3 py-2 border-b border-cream last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-soil font-semibold text-sm truncate">{order.product}</p>
                    <p className="text-caption text-earth">{order.buyerName} · {order.quantity}x</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono text-sm font-bold text-soil">{formatPrice(order.total)}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-pill text-[10px] font-semibold ${config.bg} ${config.text}`}>
                      {config.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <Link to="/upload-produk" className="flex-1">
            <button className="w-full py-3.5 rounded-pill bg-harvest text-soil font-bold text-sm shadow-cta hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2">
              <Plus size={18} />
              Upload Produk
            </button>
          </Link>
          <Link to="/harga-pasar" className="flex-1">
            <button className="w-full py-3.5 rounded-pill border-2 border-harvest text-harvest font-bold text-sm hover:bg-harvest/5 active:scale-95 transition-all">
              Harga Pasar
            </button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}
