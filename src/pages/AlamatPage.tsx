import { MapPin, Phone, User, Plus } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'

export default function AlamatPage() {
  const handleTambah = () => {
    alert('Fitur tambah alamat akan segera hadir!')
  }

  return (
    <PageWrapper>
      <div className="px-4 py-6">
        <h1 className="font-display text-title text-soil mb-6">Alamat Pengiriman</h1>

        <div className="bg-fog rounded-lg shadow-card p-4 border-l-4 border-harvest">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-pill bg-harvest text-soil text-caption font-semibold">
                Utama
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <User size={16} className="text-earth flex-shrink-0" />
            <span className="text-soil font-semibold text-sm">Budi Santoso</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Phone size={16} className="text-earth flex-shrink-0" />
            <span className="text-soil text-sm">0812-3456-7890</span>
          </div>

          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-earth flex-shrink-0 mt-0.5" />
            <p className="text-soil text-sm leading-relaxed">
              Jl. Melati No. 45, RT 03/RW 07, Kel. Sukamaju, Kec. Cilandak,
              Jakarta Selatan, DKI Jakarta 12430
            </p>
          </div>
        </div>

        <button
          onClick={handleTambah}
          className="w-full mt-4 py-3 rounded-lg border-2 border-dashed border-earth/30 text-earth font-semibold text-sm hover:border-harvest hover:text-harvest transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Tambah Alamat Baru
        </button>
      </div>
    </PageWrapper>
  )
}
