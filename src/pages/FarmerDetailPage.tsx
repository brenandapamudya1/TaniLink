import { useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, CheckCircle2, Star, Calendar, Package } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ProductCard } from '@/components/ui/ProductCard'
import { useCart } from '@/context/CartContext'
import { farmers } from '@/data/farmers'
import { products } from '@/data/products'
import type { Product } from '@/types/product'

export default function FarmerDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const farmer = useMemo(() => farmers.find((f) => f.id === id), [id])

  const farmerProducts = useMemo(() => {
    if (!farmer) return []
    return products.filter((p) => p.farmerId === farmer.id)
  }, [farmer])

  if (!farmer) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h1 className="font-display text-title text-soil">Petani Tidak Ditemukan</h1>
          <Link to="/petani" className="text-sm text-harvest mt-4 underline">
            Kembali ke daftar petani
          </Link>
        </div>
      </PageWrapper>
    )
  }

  const handleProductClick = (product: Product) => {
    navigate(`/produk/${product.id}`)
  }

  return (
    <PageWrapper>
      <div className="relative">
        <img
          src={farmer.coverImage}
          alt={`Kebun ${farmer.name}`}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-16 left-4 w-10 h-10 rounded-full bg-fog/80 backdrop-blur-sm flex items-center justify-center"
          aria-label="Kembali"
        >
          <ArrowLeft size={20} className="text-soil" />
        </button>
      </div>

      <div className="px-4 -mt-12 relative z-10">
        <div className="flex items-end gap-4">
          <img
            src={farmer.avatar}
            alt={farmer.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-fog bg-cream"
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-title text-soil">{farmer.name}</h1>
            {farmer.verified && <CheckCircle2 size={20} className="text-leaf" />}
          </div>

          <div className="flex items-center gap-1 text-earth mt-1">
            <MapPin size={14} />
            <span className="text-sm">{farmer.location}</span>
          </div>
        </div>

        <div className="flex gap-4 mt-4 pb-4 border-b border-cream">
          <div className="flex items-center gap-1.5">
            <Star size={16} className="fill-harvest text-harvest" />
            <span className="text-sm font-semibold text-soil">{farmer.rating}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Package size={16} className="text-harvest" />
            <span className="text-sm font-semibold text-soil">{farmer.productCount} produk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={16} className="text-harvest" />
            <span className="text-sm font-semibold text-soil">Sejak {farmer.since}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <h2 className="font-semibold text-soil text-base mb-3">Tentang</h2>
        <p className="text-body text-earth leading-relaxed">{farmer.bio}</p>
      </div>

      <div className="px-4 pb-4">
        <h2 className="font-semibold text-soil text-base mb-3">Spesialisasi</h2>
        <div className="flex flex-wrap gap-2">
          {farmer.speciality.map((spec) => (
            <span
              key={spec}
              className="px-3 py-1.5 rounded-pill bg-cream text-caption text-earth font-semibold"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {farmerProducts.length > 0 && (
        <div className="border-t border-cream px-4 py-6">
          <h2 className="font-semibold text-soil text-base mb-4">
            Produk dari {farmer.name}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {farmerProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
                onClick={handleProductClick}
              />
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  )
}
