import { MapPin, Truck, Clock, Award } from 'lucide-react'

interface EarningsSummaryProps {
  pickupFee: number
  deliveryFee: number
  performanceBonus: number
  qualityBonus: number
  total: number
}

export function EarningsSummary({ pickupFee, deliveryFee, performanceBonus, qualityBonus, total }: EarningsSummaryProps) {
  const items = [
    { label: 'Pickup Fee', value: pickupFee, icon: MapPin, color: 'text-harvest' },
    { label: 'Delivery Fee', value: deliveryFee, icon: Truck, color: 'text-leaf' },
    { label: 'Performance Bonus', value: performanceBonus, icon: Clock, color: 'text-blue-500' },
    { label: 'Quality Bonus', value: qualityBonus, icon: Award, color: 'text-purple-500' },
  ]

  return (
    <div className="bg-fog rounded-lg shadow-card p-4">
      <h3 className="font-semibold text-soil text-sm mb-4">Ringkasan Pendapatan</h3>

      <div className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon size={16} className={item.color} />
                <span className="text-caption text-earth">{item.label}</span>
              </div>
              <span className="font-mono text-sm font-semibold text-soil">
                Rp {item.value.toLocaleString('id-ID')}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-cream flex items-center justify-between">
        <span className="font-semibold text-soil text-sm">Total</span>
        <span className="font-mono text-base font-bold text-harvest">
          Rp {total.toLocaleString('id-ID')}
        </span>
      </div>
    </div>
  )
}
