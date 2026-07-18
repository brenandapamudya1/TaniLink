import { useNavigate } from 'react-router-dom'
import { ProductCard } from '@/components/ui/ProductCard'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import type { Product } from '@/types/product'

export function RekomendasiSection() {
  const navigate = useNavigate()
  const { addItem } = useCart()

  const topProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)

  const handleProductClick = (product: Product) => {
    navigate(`/produk/${product.id}`)
  }

  return (
    <section className="px-4 py-6 border-t border-cream">
      <h2 className="font-display text-section text-soil mb-4">
        Rekomendasi untukmu
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {topProducts.map((product) => (
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
