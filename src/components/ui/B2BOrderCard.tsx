import { useState } from 'react'
import { CheckCircle, Circle, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import type { B2BOrder, B2BOrderStatus } from '@/types/b2b'

interface B2BOrderCardProps {
  order: B2BOrder
  onClick?: (order: B2BOrder) => void
}

const steps: { key: B2BOrderStatus; label: string }[] = [
  { key: 'dibuat', label: 'Pesanan Dibuat' },
  { key: 'petani_dikonfirmasi', label: 'Petani Dikonfirmasi' },
  { key: 'panen', label: 'Panen' },
  { key: 'collection_agent', label: 'Collection Agent' },
  { key: 'qc', label: 'Quality Control' },
  { key: 'hub', label: 'Distribution Hub' },
  { key: 'pengiriman', label: 'Dalam Pengiriman' },
  { key: 'diterima', label: 'Diterima' },
]

const statusLabels: Record<B2BOrderStatus, string> = {
  dibuat: 'Dibuat',
  petani_dikonfirmasi: 'Dikonfirmasi',
  panen: 'Dipanen',
  collection_agent: 'Collection',
  qc: 'QC',
  hub: 'Di Hub',
  pengiriman: 'Dikirim',
  diterima: 'Diterima',
}

const statusColors: Record<B2BOrderStatus, string> = {
  dibuat: 'bg-harvest/10 text-harvest',
  petani_dikonfirmasi: 'bg-harvest/10 text-harvest',
  panen: 'bg-leaf/10 text-leaf',
  collection_agent: 'bg-leaf/10 text-leaf',
  qc: 'bg-leaf/10 text-leaf',
  hub: 'bg-leaf/10 text-leaf',
  pengiriman: 'bg-blue-100 text-blue-600',
  diterima: 'bg-leaf/10 text-leaf',
}

export function B2BOrderCard({ order, onClick }: B2BOrderCardProps) {
  const [expanded, setExpanded] = useState(false)
  const currentIdx = steps.findIndex((s) => s.key === order.status)

  return (
    <article
      onClick={() => onClick?.(order)}
      className="bg-fog rounded-lg shadow-card p-4 cursor-pointer hover:shadow-card-hover transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-sm text-soil">#{order.id}</span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-pill ${statusColors[order.status]}`}>
            {statusLabels[order.status]}
          </span>
        </div>
        <span className="text-caption text-earth">
          {order.createdAt.slice(0, 10)}
        </span>
      </div>

      <div className="space-y-1.5 mb-3">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-caption">
            <span className="text-earth">{item.productName}</span>
            <span className="font-semibold text-soil">{item.quantity} {item.unit}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-cream">
        <div className="flex items-center gap-1 text-caption text-earth">
          <Clock size={12} />
          <span>{order.totalWeight} kg</span>
        </div>
        <span className="font-mono font-bold text-sm text-harvest">
          Rp {order.totalPrice.toLocaleString('id-ID')}
        </span>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
        className="w-full flex items-center justify-center gap-1 mt-3 pt-2 border-t border-cream text-caption text-earth hover:text-harvest transition-colors"
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {expanded ? 'Sembunyikan Timeline' : 'Lihat Timeline'}
      </button>

      {expanded && (
        <div className="mt-3 space-y-0 pl-2">
          {steps.map((step, i) => {
            const ts = order.statusTimestamps[step.key]
            const isComplete = !!ts && i <= currentIdx
            const isActive = i === currentIdx && order.status !== 'diterima'
            const isFuture = i > currentIdx

            return (
              <div key={step.key} className="flex gap-3 pb-4 last:pb-0 relative">
                <div className="flex flex-col items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center z-10 ${
                    isComplete ? 'bg-leaf' : isActive ? 'bg-harvest' : 'bg-cream'
                  }`}>
                    {isComplete ? (
                      <CheckCircle size={14} className="text-cream" />
                    ) : (
                      <Circle size={14} className={`${isActive ? 'text-soil' : 'text-earth/30'}`} />
                    )}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-0.5 flex-1 mt-0.5 ${isComplete ? 'bg-leaf' : 'bg-cream'}`} />
                  )}
                </div>
                <div className="flex-1 pb-1">
                  <p className={`text-sm font-semibold ${isFuture ? 'text-earth/40' : 'text-soil'}`}>
                    {step.label}
                  </p>
                  {ts && (
                    <p className="text-caption text-earth">
                      {new Date(ts).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </article>
  )
}
