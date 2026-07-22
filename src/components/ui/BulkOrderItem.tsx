import { useState } from 'react'
import type { B2BProduct, B2BUnit } from '@/types/b2b'

interface BulkOrderItemProps {
  product: B2BProduct
  onQuantityChange?: (productId: string, quantity: number, unit: B2BUnit) => void
}

const unitOptions: B2BUnit[] = ['kg', 'karung', 'box', 'ton']

const unitToKg: Record<B2BUnit, number> = {
  kg: 1,
  karung: 50,
  box: 20,
  ton: 1000,
}

export function BulkOrderItem({ product, onQuantityChange }: BulkOrderItemProps) {
  const [quantity, setQuantity] = useState(0)
  const [unit, setUnit] = useState<B2BUnit>(product.unit)

  const weightInKg = quantity * unitToKg[unit]
  const subtotal = weightInKg * product.pricePerKg

  const handleQtyChange = (val: number) => {
    setQuantity(val)
    onQuantityChange?.(product.id, val, unit)
  }

  const handleUnitChange = (u: B2BUnit) => {
    setUnit(u)
    if (quantity > 0) {
      onQuantityChange?.(product.id, quantity, u)
    }
  }

  return (
    <div className="bg-fog rounded-lg shadow-card p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-soil text-sm">{product.name}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-pill ${
              product.grade === 'A' ? 'bg-leaf/10 text-leaf' : 'bg-earth/10 text-earth'
            }`}>
              Grade {product.grade}
            </span>
            <span className="text-caption text-earth">Stok: {product.stock.toLocaleString()} kg</span>
          </div>
        </div>
        <span className="font-mono font-bold text-sm text-soil">
          Rp{product.pricePerKg.toLocaleString()}/kg
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center border border-cream rounded-lg overflow-hidden">
          <button
            onClick={() => handleQtyChange(Math.max(0, quantity - 1))}
            className="w-9 h-9 flex items-center justify-center text-earth hover:text-harvest transition-colors font-semibold"
          >
            −
          </button>
          <input
            type="number"
            min={0}
            value={quantity || ''}
            onChange={(e) => handleQtyChange(Math.max(0, Number(e.target.value)))}
            placeholder="0"
            className="flex-1 h-9 text-center text-sm font-semibold text-soil border-x border-cream outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={() => handleQtyChange(quantity + 1)}
            className="w-9 h-9 flex items-center justify-center text-earth hover:text-harvest transition-colors font-semibold"
          >
            +
          </button>
        </div>

        <select
          value={unit}
          onChange={(e) => handleUnitChange(e.target.value as B2BUnit)}
          className="px-2 py-2 rounded-lg border border-cream text-caption font-semibold text-soil bg-fog outline-none focus:border-harvest"
        >
          {unitOptions.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </div>

      {quantity > 0 && (
        <div className="mt-3 pt-2 border-t border-cream flex items-center justify-between text-caption">
          <span className="text-earth">
            {weightInKg.toLocaleString()} kg × Rp{product.pricePerKg.toLocaleString()}
          </span>
          <span className="font-mono font-semibold text-sm text-harvest">
            Rp {subtotal.toLocaleString('id-ID')}
          </span>
        </div>
      )}
    </div>
  )
}
