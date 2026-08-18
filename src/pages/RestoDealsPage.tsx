import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, UtensilsCrossed } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { RestoDealCard } from '@/components/ui/RestoDealCard'
import { b2bDeals } from '@/data/b2bDeals'

const categories = ['Semua', 'Masakan Nusantara', 'Salad', 'Sup']

export default function RestoDealsPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('Semua')

  const filteredDeals =
    activeCategory === 'Semua'
      ? b2bDeals
      : b2bDeals.filter((deal) => {
          const label =
            deal.category === 'masakan-nusantara'
              ? 'Masakan Nusantara'
              : deal.category === 'salad'
                ? 'Salad'
                : 'Sup'
          return label === activeCategory
        })

  return (
    <PageWrapper>
      <div className="sticky top-14 z-30 bg-fog/90 backdrop-blur-sm px-4 py-3 border-b border-cream flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft size={20} className="text-soil" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-harvest/10 flex items-center justify-center">
            <UtensilsCrossed size={18} className="text-harvest" />
          </div>
          <div>
            <h1 className="font-display text-section text-soil leading-tight">Resto Deals</h1>
            <p className="text-[10px] text-earth/60">Diskon spesial dari resto & UMKM mitra</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="bg-harvest/10 border border-harvest/20 rounded-lg p-3 mb-4">
          <p className="text-caption text-earth leading-relaxed">
            Nexira menjalin kerjasama dengan restoran & UMKM lokal. Nikmati makanan jadi dengan{' '}
            <span className="font-semibold text-harvest">harga spesial</span> yang lebih murah dari
            harga aslinya.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-pill text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? 'bg-soil text-cream'
                  : 'bg-cream text-earth hover:bg-harvest/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {filteredDeals.map((deal) => (
            <RestoDealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}