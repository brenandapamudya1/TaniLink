import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { b2bAnalytics } from '@/data/b2bAnalytics'
import { b2bOrders } from '@/data/b2bOrders'
import { b2bProducts } from '@/data/b2bProducts'
import type { B2BUnit } from '@/types/b2b'

const unitToKg: Record<B2BUnit, number> = {
  kg: 1,
  karung: 50,
  box: 20,
  ton: 1000,
}

function getCategoryTotals() {
  const totals: Record<string, number> = {
    sayur: 0,
    buah: 0,
    bumbu: 0,
    'biji-bijian': 0,
  }
  
  b2bOrders.forEach(order => {
    order.items.forEach(item => {
      const product = b2bProducts.find(p => p.id === item.productId)
      if (product) {
        const weightKg = item.quantity * unitToKg[item.unit]
        totals[product.category] = (totals[product.category] || 0) + weightKg
      }
    })
  })
  
  return totals
}

const maxProductKg = Math.max(...b2bAnalytics.topProducts.map((p) => p.totalKg))

export default function B2BAnalyticsPage() {
  const navigate = useNavigate()
  const categoryTotals = getCategoryTotals()

  return (
    <PageWrapper>
      <div className="px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors mb-4"
          aria-label="Kembali"
        >
          <ArrowLeft size={20} className="text-soil" />
        </button>

        <h1 className="font-display text-title text-soil mb-1">Analitik Bisnis</h1>
        <p className="text-body text-earth mb-6">Data pengeluaran dan pembelian bisnismu</p>

        <div className="bg-fog rounded-lg shadow-card p-4 mb-4">
          <h2 className="font-semibold text-soil text-sm mb-3">Total Pengeluaran</h2>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {b2bAnalytics.monthlySpending.map((m) => (
              <div key={m.month} className="bg-cream rounded-lg p-3 text-center">
                <p className="text-[10px] font-semibold text-earth mb-1">{m.month}</p>
                <p className="font-mono font-bold text-sm text-soil">
                  Rp{(m.spending / 1000000).toFixed(1)}jt
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-cream">
            <span className="text-caption text-earth">Bulan lalu vs bulan ini</span>
            <div className="flex items-center gap-1">
              {b2bAnalytics.lastMonthChange > 0 ? (
                <TrendingUp size={16} className="text-red-500" />
              ) : (
                <TrendingDown size={16} className="text-leaf" />
              )}
              <span className={`font-semibold text-sm font-mono ${
                b2bAnalytics.lastMonthChange > 0 ? 'text-red-500' : 'text-leaf'
              }`}>
                {b2bAnalytics.lastMonthChange > 0 ? '+' : ''}{b2bAnalytics.lastMonthChange}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-fog rounded-lg shadow-card p-4 mb-4">
          <h2 className="font-semibold text-soil text-sm mb-3">Produk Paling Sering Dibeli</h2>
          <div className="space-y-3">
            {b2bAnalytics.topProducts.map((product, i) => (
              <div key={product.productName}>
                <div className="flex items-center justify-between text-caption mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-harvest/10 text-harvest text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-earth">{product.productName}</span>
                  </div>
                  <span className="font-semibold text-soil">{product.totalKg} kg</span>
                </div>
                <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                  <div className="h-full bg-harvest rounded-full" style={{ width: `${(product.totalKg / maxProductKg) * 100}%` }} />
                </div>
                <p className="text-caption text-earth/60 mt-0.5">
                  Total: Rp {product.totalSpent.toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-fog rounded-lg shadow-card p-4">
          <h2 className="font-semibold text-soil text-sm mb-3">Volume Pembelian per Kategori</h2>
          <div className="space-y-2 text-caption">
            <div className="flex justify-between">
              <span className="text-earth">Sayur</span>
              <span className="font-semibold text-soil">{categoryTotals.sayur.toLocaleString('id-ID')} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-earth">Buah</span>
              <span className="font-semibold text-soil">{categoryTotals.buah.toLocaleString('id-ID')} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-earth">Bumbu</span>
              <span className="font-semibold text-soil">{categoryTotals.bumbu.toLocaleString('id-ID')} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-earth">Biji-bijian</span>
              <span className="font-semibold text-soil">{(categoryTotals['biji-bijian'] || 0).toLocaleString('id-ID')} kg</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
