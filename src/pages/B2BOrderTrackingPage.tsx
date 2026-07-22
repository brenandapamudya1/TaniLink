import { useState } from 'react'
import { Package, Search } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { B2BOrderCard } from '@/components/ui/B2BOrderCard'
import { b2bOrders } from '@/data/b2bOrders'
import type { B2BOrderStatus } from '@/types/b2b'

const statusFilters: { key: B2BOrderStatus | 'semua'; label: string }[] = [
  { key: 'semua', label: 'Semua' },
  { key: 'dibuat', label: 'Baru' },
  { key: 'pengiriman', label: 'Dikirim' },
  { key: 'diterima', label: 'Selesai' },
]

export default function B2BOrderTrackingPage() {
  const [activeFilter, setActiveFilter] = useState<B2BOrderStatus | 'semua'>('semua')
  const [search, setSearch] = useState('')

  const filtered = b2bOrders.filter((o) => {
    const matchFilter = activeFilter === 'semua' || o.status === activeFilter
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some((i) => i.productName.toLowerCase().includes(search.toLowerCase()))
    return matchFilter && matchSearch
  })

  return (
    <PageWrapper>
      <div className="px-4 pt-6 pb-4 bg-soil">
        <h1 className="font-display text-section text-cream mb-1">Lacak Pesanan</h1>
        <p className="text-caption text-cream/70">Pantau status pesanan bulk Anda</p>
      </div>

      <div className="px-4 -mt-3 mb-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth" />
          <input
            type="text"
            placeholder="Cari pesanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-fog border border-cream text-sm text-soil placeholder:text-earth/50 focus:outline-none focus:border-harvest transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-2 px-4 mb-4 overflow-x-auto scrollbar-none">
        {statusFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`shrink-0 px-4 py-1.5 rounded-pill text-xs font-semibold transition-colors ${
              activeFilter === f.key
                ? 'bg-harvest text-soil'
                : 'bg-fog text-earth border border-cream'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="px-4 pb-24 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package size={48} className="text-earth/30 mb-3" />
            <p className="text-earth font-semibold">Tidak ada pesanan</p>
            <p className="text-caption text-earth/60 mt-1">Pesanan akan muncul di sini setelah Anda melakukan pemesanan bulk</p>
          </div>
        ) : (
          filtered.map((order) => (
            <B2BOrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </PageWrapper>
  )
}
