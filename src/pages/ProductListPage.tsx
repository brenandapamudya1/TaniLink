import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, X, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ProductCard } from '@/components/ui/ProductCard'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { farmers } from '@/data/farmers'
import type { Product } from '@/types/product'

type SortOption = 'popular' | 'cheapest' | 'newest'
type PriceRange = 'all' | 'under10k' | '10kto20k' | 'over20k'

export default function ProductListPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { addItem } = useCart()

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [priceRange, setPriceRange] = useState<PriceRange>('all')
  const [selectedLocation, setSelectedLocation] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('popular')
  const [showFilter, setShowFilter] = useState(false)

  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(farmers.map((f) => f.location))]
    return uniqueLocations.sort()
  }, [])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (priceRange !== 'all') count++
    if (selectedLocation !== 'all') count++
    return count
  }, [priceRange, selectedLocation])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(query))
    }

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (priceRange !== 'all') {
      result = result.filter((p) => {
        if (priceRange === 'under10k') return p.price < 10000
        if (priceRange === '10kto20k') return p.price >= 10000 && p.price <= 20000
        if (priceRange === 'over20k') return p.price > 20000
        return true
      })
    }

    if (selectedLocation !== 'all') {
      result = result.filter((p) => {
        const farmer = farmers.find((f) => f.id === p.farmerId)
        return farmer?.location === selectedLocation
      })
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
  }, [searchQuery, selectedCategory, priceRange, selectedLocation, sortBy])

  const handleProductClick = (product: Product) => {
    navigate(`/produk/${product.id}`)
  }

  const handleResetFilters = () => {
    setPriceRange('all')
    setSelectedLocation('all')
  }

  const priceRanges: { id: PriceRange; label: string }[] = [
    { id: 'all', label: 'Semua Harga' },
    { id: 'under10k', label: '< Rp 10.000' },
    { id: '10kto20k', label: 'Rp 10-20rb' },
    { id: 'over20k', label: '> Rp 20.000' },
  ]

  return (
    <PageWrapper>
      <div className="sticky top-14 z-30 bg-fog px-4 py-3 border-b border-cream">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
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
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`relative w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
              showFilter || activeFilterCount > 0
                ? 'bg-harvest text-soil'
                : 'bg-cream text-earth hover:bg-cream/80'
            }`}
            aria-label="Filter"
          >
            <SlidersHorizontal size={18} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-leaf text-cream text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="sticky top-[102px] z-20 bg-fog px-4 pt-3 pb-2 border-b border-cream">
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 snap-x">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-pill text-sm font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
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
              className={`px-4 py-2 rounded-pill text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-leaf text-cream'
                  : 'bg-transparent border border-earth text-earth'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {showFilter && (
        <div className="bg-fog border-b border-cream shadow-card">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-soil font-semibold text-base">Filter</h3>
              <div className="flex items-center gap-3">
                {(priceRange !== 'all' || selectedLocation !== 'all') && (
                  <button
                    onClick={handleResetFilters}
                    className="text-caption text-harvest font-semibold"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={() => setShowFilter(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
                  aria-label="Tutup filter"
                >
                  <X size={16} className="text-earth" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-caption text-earth font-semibold mb-2">Harga</p>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setPriceRange(range.id)}
                      className={`px-3 py-1.5 rounded-pill text-xs font-semibold transition-colors ${
                        priceRange === range.id
                          ? 'bg-harvest text-soil'
                          : 'bg-transparent border border-earth/30 text-earth'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-caption text-earth font-semibold mb-2">Lokasi Petani</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedLocation('all')}
                    className={`px-3 py-1.5 rounded-pill text-xs font-semibold transition-colors ${
                      selectedLocation === 'all'
                        ? 'bg-earth text-cream'
                        : 'bg-transparent border border-earth/30 text-earth'
                    }`}
                  >
                    Semua Lokasi
                  </button>
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={`px-3 py-1.5 rounded-pill text-xs font-semibold transition-colors ${
                        selectedLocation === location
                          ? 'bg-earth text-cream'
                          : 'bg-transparent border border-earth/30 text-earth'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowFilter(false)}
              className="w-full mt-4 py-2.5 rounded-pill bg-harvest text-soil font-bold text-sm hover:brightness-105 active:scale-95 transition-all"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      )}

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
