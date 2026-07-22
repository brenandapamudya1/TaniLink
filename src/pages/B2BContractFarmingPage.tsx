import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Plus, X } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ContractCard } from '@/components/ui/ContractCard'
import { contracts, proposedContracts } from '@/data/b2bContracts'
import type { Contract } from '@/types/b2b'

export default function B2BContractFarmingPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'aktif' | 'ajukan'>('aktif')
  const [activeContracts, setActiveContracts] = useState<Contract[]>([...contracts, ...proposedContracts])
  const [showForm, setShowForm] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [formProduct, setFormProduct] = useState('')
  const [formGrade, setFormGrade] = useState<'A' | 'B' | 'C'>('A')
  const [formVolume, setFormVolume] = useState(0)
  const [formDuration, setFormDuration] = useState('3 bulan')
  const [formPrice, setFormPrice] = useState(0)

  const handleAccept = (contractId: string) => {
    setActiveContracts((prev) =>
      prev.map((c) => c.id === contractId ? { ...c, status: 'aktif' as const } : c)
    )
    setConfirmed(true)
    setTimeout(() => setConfirmed(false), 2000)
  }

  const handleSubmitAjuan = () => {
    const newContract: Contract = {
      id: `kontrak-${Date.now()}`,
      productName: formProduct,
      grade: formGrade,
      volumePerWeek: formVolume,
      unit: 'kg',
      duration: formDuration,
      pricePerKg: formPrice,
      status: 'diajukan',
    }
    setActiveContracts((prev) => [newContract, ...prev])
    setShowForm(false)
    setConfirmed(true)
    setTimeout(() => setConfirmed(false), 2000)
    setFormProduct('')
    setFormVolume(0)
    setFormPrice(0)
  }

  if (confirmed) {
    return (
      <PageWrapper>
        <div className="px-4 py-6 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 rounded-full bg-leaf/10 flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-leaf" />
          </div>
          <h2 className="font-display text-title text-soil text-center mb-2">
            Kontrak Berhasil Diproses!
          </h2>
          <p className="text-caption text-earth text-center">Kontrak akan ditinjau oleh petani mitra</p>
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

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-title text-soil mb-1">Kontrak Tani</h1>
            <p className="text-body text-earth">Kontrak pasokan langsung dengan petani</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="w-10 h-10 rounded-full bg-harvest flex items-center justify-center hover:brightness-105 transition-all"
            aria-label="Ajukan kontrak"
          >
            <Plus size={20} className="text-soil" />
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {(['aktif', 'ajukan'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-pill text-caption font-semibold transition-colors ${
                tab === t ? 'bg-leaf text-cream' : 'border border-earth/30 text-earth hover:bg-cream'
              }`}
            >
              {t === 'aktif' ? 'Kontrak Aktif' : 'Ajukan Baru'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {(tab === 'aktif'
            ? activeContracts.filter((c) => c.status !== 'diajukan')
            : activeContracts.filter((c) => c.status === 'diajukan')
          ).map((contract) => (
            <ContractCard
              key={contract.id}
              contract={contract}
              onAccept={tab === 'ajukan' ? handleAccept : undefined}
            />
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
            <div className="absolute inset-0 bg-soil/50" onClick={() => setShowForm(false)} />
            <div className="relative bg-fog rounded-t-xl w-full max-w-[430px] max-h-[80vh] overflow-y-auto shadow-hero p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-soil text-base">Ajukan Kontrak Baru</h3>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-cream">
                  <X size={18} className="text-earth" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-caption font-semibold text-earth mb-1.5">Nama Produk</label>
                  <input value={formProduct} onChange={(e) => setFormProduct(e.target.value)} placeholder="Tomat Merah" className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil text-sm" />
                </div>

                <div>
                  <label className="block text-caption font-semibold text-earth mb-1.5">Grade</label>
                  <div className="flex gap-2">
                    {(['A', 'B', 'C'] as const).map((g) => (
                      <button key={g} onClick={() => setFormGrade(g)} className={`px-4 py-1.5 rounded-pill text-caption font-semibold border transition-colors ${formGrade === g ? 'border-harvest bg-harvest/10 text-harvest' : 'border-cream text-earth'}`}>
                        Grade {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-caption font-semibold text-earth mb-1.5">Volume/minggu (kg)</label>
                    <input type="number" value={formVolume || ''} onChange={(e) => setFormVolume(Number(e.target.value))} placeholder="500" className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil text-sm" />
                  </div>
                  <div>
                    <label className="block text-caption font-semibold text-earth mb-1.5">Durasi</label>
                    <select value={formDuration} onChange={(e) => setFormDuration(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil text-sm bg-fog">
                      <option>3 bulan</option>
                      <option>6 bulan</option>
                      <option>12 bulan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-caption font-semibold text-earth mb-1.5">Harga (Rp/kg)</label>
                  <input type="number" value={formPrice || ''} onChange={(e) => setFormPrice(Number(e.target.value))} placeholder="12000" className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil text-sm" />
                </div>

                <button onClick={handleSubmitAjuan} disabled={!formProduct || formVolume <= 0 || formPrice <= 0} className={`w-full py-3 rounded-pill font-bold text-sm transition-all ${formProduct && formVolume > 0 && formPrice > 0 ? 'bg-harvest text-soil shadow-cta hover:brightness-105' : 'bg-cream text-earth/50 cursor-not-allowed'}`}>
                  Ajukan Kontrak
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
