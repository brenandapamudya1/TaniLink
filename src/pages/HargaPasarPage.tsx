import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { marketPrices } from '@/data/marketPrices'
import { categories } from '@/data/categories'
import { formatPrice } from '@/utils/formatPrice'

export default function HargaPasarPage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredPrices = useMemo(() => {
    if (selectedCategory === 'all') return marketPrices
    return marketPrices.filter((p) => p.category === selectedCategory)
  }, [selectedCategory])

  return (
    <PageWrapper>
      <div className="sticky top-14 z-30 bg-fog px-4 py-3 border-b border-cream flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft size={20} className="text-soil" />
        </button>
        <h1 className="font-display text-section text-soil">Harga Pasar</h1>
      </div>

      <div className="px-4 py-3 border-b border-cream">
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
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-pill text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-leaf text-cream'
                  : 'bg-transparent border border-earth text-earth'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        <p className="text-caption text-earth mb-4">
          Harga rata-rata pasar hari ini — {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <div className="bg-fog rounded-lg shadow-card overflow-hidden">
          {filteredPrices.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-center justify-between px-4 py-3 ${
                index < filteredPrices.length - 1 ? 'border-b border-cream' : ''
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-soil font-semibold text-sm">{item.commodity}</p>
                <p className="text-caption text-earth">/{item.unit}</p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="font-mono text-sm font-bold text-soil">
                  {formatPrice(item.avgPrice)}
                </p>
                <div className={`flex items-center justify-end gap-1 ${
                  item.trend === 'up' ? 'text-leaf' :
                  item.trend === 'down' ? 'text-red-500' :
                  'text-earth'
                }`}>
                  {item.trend === 'up' && <TrendingUp size={12} />}
                  {item.trend === 'down' && <TrendingDown size={12} />}
                  {item.trend === 'stable' && <Minus size={12} />}
                  <span className="text-[11px] font-semibold">
                    {item.change > 0 ? '+' : ''}{item.change}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
