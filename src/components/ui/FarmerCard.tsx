import { MapPin, CheckCircle2 } from 'lucide-react'
import type { Farmer } from '@/types/farmer'

interface FarmerCardProps {
  farmer: Farmer
  onClick?: (farmer: Farmer) => void
}

export function FarmerCard({ farmer, onClick }: FarmerCardProps) {
  const { name, avatar, location, speciality, productCount, rating, verified } = farmer

  return (
    <article
      onClick={() => onClick?.(farmer)}
      className="
        flex items-center gap-3 p-3 bg-fog rounded-lg
        shadow-card hover:shadow-card-hover transition-shadow duration-200
        cursor-pointer
      "
    >
      <img
        src={avatar}
        alt={name}
        loading="lazy"
        className="w-14 h-14 rounded-full object-cover flex-shrink-0 bg-cream"
      />

      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <h3 className="text-soil font-semibold text-sm truncate">{name}</h3>
          {verified && <CheckCircle2 size={14} className="text-leaf flex-shrink-0" />}
        </div>
        <div className="flex items-center gap-1 text-caption text-earth">
          <MapPin size={11} />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-caption text-earth">&#11088; {rating}</span>
          <span className="text-caption text-earth">·</span>
          <span className="text-caption text-earth">{productCount} produk</span>
        </div>
      </div>

      <span className="px-2 py-1 rounded-pill bg-cream text-caption text-earth font-medium flex-shrink-0">
        {speciality[0]}
      </span>
    </article>
  )
}
