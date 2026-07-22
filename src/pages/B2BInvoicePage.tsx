import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { InvoiceCard } from '@/components/ui/InvoiceCard'
import { b2bInvoices } from '@/data/b2bInvoices'
import type { InvoiceStatus } from '@/types/b2b'

const tabs: { label: string; value: 'all' | InvoiceStatus }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Lunas', value: 'lunas' },
  { label: 'Tempo', value: 'tempo' },
  { label: 'Overdue', value: 'overdue' },
]

export default function B2BInvoicePage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<'all' | InvoiceStatus>('all')

  const filtered = filter === 'all' ? b2bInvoices : b2bInvoices.filter((inv) => inv.status === filter)

  const totalOutstanding = b2bInvoices
    .filter((inv) => inv.status === 'tempo' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.total, 0)

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

        <h1 className="font-display text-title text-soil mb-1">Invoice</h1>
        <p className="text-body text-earth mb-6">Riwayat transaksi bisnismu</p>

        <div className="bg-harvest/10 rounded-lg px-4 py-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-caption text-earth">Total Outstanding</span>
            <span className="font-mono font-bold text-base text-harvest">
              Rp {totalOutstanding.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-1.5 rounded-pill text-caption font-semibold whitespace-nowrap transition-colors ${
                filter === tab.value
                  ? 'bg-leaf text-cream'
                  : 'border border-earth/30 text-earth hover:bg-cream'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
