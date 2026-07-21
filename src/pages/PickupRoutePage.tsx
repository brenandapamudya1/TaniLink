import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, Package, Warehouse } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'

interface RouteNode {
  label: string
  location: string
  time: string
  items: string
}

const routeNodes: RouteNode[] = [
  { label: 'Petani A — Bu Sari', location: 'Desa Cikole, Lembang', time: '08:00', items: '3 item (90 kg)' },
  { label: 'Petani B — Pak Budi', location: 'Desa Sukamaju, Malang', time: '09:30', items: '2 item (150 kg)' },
  { label: 'Petani C — Pak Wayan', location: 'Desa Baturiti, Bali', time: '10:45', items: '2 item (40 kg)' },
]

export default function PickupRoutePage() {
  const navigate = useNavigate()

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

        <h1 className="font-display text-title text-soil mb-1">Rute Optimal Hari Ini</h1>
        <p className="text-body text-earth mb-6">Rute pengambilan paling efisien</p>

        <div className="bg-harvest/10 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Package size={18} className="text-harvest" />
            <span className="font-semibold text-soil text-sm">Grup 1</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-caption text-earth">
            <span>3 Petani</span>
            <span>280 kg</span>
            <span>Pick-up</span>
            <span>Estimasi: 4 jam</span>
          </div>
        </div>

        <div className="relative pl-8 space-y-0">
          {routeNodes.map((node, i) => (
            <div key={i} className="relative pb-8 last:pb-0">
              <div className="absolute left-0 top-2 w-5 h-5 rounded-full bg-harvest border-2 border-fog z-10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-soil" />
              </div>

              {i < routeNodes.length && (
                <div className="absolute left-[9px] top-7 bottom-0 w-0.5 bg-harvest/30" />
              )}

              <div className="bg-fog rounded-lg shadow-card p-4 ml-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-soil text-sm">{node.label}</h3>
                  <div className="flex items-center gap-1 text-caption text-harvest">
                    <Clock size={12} />
                    {node.time}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-caption text-earth mb-1">
                  <MapPin size={11} />
                  {node.location}
                </div>
                <p className="text-caption text-earth">{node.items}</p>
              </div>
            </div>
          ))}

          <div className="relative pt-2">
            <div className="absolute left-0 top-2 w-5 h-5 rounded-full bg-leaf border-2 border-fog z-10 flex items-center justify-center">
              <Warehouse size={10} className="text-cream" />
            </div>

            <div className="bg-cream rounded-lg shadow-card p-4 ml-4 border-2 border-leaf/30">
              <h3 className="font-semibold text-soil text-sm">Distribution Hub</h3>
              <p className="text-caption text-earth">Kawasan Industri Cikarang</p>
              <p className="text-caption text-earth">Estimasi tiba: 12:30</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-fog rounded-lg shadow-card p-4">
          <h3 className="font-semibold text-soil text-sm mb-2">Info Rute</h3>
          <div className="space-y-1 text-caption text-earth">
            <p>• Total jarak: ~45 km</p>
            <p>• Estimasi waktu: 4 jam 30 menit</p>
            <p>• Total kapasitas: 280 kg / 1.000 kg (Pick-up)</p>
            <p>• Pengelompokan berdasarkan lokasi & kapasitas</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
