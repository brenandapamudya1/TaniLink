import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ArrowLeft } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ProductCard } from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/Button'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'

export default function WishlistPage() {
  const navigate = useNavigate()
  const { wishlistIds } = useWishlist()
  const { addItem } = useCart()

  const wishlistProducts = useMemo(
    () => products.filter((p) => wishlistIds.has(p.id)),
    [wishlistIds]
  )

  return (
    <PageWrapper>
      <div className="sticky top-14 z-30 bg-fog px-4 py-3 border-b border-cream flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
            aria-label="Kembali"
          >
            <ArrowLeft size={20} className="text-soil" />
          </button>
          <h1 className="font-display text-section text-soil">Wishlist Saya</h1>
        </div>
        {wishlistProducts.length > 0 && (
          <span className="text-caption text-earth font-semibold">
            {wishlistProducts.length} produk
          </span>
        )}
      </div>

      <div className="px-4 py-6">
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
