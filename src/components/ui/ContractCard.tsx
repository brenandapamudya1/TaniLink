import { Clock, CheckCircle } from 'lucide-react'
import type { Contract } from '@/types/b2b'

interface ContractCardProps {
  contract: Contract
  onAccept?: (contractId: string) => void
}

const statusColors: Record<string, string> = {
  aktif: 'bg-leaf/10 text-leaf',
  berakhir: 'bg-earth/10 text-earth',
  diajukan: 'bg-harvest/10 text-harvest',
}

export function ContractCard({ contract, onAccept }: ContractCardProps) {
  const start = contract.startDate ? new Date(contract.startDate) : null
  const end = contract.endDate ? new Date(contract.endDate) : null
  const totalDays = start && end ? Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) : 0
  const elapsedDays = start ? Math.round((Date.now() - start.getTime()) / (1000 * 60 * 60 * 24)) : 0
  const progress = totalDays > 0 ? Math.min(100, Math.round((elapsedDays / totalDays) * 100)) : 0

  return (
    <div className="bg-fog rounded-lg shadow-card p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-soil text-sm">{contract.productName}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-pill ${
              contract.grade === 'A' ? 'bg-leaf/10 text-leaf' : 'bg-earth/10 text-earth'
            }`}>
              Grade {contract.grade}
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-pill ${statusColors[contract.status]}`}>
              {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
            </span>
          </div>
        </div>
        <span className="font-mono font-bold text-sm text-soil">
          Rp{contract.pricePerKg.toLocaleString()}/kg
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3 text-caption">
        <div>
          <span className="text-earth">Volume</span>
          <p className="font-semibold text-soil">{contract.volumePerWeek} {contract.unit}/minggu</p>
        </div>
        <div>
          <span className="text-earth">Durasi</span>
          <p className="font-semibold text-soil">{contract.duration}</p>
        </div>
      </div>

      {contract.farmerName && (
        <div className="mb-3 text-caption">
          <span className="text-earth">Petani Mitra</span>
          <p className="font-semibold text-soil">{contract.farmerName}</p>
        </div>
      )}

      {contract.status === 'aktif' && totalDays > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-caption text-earth mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
            <div className="h-full bg-harvest rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {contract.status === 'aktif' && contract.endDate && (
        <div className="flex items-center gap-1.5 text-caption text-earth">
          <Clock size={12} />
          <span>Berakhir: {contract.endDate}</span>
        </div>
      )}

      {contract.status === 'diajukan' && (
        <button
          onClick={() => onAccept?.(contract.id)}
          className="w-full mt-3 py-2.5 rounded-pill bg-harvest text-soil font-semibold text-sm hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle size={16} />
          Terima Kontrak
        </button>
      )}
    </div>
  )
}
