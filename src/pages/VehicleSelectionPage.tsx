import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Building2 } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { VehicleCard } from '@/components/ui/VehicleCard'
import { vehicles } from '@/data/vehicles'
import type { Vehicle } from '@/types/vehicle'

const pribadiVehicles = vehicles.filter((v) => v.type === 'pribadi')
const rentalVehicles = vehicles.filter((v) => v.type === 'rental')

export default function VehicleSelectionPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<Vehicle | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  const handleSelect = (vehicle: Vehicle) => {
    if (vehicle.status === 'perbaikan') return
    setSelected(vehicle)
  }

  const handleConfirm = () => {
    if (selected) {
      setConfirmed(true)
    }
  }

  if (confirmed && selected) {
    return (
      <PageWrapper>
        <div className="px-4 py-6 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 rounded-full bg-leaf/10 flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-leaf" />
          </div>
          <h2 className="font-display text-title text-soil text-center mb-2">
            Kendaraan Berhasil Dipilih!
          </h2>
          <p className="text-caption text-earth text-center mb-8">
            Kendaraan siap digunakan untuk operasional hari ini
          </p>

          <div className="w-full bg-fog rounded-lg shadow-card p-5 mb-8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-caption text-earth">Kendaraan</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-soil">{selected.name}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-pill ${
                  selected.type === 'pribadi' ? 'bg-blue-100 text-blue-600' : 'bg-harvest/10 text-harvest'
                }`}>
                  {selected.type === 'pribadi' ? 'Pribadi' : 'Rental'}
                </span>
              </div>
            </div>
            {selected.type === 'rental' && selected.rentalCompany && (
              <div className="flex items-center justify-between">
                <span className="text-caption text-earth">Mitra Rental</span>
                <div className="flex items-center gap-1.5">
                  <Building2 size={12} className="text-earth" />
                  <span className="font-semibold text-soil text-sm">{selected.rentalCompany}</span>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-caption text-earth">Kapasitas</span>
              <span className="font-semibold text-soil">{selected.capacityLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-caption text-earth">Jarak</span>
              <span className="font-semibold text-soil">{selected.range}</span>
            </div>
            {selected.type === 'rental' && selected.rentalFee !== undefined && (
              <div className="flex items-center justify-between pt-2 border-t border-cream">
                <span className="text-caption text-earth">Biaya Rental</span>
                <span className="font-mono font-bold text-sm text-harvest">Rp {selected.rentalFee.toLocaleString('id-ID')}/hari</span>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/dashboard-distributor')}
            className="w-full py-3.5 rounded-pill bg-harvest text-soil font-bold text-base shadow-cta hover:brightness-105 active:scale-95 transition-all"
          >
            Lanjut ke Dashboard
          </button>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors mb-4"
          aria-label="Kembali"
        >
          <ArrowLeft size={20} className="text-soil" />
        </button>

        <h1 className="font-display text-title text-soil mb-1">Pilih Kendaraan</h1>
        <p className="text-body text-earth mb-6">Pilih kendaraan untuk operasional hari ini</p>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-cream text-[10px] font-bold">P</span>
            </div>
            <h2 className="font-semibold text-soil text-sm">Kendaraan Pribadi</h2>
            <span className="text-[10px] text-leaf font-semibold">Gratis</span>
          </div>
          <div className="space-y-3">
            {pribadiVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                selected={selected?.id === vehicle.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-harvest flex items-center justify-center">
              <Building2 size={12} className="text-soil" />
            </div>
            <h2 className="font-semibold text-soil text-sm">Kendaraan Rental</h2>
            <span className="text-[10px] text-harvest font-semibold">Mitra TaniLink</span>
          </div>
          <p className="text-caption text-earth mb-3 ml-7">
            Kerjasama dengan CV/PT mitra terpercaya
          </p>
          <div className="space-y-3">
            {rentalVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                selected={selected?.id === vehicle.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={!selected}
          className={`w-full mt-2 py-3.5 rounded-pill font-bold text-base transition-all ${
            selected
              ? 'bg-harvest text-soil shadow-cta hover:brightness-105 active:scale-95'
              : 'bg-cream text-earth/50 cursor-not-allowed'
          }`}
        >
          {selected ? `Gunakan ${selected.name}` : 'Pilih kendaraan terlebih dahulu'}
        </button>
      </div>
    </PageWrapper>
  )
}
