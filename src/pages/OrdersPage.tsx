import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Package } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Button } from '@/components/ui/Button'

type OrderTab = 'all' | 'processing' | 'shipping' | 'completed'

const tabs: { id: OrderTab; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'processing', label: 'Diproses' },
  { id: 'shipping', label: 'Dikirim' },
  { id: 'completed', label: 'Selesai' },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderTab>('all')

  return (
    <PageWrapper>
      <div className="px-4 py-6">
        <h1 className="font-display text-title text-soil mb-4">Pesanan Saya</h1>

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
      </div>
    </PageWrapper>
  )
}
