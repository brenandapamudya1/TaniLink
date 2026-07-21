import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ScanLine, CheckCircle } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { GradingPanel } from '@/components/ui/GradingPanel'
import { pickupTasks } from '@/data/pickupTasks'
import type { ProductCondition } from '@/types/distributor'

type Step = 'qr' | 'verification' | 'confirm'

export default function PickupVerificationPage() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('qr')
  const [actualWeight, setActualWeight] = useState(0)
  const [condition, setCondition] = useState<ProductCondition>('baik')
  const [confirmed, setConfirmed] = useState(false)

  const task = pickupTasks.find((t) => t.id === taskId)

  if (!task) {
    return (
      <PageWrapper>
        <div className="px-4 py-6">
          <p className="text-soil">Tugas tidak ditemukan</p>
        </div>
      </PageWrapper>
    )
  }

  const handleConfirm = () => {
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <PageWrapper>
        <div className="px-4 py-6 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 rounded-full bg-leaf/10 flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-leaf" />
          </div>
          <h2 className="font-display text-title text-soil text-center mb-2">
            Pengambilan Berhasil Dikonfirmasi!
          </h2>
          <p className="text-caption text-earth text-center mb-8">
            Tugas #{taskId} telah selesai
          </p>

          <div className="w-full bg-fog rounded-lg shadow-card p-5 mb-8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-caption text-earth">Petani</span>
              <span className="font-semibold text-soil">{task.farmerName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-caption text-earth">Berat Aktual</span>
              <span className="font-semibold text-soil">{actualWeight} kg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-caption text-earth">Kondisi</span>
              <span className={`font-semibold ${
                condition === 'baik' ? 'text-leaf' : condition === 'sedang' ? 'text-harvest' : 'text-red-500'
              }`}>{condition}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-cream">
              <span className="text-caption text-earth">Lokasi</span>
              <span className="font-semibold text-soil text-right max-w-[180px]">{task.farmerLocation}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/dashboard-distributor')}
            className="w-full py-3.5 rounded-pill bg-harvest text-soil font-bold text-base shadow-cta hover:brightness-105 active:scale-95 transition-all"
          >
            Kembali ke Dashboard
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

        <h1 className="font-display text-title text-soil mb-1">Verifikasi Pengambilan</h1>
        <p className="text-body text-earth mb-2">Tugas #{taskId}</p>

        <div className="flex items-center gap-2 mb-6">
          {(['qr', 'verification', 'confirm'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step === s ? 'bg-harvest text-soil' : 'bg-cream text-earth'
              }`}>
                {i + 1}
              </div>
              {i < 2 && <div className="w-8 h-0.5 bg-cream" />}
            </div>
          ))}
        </div>

        {step === 'qr' && (
          <div className="flex flex-col items-center py-8">
            <div className="w-48 h-48 bg-cream rounded-xl flex items-center justify-center mb-6 border-2 border-dashed border-earth/30">
              <ScanLine size={64} className="text-earth/40" />
            </div>
            <p className="font-semibold text-soil text-base mb-2">Scan QR Petani</p>
            <p className="text-caption text-earth text-center mb-6">
              Arahkan kamera ke QR Code petani<br />
              untuk memverifikasi identitas
            </p>
            <button
              onClick={() => setStep('verification')}
              className="px-8 py-3 rounded-pill bg-harvest text-soil font-bold text-base shadow-cta hover:brightness-105 active:scale-95 transition-all"
            >
              Simulasi Scan
            </button>
          </div>
        )}

        {step === 'verification' && (
          <div className="space-y-4">
            <div className="bg-fog rounded-lg shadow-card p-4">
              <h3 className="font-semibold text-soil text-sm mb-2">Informasi Pesanan</h3>
              <p className="text-caption text-earth mb-1">
                Petani: <span className="font-semibold text-soil">{task.farmerName}</span>
              </p>
              <p className="text-caption text-earth mb-1">
                Lokasi: {task.farmerLocation}
              </p>
              <p className="text-caption text-earth">
                Total pesanan: <span className="font-semibold text-soil">{task.totalWeight} kg</span>
              </p>
            </div>

            <div className="bg-fog rounded-lg shadow-card p-4">
              <h3 className="font-semibold text-soil text-sm mb-3">Berat Aktual</h3>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={0}
                  value={actualWeight || ''}
                  onChange={(e) => setActualWeight(Number(e.target.value))}
                  placeholder="0"
                  className="flex-1 px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil text-lg font-mono font-bold"
                />
                <span className="font-semibold text-earth">kg</span>
              </div>
              {actualWeight > 0 && (
                <p className={`text-caption mt-2 ${
                  actualWeight === task.totalWeight
                    ? 'text-leaf'
                    : Math.abs(actualWeight - task.totalWeight) < 5
                      ? 'text-harvest'
                      : 'text-red-500'
                }`}>
                  Selisih: {actualWeight - task.totalWeight} kg
                </p>
              )}
            </div>

            {task.items.map((item, i) => (
              <GradingPanel
                key={i}
                productName={item.name}
              />
            ))}

            <div className="bg-fog rounded-lg shadow-card p-4">
              <h3 className="font-semibold text-soil text-sm mb-2">Kondisi Produk</h3>
              <div className="flex gap-2">
                {(['baik', 'sedang', 'rusak'] as ProductCondition[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCondition(c)}
                    className={`px-4 py-1.5 rounded-pill text-caption font-semibold border transition-colors ${
                      condition === c
                        ? 'border-harvest bg-harvest/10 text-harvest'
                        : 'border-cream text-earth hover:border-harvest/50'
                    }`}
                  >
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep('confirm')}
              className="w-full py-3.5 rounded-pill bg-harvest text-soil font-bold text-base shadow-cta hover:brightness-105 active:scale-95 transition-all"
            >
              Lanjut ke Konfirmasi
            </button>
          </div>
        )}

        {step === 'confirm' && (
          <div className="flex flex-col items-center py-8">
            <div className="w-20 h-20 rounded-full bg-leaf/10 flex items-center justify-center mb-6">
              <CheckCircle size={48} className="text-leaf" />
            </div>
            <h2 className="font-display text-section text-soil text-center mb-2">
              Konfirmasi Pengambilan
            </h2>
            <p className="text-caption text-earth text-center mb-2">
              Pastikan semua data sudah benar
            </p>
            <div className="bg-fog rounded-lg shadow-card p-4 w-full mb-6 space-y-1 text-caption text-earth">
              <p>Berat aktual: <span className="font-semibold text-soil">{actualWeight} kg</span></p>
              <p>Kondisi: <span className="font-semibold text-soil">{condition}</span></p>
              <p>Petani: <span className="font-semibold text-soil">{task.farmerName}</span></p>
              <p>Lokasi: <span className="font-semibold text-soil">{task.farmerLocation}</span></p>
            </div>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setStep('verification')}
                className="flex-1 py-3 rounded-pill border border-cream text-earth font-semibold text-sm hover:bg-cream transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-pill bg-harvest text-soil font-bold text-sm shadow-cta hover:brightness-105 active:scale-95 transition-all"
              >
                Konfirmasi Pengambilan
              </button>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
