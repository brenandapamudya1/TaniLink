import { Link, useNavigate } from 'react-router-dom'
import { ProductCard } from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import type { Product } from '@/types/product'

export function ProductCarousel() {
  const navigate = useNavigate()
  const { addItem } = useCart()

  const topProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)

  const handleProductClick = (product: Product) => {
    navigate(`/produk/${product.id}`)
  }

  return (
    <section className="bg-cream py-8 md:max-w-[480px] md:mx-auto">
      <div className="px-4 mb-4 flex items-center justify-between">
        <h2 className="font-display text-section text-soil">
          Segar dari kebun hari ini
        </h2>
        <Link
          to="/produk"
          className="text-label text-leaf font-semibold hover:text-leaf/80 transition-colors"
        >
          Lihat semua →
        </Link>
      </div>

      <div className="px-4 grid grid-cols-2 gap-3">
        {topProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addItem}
            onClick={handleProductClick}
          />
        ))}
      </div>

      <div className="px-4 mt-6 flex justify-center">
        <Link to="/produk">
          <Button label="Lihat Semua Produk" variant="dark" />
        </Link>
      </div>
    </section>
  )
}
