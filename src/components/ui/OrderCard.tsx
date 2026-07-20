import { Sprout, Package, Truck, CheckCircle } from 'lucide-react'
import type { Order, OrderStatus } from '@/data/orders'
import { formatPrice } from '@/utils/formatPrice'

interface OrderCardProps {
  order: Order
}

const trackingSteps: { status: OrderStatus; label: string; icon: typeof Sprout }[] = [
  { status: 'dipanen', label: 'Dipanen', icon: Sprout },
  { status: 'dikumpulkan', label: 'Dikumpulkan', icon: Package },
  { status: 'perjalanan', label: 'Dalam Perjalanan', icon: Truck },
  { status: 'selesai', label: 'Selesai', icon: CheckCircle },
]

const statusOrder: Record<OrderStatus, number> = {
  dipanen: 0,
  dikumpulkan: 1,
  perjalanan: 2,
  selesai: 3,
}

export function OrderCard({ order }: OrderCardProps) {
  const currentStepIndex = statusOrder[order.status]

  return (
    <div className="bg-fog rounded-lg shadow-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-caption text-earth">No. Pesanan</p>
          <p className="text-soil font-semibold text-sm">{order.id}</p>
        </div>
        <div className="text-right">
          <p className="text-caption text-earth">Tanggal</p>
          <p className="text-soil text-sm">
            {new Date(order.date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div className="border-t border-cream pt-3 mb-3">
        <p className="text-caption text-earth mb-1">Dari Petani</p>
        <p className="text-soil font-semibold text-sm">{order.farmerName}</p>
        <p className="text-caption text-earth">{order.farmerLocation}</p>
      </div>

      <div className="border-t border-cream pt-3 mb-3">
        <p className="text-caption text-earth mb-2">Pesanan</p>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-soil text-sm truncate">{item.name}</p>
                <p className="text-caption text-earth">{item.quantity}x {formatPrice(item.price)}</p>
              </div>
              <p className="font-mono text-sm font-bold text-soil ml-2">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-cream pt-3 mb-4">
        <p className="text-caption text-earth mb-2">Status Pengiriman</p>
        <div className="relative">
          {trackingSteps.map((step, index) => {
            const Icon = step.icon
            const isCompleted = index <= currentStepIndex
            const isCurrent = index === currentStepIndex

            return (
              <div key={step.status} className="flex items-start gap-3 mb-3 last:mb-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? isCurrent
                          ? 'bg-harvest text-soil'
                          : 'bg-leaf text-cream'
                        : 'bg-cream text-earth/40'
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  {index < trackingSteps.length - 1 && (
                    <div
                      className={`w-0.5 h-6 ${
                        index < currentStepIndex ? 'bg-leaf' : 'bg-cream'
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <p
                    className={`text-sm font-semibold ${
                      isCompleted ? 'text-soil' : 'text-earth/40'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="border-t border-cream pt-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-earth">Subtotal</span>
          <span className="text-soil font-mono">{formatPrice(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-earth">Ongkir</span>
          <span className="text-soil font-mono">{formatPrice(order.shippingCost)}</span>
        </div>
        <div className="flex justify-between border-t border-cream pt-2">
          <span className="text-soil font-semibold">Total</span>
          <span className="font-mono text-price text-soil font-bold">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>
    </div>
  )
}
