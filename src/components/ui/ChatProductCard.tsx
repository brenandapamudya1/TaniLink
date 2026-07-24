import { useNavigate } from 'react-router-dom'
import { formatPrice } from '@/utils/formatPrice'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/types/product'

interface ChatProductCardProps {
  product: Product
}

export function ChatProductCard({ product }: ChatProductCardProps) {
  const navigate = useNavigate()
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <button
      onClick={() => navigate(`/produk/${product.id}`)}
      className="flex items-center gap-2 p-2 rounded-lg bg-fog border border-cream/50 hover:bg-cream/30 transition-colors text-left w-full cursor-pointer"
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-[48px] h-[48px] rounded-md object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-soil truncate">{product.name}</p>
        <p className="text-[11px] text-harvest font-bold font-mono">
          {formatPrice(product.price)}<span className="text-earth font-normal">/{product.unit}</span>
        </p>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-7 h-7 rounded-full bg-harvest/20 flex items-center justify-center flex-shrink-0 hover:bg-harvest/30 transition-colors"
        aria-label={`Tambah ${product.name} ke keranjang`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-harvest">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </button>
  )
}
