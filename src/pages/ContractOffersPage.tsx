import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ContractCard } from '@/components/ui/ContractCard'
import { proposedContracts } from '@/data/b2bContracts'

export default function ContractOffersPage() {
  const navigate = useNavigate()
  const [contracts, setContracts] = useState(proposedContracts)
  const [accepted, setAccepted] = useState<string | null>(null)

  const handleAccept = (contractId: string) => {
    setContracts((prev) =>
      prev.map((c) => c.id === contractId ? { ...c, status: 'aktif' as const } : c)
    )
    setAccepted(contractId)
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

        <h1 className="font-display text-title text-soil mb-1">Tawaran Kontrak</h1>
        <p className="text-body text-earth mb-6">Kontrak dari mitra B2B untuk kamu</p>

        {accepted && (
          <div className="flex items-center gap-3 bg-leaf/10 border border-leaf/20 rounded-lg px-4 py-3 mb-4 animate-[fadeIn_0.3s_ease-out]">
            <CheckCircle size={20} className="text-leaf flex-shrink-0" />
            <p className="text-sm font-semibold text-leaf">
              Kontrak berhasil diterima!
            </p>
          </div>
        )}

        {contracts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <CheckCircle size={48} className="text-earth/30 mb-4" />
            <h3 className="font-semibold text-soil text-base mb-1">Belum ada tawaran</h3>
            <p className="text-caption text-earth text-center">
              Belum ada kontrak yang diajukan ke kamu
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {contracts.map((contract) => (
              <ContractCard
                key={contract.id}
                contract={contract}
                onAccept={handleAccept}
              />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
