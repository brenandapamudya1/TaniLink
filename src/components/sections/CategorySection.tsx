import { useNavigate } from 'react-router-dom'
import { Leaf, Apple, Flame, Sprout, Wheat, Package } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { categories } from '@/data/categories'

const iconMap: Record<string, LucideIcon> = {
  Leaf,
  Apple,
  Flame,
  Sprout,
  Wheat,
  Package,
}

export function CategorySection() {
  const navigate = useNavigate()

  return (
    <section className="bg-fog py-6 md:max-w-[480px] md:mx-auto">
      <div className="px-4 mb-4">
        <h2 className="font-display text-section text-soil">Kategori</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory">
        {categories.map((category) => {
          const Icon = iconMap[category.icon] || Leaf
          return (
            <button
              key={category.id}
              onClick={() => navigate(`/produk?category=${category.id}`)}
              className="flex flex-col items-center gap-2 flex-shrink-0 snap-center"
            >
              <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center">
                <Icon size={24} className="text-harvest" />
              </div>
              <span className="text-caption text-soil font-semibold whitespace-nowrap">
                {category.label}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
