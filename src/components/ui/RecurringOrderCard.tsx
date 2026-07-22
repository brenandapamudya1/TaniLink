import { useState } from 'react'
import { ToggleLeft, ToggleRight, Package } from 'lucide-react'
import type { RecurringOrder } from '@/types/b2b'

interface RecurringOrderCardProps {
  order: RecurringOrder
  onToggle?: (orderId: string, active: boolean) => void
}

const dayLabels: Record<string, string> = {
  Senin: 'Sen',
  Selasa: 'Sel',
  Rabu: 'Rab',
  Kamis: 'Kam',
  Jumat: 'Jum',
  Sabtu: 'Sab',
  Minggu: 'Min',
}

export function RecurringOrderCard({ order, onToggle }: RecurringOrderCardProps) {
  const [active, setActive] = useState(order.active)

  const handleToggle = () => {
    setActive(!active)
    onToggle?.(order.id, !active)
  }

  return (
    <div className="bg-fog rounded-lg shadow-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-soil text-sm">{order.name}</h4>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-pill ${
          active ? 'bg-leaf/10 text-leaf' : 'bg-earth/10 text-earth'
        }`}>
          {active ? 'Aktif' : 'Nonaktif'}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {order.days.map((day) => (
          <span key={day} className={`px-2 py-0.5 rounded-pill text-[10px] font-semibold ${
            active ? 'bg-harvest/10 text-harvest' : 'bg-cream text-earth'
          }`}>
            {dayLabels[day] || day}
          </span>
        ))}
      </div>

      <div className="space-y-1.5 mb-3">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-caption">
            <div className="flex items-center gap-1.5">
              <Package size={12} className="text-earth" />
              <span className="text-earth">{item.productName}</span>
            </div>
            <span className="font-semibold text-soil">{item.quantity} {item.unit}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleToggle}
        className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg border transition-colors text-caption font-semibold ${
          active
            ? 'border-leaf/30 bg-leaf/5 text-leaf'
            : 'border-cream text-earth hover:bg-cream'
        }`}
      >
        {active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
        {active ? 'Aktifkan Otomatis' : 'Nonaktifkan'}
      </button>
    </div>
  )
}
