import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ProductCard } from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/Button'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'

export default function WishlistPage() {
  const { wishlistIds } = useWishlist()
  const { addItem } = useCart()

  const wishlistProducts = useMemo(
    () => products.filter((p) => wishlistIds.has(p.id)),
    [wishlistIds]
  )

  return (
    <PageWrapper>
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-title text-soil">Wishlist Saya</h1>
          {wishlistProducts.length > 0 && (
            <span className="text-caption text-earth font-semibold">
              {wishlistProducts.length} produk
            </span>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Heart size={64} className="text-earth/30 mb-4" />
            <p className="text-body text-soil font-semibold">Belum ada produk di wishlist</p>
            <p className="text-caption text-earth mt-2 text-center">
              Tap ikon hati di produk yang kamu suka untuk menyimpannya di sini.
            </p>
            <div className="mt-6">
              <Link to="/produk">
                <Button label="Mulai Belanja" variant="primary" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
              />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
