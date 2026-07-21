import { Bike, Car, Truck, Check, Building2 } from 'lucide-react'
import type { Vehicle } from '@/types/vehicle'

interface VehicleCardProps {
  vehicle: Vehicle
  selected?: boolean
  onSelect?: (vehicle: Vehicle) => void
}

const iconMap = {
  Bike,
  Car,
  Truck,
}

const statusColors: Record<string, string> = {
  tersedia: 'bg-leaf/10 text-leaf',
  digunakan: 'bg-harvest/10 text-harvest',
  perbaikan: 'bg-red-100 text-red-600',
}

const statusLabels: Record<string, string> = {
  tersedia: 'Tersedia',
  digunakan: 'Digunakan',
  perbaikan: 'Perbaikan',
}

export function VehicleCard({ vehicle, selected, onSelect }: VehicleCardProps) {
  const Icon = iconMap[vehicle.icon as keyof typeof iconMap] || Truck

  return (
    <button
      onClick={() => onSelect?.(vehicle)}
      className={`relative w-full flex flex-col items-start p-4 rounded-lg border-2 transition-all text-left ${
        selected
          ? 'border-harvest bg-harvest/5'
          : 'border-cream bg-fog hover:border-harvest/50'
      }`}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-harvest flex items-center justify-center">
          <Check size={14} className="text-soil" />
        </div>
      )}

      <Icon size={36} className={`mb-3 ${selected ? 'text-harvest' : 'text-earth'}`} />

      <div className="flex items-center gap-2 mb-2 w-full">
        <h3 className="font-semibold text-soil text-base">{vehicle.name}</h3>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-pill ${
          vehicle.type === 'pribadi' ? 'bg-blue-100 text-blue-600' : 'bg-harvest/10 text-harvest'
        }`}>
          {vehicle.type === 'pribadi' ? 'Pribadi' : 'Rental'}
        </span>
      </div>

      {vehicle.type === 'rental' && vehicle.rentalCompany && (
        <div className="flex items-center gap-1.5 mb-2 text-caption text-earth">
          <Building2 size={12} />
          <span>{vehicle.rentalCompany}</span>
        </div>
      )}

      <div className="space-y-1.5 w-full">
        <div className="flex justify-between text-caption">
          <span className="text-earth">Kapasitas</span>
          <span className="font-semibold text-soil">{vehicle.capacityLabel}</span>
        </div>
        <div className="flex justify-between text-caption">
          <span className="text-earth">Jarak</span>
          <span className="font-semibold text-soil">{vehicle.range}</span>
        </div>
        <div className="flex justify-between text-caption">
          <span className="text-earth">Cocok</span>
          <span className="font-semibold text-soil text-right max-w-[140px]">{vehicle.suitableFor}</span>
        </div>
        {vehicle.type === 'rental' && vehicle.rentalFee !== undefined && (
          <div className="flex justify-between text-caption pt-1 border-t border-cream">
            <span className="text-earth">Biaya Rental</span>
            <span className="font-mono font-bold text-sm text-harvest">Rp {vehicle.rentalFee.toLocaleString('id-ID')}/hari</span>
          </div>
        )}
        {vehicle.type === 'pribadi' && (
          <div className="flex justify-between text-caption pt-1 border-t border-cream">
            <span className="text-earth">Biaya</span>
            <span className="font-semibold text-sm text-leaf">Gratis</span>
          </div>
        )}
      </div>

      <div className={`mt-3 text-[10px] font-semibold px-2 py-0.5 rounded-pill ${statusColors[vehicle.status]}`}>
        {statusLabels[vehicle.status]}
      </div>
    </button>
  )
}
