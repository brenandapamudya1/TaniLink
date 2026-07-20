import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Package, ArrowLeft } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Button } from '@/components/ui/Button'
import { OrderCard } from '@/components/ui/OrderCard'
import { orders } from '@/data/orders'

type OrderTab = 'all' | 'dipanen' | 'perjalanan' | 'selesai'

const tabs: { id: OrderTab; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'dipanen', label: 'Diproses' },
  { id: 'perjalanan', label: 'Dikirim' },
  { id: 'selesai', label: 'Selesai' },
]

export default function OrdersPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<OrderTab>('all')

  const filteredOrders = useMemo(() => {
    if (activeTab === 'all') return orders
    return orders.filter((order) => order.status === activeTab)
  }, [activeTab])

  return (
    <PageWrapper>
      <div className="sticky top-14 z-30 bg-fog px-4 py-3 border-b border-cream flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft size={20} className="text-soil" />
        </button>
        <h1 className="font-display text-section text-soil">Pesanan Saya</h1>
      </div>

      <div className="px-4 py-6">

        <div className="flex gap-1 border-b border-cream mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'text-harvest border-harvest'
                  : 'text-earth border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Package size={64} className="text-earth/30 mb-4" />
            <p className="text-body text-soil font-semibold">Belum ada pesanan</p>
            <p className="text-caption text-earth mt-2 text-center">
              Mulai belanja dan pesananmu akan muncul di sini.
            </p>
            <div className="mt-6">
              <Link to="/produk">
                <Button label="Mulai Belanja" variant="primary" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
