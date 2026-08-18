import { useState } from 'react'
import { Store, Plus, Check } from 'lucide-react'
import type { B2BDealProduct } from '@/types/b2bDeal'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/utils/formatPrice'

interface RestoDealCardProps {
  deal: B2BDealProduct
}

export function RestoDealCard({ deal }: RestoDealCardProps) {
  const { addDeal } = useCart()
  const [added, setAdded] = useState(false)

  const discountPercent = Math.round(
    ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100
  )

  const handleAdd = () => {
    addDeal(deal)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="bg-fog rounded-lg shadow-card overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={deal.image}
          alt={deal.name}
          loading="lazy"
          className="w-full h-32 object-cover"
        />
        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-pill bg-harvest text-soil text-[10px] font-bold">
          Diskon {discountPercent}%
        </span>
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-semibold text-soil text-sm leading-snug line-clamp-1">{deal.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <Store size={12} className="text-earth/60" />
          <span className="text-[11px] text-earth truncate">{deal.partner.name}</span>
        </div>

        <div className="mt-2">
          <span className="text-[11px] text-earth/60 line-through">
            {formatPrice(deal.originalPrice)}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-bold text-soil text-sm">{formatPrice(deal.discountedPrice)}</span>
            <span className="text-[10px] text-earth/60">/ {deal.unit}</span>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className={`mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-pill text-xs font-semibold transition-colors ${
            added
              ? 'bg-leaf text-cream'
              : 'bg-soil text-cream hover:bg-leaf'
          }`}
        >
          {added ? (
            <>
              <Check size={14} />
              Ditambahkan
            </>
          ) : (
            <>
              <Plus size={14} />
              Keranjang
            </>
          )}
        </button>
      </div>
    </div>
  )
}