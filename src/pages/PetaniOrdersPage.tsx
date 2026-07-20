import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { farmerOrders, type FarmerOrder } from '@/data/farmerOrders'
import { formatPrice } from '@/utils/formatPrice'

type OrderTab = 'all' | 'baru' | 'diproses' | 'dikirim' | 'selesai'

const tabs: { id: OrderTab; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'baru', label: 'Baru' },
  { id: 'diproses', label: 'Diproses' },
  { id: 'dikirim', label: 'Dikirim' },
  { id: 'selesai', label: 'Selesai' },
]

const statusConfig: Record<FarmerOrder['status'], { label: string; bg: string; text: string }> = {
  baru: { label: 'Baru', bg: 'bg-harvest', text: 'text-soil' },
  diproses: { label: 'Diproses', bg: 'bg-earth', text: 'text-cream' },
  dikirim: { label: 'Dikirim', bg: 'bg-leaf', text: 'text-cream' },
  selesai: { label: 'Selesai', bg: 'bg-cream', text: 'text-earth' },
}

export default function PetaniOrdersPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<OrderTab>('all')

  const filteredOrders = useMemo(() => {
    if (activeTab === 'all') return farmerOrders
    return farmerOrders.filter((o) => o.status === activeTab)
  }, [activeTab])

  const handleProcess = (orderId: string) => {
    alert(`Pesanan ${orderId} diproses! (dummy)`)
  }

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
        <h1 className="font-display text-section text-soil">Pesanan Masuk</h1>
      </div>

      <div className="flex gap-1 border-b border-cream px-4">
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

      <div className="px-4 py-4 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-body text-soil font-semibold">Tidak ada pesanan</p>
            <p className="text-caption text-earth mt-2">Pesanan baru akan muncul di sini</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const config = statusConfig[order.status]
            return (
              <div key={order.id} className="bg-fog rounded-lg shadow-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-caption text-earth">No. Pesanan</p>
                    <p className="text-soil font-semibold text-sm">{order.id}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-pill text-caption font-semibold ${config.bg} ${config.text}`}>
                    {config.label}
                  </span>
                </div>

                <div className="border-t border-cream pt-3 mb-3">
                  <p className="text-soil font-semibold text-sm">{order.product}</p>
                  <p className="text-caption text-earth">
                    {order.buyerName} · {order.quantity}x
                  </p>
                  <p className="text-caption text-earth mt-1">
                    {new Date(order.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-cream pt-3">
                  <p className="font-mono text-base font-bold text-soil">
                    {formatPrice(order.total)}
                  </p>
                  {(order.status === 'baru' || order.status === 'diproses') && (
                    <button
                      onClick={() => handleProcess(order.id)}
                      className="px-4 py-2 rounded-pill bg-harvest text-soil text-sm font-semibold hover:brightness-105 active:scale-95 transition-all"
                    >
                      {order.status === 'baru' ? 'Proses' : 'Kirim'}
                    </button>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </PageWrapper>
  )
}
