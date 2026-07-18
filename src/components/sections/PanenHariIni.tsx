import { useNavigate } from 'react-router-dom'
import { ProductCard } from '@/components/ui/ProductCard'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import type { Product } from '@/types/product'

export function PanenHariIni() {
  const navigate = useNavigate()
  const { addItem } = useCart()

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime())
    .slice(0, 6)

  const handleProductClick = (product: Product) => {
    navigate(`/produk/${product.id}`)
  }

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-section text-soil">
          Panen Hari Ini
        </h2>
        <span className="text-caption text-leaf font-semibold">
          🌱 Segar dari kebun
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {recentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addItem}
            onClick={handleProductClick}
          />
        ))}
      </div>
    </section>
  )
}
