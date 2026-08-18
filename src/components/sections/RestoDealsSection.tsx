import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { RestoDealCard } from '@/components/ui/RestoDealCard'
import { b2bDeals } from '@/data/b2bDeals'

export function RestoDealsSection() {
  const navigate = useNavigate()

  const featuredDeals = b2bDeals.slice(0, 4)

  return (
    <section className="px-4 py-6 border-t border-cream">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-section text-soil">Resto Deals</h2>
        <button
          onClick={() => navigate('/resto-deals')}
          className="flex items-center gap-0.5 text-caption font-semibold text-harvest"
        >
          Lihat Semua
          <ChevronRight size={14} />
        </button>
      </div>

      <p className="text-caption text-earth mb-4">
        Makanan jadi dari resto & UMKM mitra — harga spesial kerjasama Nexira
      </p>

      <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-1">
        {featuredDeals.map((deal) => (
          <div key={deal.id} className="w-[160px] flex-shrink-0">
            <RestoDealCard deal={deal} />
          </div>
        ))}
      </div>
    </section>
  )
}