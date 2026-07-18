import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, X, ChevronDown } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ProductCard } from '@/components/ui/ProductCard'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import type { Product } from '@/types/product'

type SortOption = 'popular' | 'cheapest' | 'newest'

export default function ProductListPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { addItem } = useCart()

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [sortBy, setSortBy] = useState<SortOption>('popular')

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(query))
    }

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'cheapest':
        result.sort((a, b) => a.price - b.price)
        break
      case 'newest':
        result.sort((a, b) => new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime())
        break
    }

    return result
  }, [searchQuery, selectedCategory, sortBy])

  const handleProductClick = (product: Product) => {
    navigate(`/produk/${product.id}`)
  }

  return (
    <PageWrapper>
      <div className="sticky top-14 z-30 bg-fog px-4 py-3 border-b border-cream">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-earth" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari sayur, buah, rempah..."
            className="w-full h-11 pl-11 pr-10 rounded-pill bg-cream text-soil placeholder:text-earth/60 focus:outline-none focus:ring-2 focus:ring-harvest/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-earth/20 flex items-center justify-center"
              aria-label="Hapus pencarian"
            >
              <X size={14} className="text-earth" />
            </button>
          )}
        </div>
      </div>

      <div className="sticky top-[102px] z-20 bg-fog px-4 pt-4 pb-2 border-b border-cream">
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 snap-x">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-pill text-sm font-semibold whitespace-nowrap transition-colors ${selectedCategory === 'all'
              ? 'bg-leaf text-cream'
              : 'bg-transparent border border-earth text-earth'
              }`}
          >
            Semua
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-pill text-sm font-semibold whitespace-nowrap transition-colors ${selectedCategory === category.id
                ? 'bg-leaf text-cream'
                : 'bg-transparent border border-earth text-earth'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between">
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none bg-transparent text-caption text-earth font-semibold pr-8 focus:outline-none cursor-pointer"
          >
            <option value="popular">Terpopuler</option>
            <option value="cheapest">Termurah</option>
            <option value="newest">Terbaru</option>
          </select>
          <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-earth pointer-events-none" />
        </div>
        <span className="text-caption text-earth">
          {filteredProducts.length} produk
        </span>
      </div>

      <div className="px-4 pb-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
                onClick={handleProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Search size={48} className="text-earth/30 mb-4" />
            <p className="text-body text-soil font-semibold">Produk tidak ditemukan</p>
            <p className="text-caption text-earth mt-2">Coba kata kunci lain atau hapus filter</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
