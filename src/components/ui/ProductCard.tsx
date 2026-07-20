import { Star, Heart } from 'lucide-react'
import type { Product } from '@/types/product'
import { formatPrice } from '@/utils/formatPrice'
import { useWishlist } from '@/context/WishlistContext'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onClick?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  const { name, images, price, unit, rating, reviewCount, tags } = product
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  return (
    <article
      onClick={() => onClick?.(product)}
      className="
        relative flex flex-col bg-fog rounded-lg overflow-hidden
        shadow-card hover:shadow-card-hover transition-shadow duration-200
        cursor-pointer
      "
    >
      {tags.length > 0 && (
        <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-pill bg-leaf text-cream text-caption font-semibold">
          {tags[0]}
        </span>
      )}

      <button
        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id) }}
        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-fog/80 flex items-center justify-center"
        aria-label={wishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
      >
        <Heart size={16} className={wishlisted ? 'fill-harvest text-harvest' : 'text-earth'} />
      </button>

      <div className="aspect-square bg-cream overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 p-3 gap-1">
        <h3 className="text-soil font-semibold text-sm leading-snug line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center gap-1 mt-0.5">
          <Star size={12} className="fill-harvest text-harvest" />
          <span className="text-caption font-semibold text-soil">{rating}</span>
          <span className="text-caption text-earth">({reviewCount})</span>
        </div>

        <div className="mt-auto pt-2">
          <p className="font-mono text-base font-bold text-soil">
            {formatPrice(price)}
            <span className="text-caption text-earth font-normal font-sans"> /{unit}</span>
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product) }}
            className="
              w-full mt-2 py-2 rounded-pill bg-harvest text-soil
              font-semibold text-sm hover:brightness-105
              active:scale-95 transition-all
            "
            aria-label={`Tambah ${name} ke keranjang`}
          >
            + Keranjang
          </button>
        </div>
      </div>
    </article>
  )
}
