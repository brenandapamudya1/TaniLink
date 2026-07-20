import { useState, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Heart, Star, MapPin, CheckCircle2, Minus, Plus } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ProductCard } from '@/components/ui/ProductCard'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatPrice } from '@/utils/formatPrice'
import { products } from '@/data/products'
import { farmers } from '@/data/farmers'
import type { Product } from '@/types/product'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const [quantity, setQuantity] = useState(1)

  const product = useMemo(() => products.find((p) => p.id === id), [id])
  const farmer = useMemo(() => {
    if (!product) return undefined
    return farmers.find((f) => f.id === product.farmerId)
  }, [product])

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h1 className="font-display text-title text-soil">Produk Tidak Ditemukan</h1>
          <Link to="/produk" className="text-sm text-harvest mt-4 underline">
            Kembali ke daftar produk
          </Link>
        </div>
      </PageWrapper>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    navigate('/keranjang')
  }

  const handleRelatedClick = (p: Product) => {
    navigate(`/produk/${p.id}`)
    setQuantity(1)
  }

  return (
    <PageWrapper>
      <div className="sticky top-14 z-30 bg-fog/90 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft size={20} className="text-soil" />
        </button>
        <button
          onClick={() => toggleWishlist(product.id)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
          aria-label={isWishlisted(product.id) ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
        >
          <Heart size={20} className={isWishlisted(product.id) ? 'fill-harvest text-harvest' : 'text-earth'} />
        </button>
      </div>

      <div className="aspect-square bg-cream overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {product.tags.length > 0 && (
            <span className="inline-block px-3 py-1 rounded-pill bg-leaf text-cream text-caption font-semibold">
              {product.tags[0]}
            </span>
          )}
          {product.grade && (
            <span className={`inline-block px-3 py-1 rounded-pill text-caption font-semibold ${
              product.grade === 'A' ? 'bg-leaf text-cream' :
              product.grade === 'B' ? 'bg-earth text-cream' :
              'bg-earth/50 text-cream'
            }`}>
              Grade {product.grade}
            </span>
          )}
        </div>

        <h1 className="font-display text-title text-soil leading-tight mb-2">
          {product.name}
        </h1>

        <div className="flex items-center gap-2 mb-3">
          <Star size={14} className="fill-harvest text-harvest" />
          <span className="text-sm font-semibold text-soil">{product.rating}</span>
          <span className="text-caption text-earth">({product.reviewCount} ulasan)</span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-mono text-price text-soil font-bold">
            {formatPrice(product.price)}
          </span>
          <span className="text-caption text-earth">/{product.unit}</span>
        </div>

        <p className="text-caption text-earth">
          Stok: {product.stock} tersedia
        </p>
      </div>

      <div className="border-t border-cream px-4 py-6">
        <h2 className="font-semibold text-soil text-base mb-3">Deskripsi</h2>
        <p className="text-body text-earth leading-relaxed">{product.description}</p>
        <p className="text-caption text-earth mt-3">
          Dipanen: {new Date(product.harvestDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {farmer && (
        <div className="border-t border-cream px-4 py-6">
          <h2 className="font-semibold text-soil text-base mb-3">Dari Petani</h2>
          <Link
            to={`/petani/${farmer.id}`}
            className="flex items-center gap-3 p-3 bg-cream rounded-lg hover:bg-cream/80 transition-colors"
          >
            <img
              src={farmer.avatar}
              alt={farmer.name}
              loading="lazy"
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-soil font-semibold text-sm truncate">{farmer.name}</span>
                {farmer.verified && <CheckCircle2 size={14} className="text-leaf flex-shrink-0" />}
              </div>
              <div className="flex items-center gap-1 text-caption text-earth">
                <MapPin size={11} />
                <span className="truncate">{farmer.location}</span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {relatedProducts.length > 0 && (
        <div className="border-t border-cream px-4 py-6">
          <h2 className="font-semibold text-soil text-base mb-4">Produk Serupa</h2>
          <div className="grid grid-cols-2 gap-3">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={addItem}
                onClick={handleRelatedClick}
              />
            ))}
          </div>
        </div>
      )}

      <div className="h-24" />

      <div className="fixed bottom-[60px] left-0 right-0 bg-fog border-t border-cream shadow-card p-4 md:hidden z-30">
        <div className="md:max-w-[480px] md:mx-auto flex items-center gap-3">
          <div className="flex items-center gap-2 border border-earth rounded-pill px-2 py-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
              aria-label="Kurangi jumlah"
            >
              <Minus size={16} className="text-earth" />
            </button>
            <span className="text-soil font-semibold text-sm w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
              aria-label="Tambah jumlah"
            >
              <Plus size={16} className="text-earth" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 py-3.5 rounded-pill bg-harvest text-soil font-bold text-base shadow-cta hover:brightness-105 active:scale-95 transition-all"
          >
            Tambah Keranjang
          </button>
        </div>
      </div>
    </PageWrapper>
  )
}
