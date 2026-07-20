import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Globe, Moon, Bell, User, Trash2, Info, ArrowLeft } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'

interface ToggleRowProps {
  icon: typeof Globe
  label: string
  description?: string
  value: boolean
  onChange: (val: boolean) => void
}

function ToggleRow({ icon: Icon, label, description, value, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <Icon size={20} className="text-harvest flex-shrink-0" />
        <div>
          <p className="text-soil font-semibold text-sm">{label}</p>
          {description && <p className="text-caption text-earth">{description}</p>}
        </div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-harvest' : 'bg-earth/30'
          }`}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0'
            }`}
        />
      </button>
    </div>
  )
}

export default function PengaturanPage() {
  const navigate = useNavigate()
  const [bahasa, setBahasa] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [notifPush, setNotifPush] = useState(true)

  const handleKelolaAkun = () => {
    alert('Fitur kelola akun akan segera hadir!')
  }

  const handleHapusAkun = () => {
    alert('Fitur hapus akun akan segera hadir!')
  }

  return (
    <PageWrapper>
      <div className="sticky top-14 z-30 bg-fog px-4 py-3 border-b border-cream flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft size={20} className="text-soil" />
        </button>
        <h1 className="font-display text-section text-soil">Pengaturan</h1>
      </div>

      <div className="px-4 py-6">
        <div className="bg-fog rounded-lg shadow-card overflow-hidden">
          <div className="px-4">
            <h2 className="text-earth text-caption font-semibold uppercase tracking-wider pt-4 pb-2">
              Preferensi
            </h2>

            <div className="divide-y divide-cream">
              <ToggleRow
                icon={Globe}
                label="Bahasa"
                description={bahasa ? 'Indonesia' : 'English'}
                value={bahasa}
                onChange={setBahasa}
              />
              <ToggleRow
                icon={Moon}
                label="Mode Gelap"
                description="Tampilan gelap untuk kenyamanan mata"
                value={darkMode}
                onChange={setDarkMode}
              />
              <ToggleRow
                icon={Bell}
                label="Notifikasi Push"
                description="Terima update pesanan & promo"
                value={notifPush}
                onChange={setNotifPush}
              />
            </div>
          </div>
        </div>

        <div className="bg-fog rounded-lg shadow-card overflow-hidden mt-4">
          <div className="px-4">
            <h2 className="text-earth text-caption font-semibold uppercase tracking-wider pt-4 pb-2">
              Akun
            </h2>

            <div className="divide-y divide-cream">
              <button
                onClick={handleKelolaAkun}
                className="w-full flex items-center gap-3 py-4"
              >
                <User size={20} className="text-harvest flex-shrink-0" />
                <span className="text-soil font-semibold text-sm flex-1 text-left">
                  Kelola Akun
                </span>
              </button>
              <button
                onClick={handleHapusAkun}
                className="w-full flex items-center gap-3 py-4"
              >
                <Trash2 size={20} className="text-red-500 flex-shrink-0" />
                <span className="text-red-500 font-semibold text-sm flex-1 text-left">
                  Hapus Akun
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-fog rounded-lg shadow-card overflow-hidden mt-4">
          <div className="px-4">
            <h2 className="text-earth text-caption font-semibold uppercase tracking-wider pt-4 pb-2">
              Tentang
            </h2>

            <div className="flex items-center gap-3 py-4">
              <Info size={20} className="text-harvest flex-shrink-0" />
              <div className="flex-1">
                <p className="text-soil font-semibold text-sm">Versi Aplikasi</p>
                <p className="text-caption text-earth">TaniLink v0.1.0 — Phase 0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
