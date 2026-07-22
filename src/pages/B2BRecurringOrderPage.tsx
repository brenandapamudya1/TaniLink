import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, CheckCircle } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { RecurringOrderCard } from '@/components/ui/RecurringOrderCard'
import type { RecurringOrder } from '@/types/b2b'

const initialOrders: RecurringOrder[] = [
  {
    id: 'recur-001',
    name: 'Pesanan Mingguan',
    days: ['Senin', 'Kamis'],
    items: [
      { productId: 'b2b-tomat', productName: 'Tomat Merah Grade A', quantity: 100, unit: 'kg' },
      { productId: 'b2b-sawi', productName: 'Sawi Hijau Grade A', quantity: 50, unit: 'kg' },
      { productId: 'b2b-wortel', productName: 'Wortel Baby Grade A', quantity: 75, unit: 'kg' },
    ],
    active: true,
    createdAt: '2026-06-01',
  },
  {
    id: 'recur-002',
    name: 'Pesanan Bulanan',
    days: ['Senin'],
    items: [
      { productId: 'b2b-beras', productName: 'Beras Merah Organik Grade A', quantity: 2, unit: 'karung' },
    ],
    active: false,
    createdAt: '2026-05-15',
  },
]

const allDays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

export default function B2BRecurringOrderPage() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState(initialOrders)
  const [showForm, setShowForm] = useState(false)
  const [tab, setTab] = useState<'aktif' | 'riwayat'>('aktif')
  const [formName, setFormName] = useState('')
  const [formDays, setFormDays] = useState<string[]>([])
  const [confirmed, setConfirmed] = useState(false)

  const filteredOrders = tab === 'aktif' ? orders.filter((o) => o.active) : orders

  const handleToggle = (orderId: string, active: boolean) => {
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, active } : o))
  }

  const handleCreate = () => {
    setConfirmed(true)
    setTimeout(() => {
      setConfirmed(false)
      setShowForm(false)
      setFormName('')
      setFormDays([])
    }, 2000)
  }

  if (confirmed) {
    return (
      <PageWrapper>
        <div className="px-4 py-6 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 rounded-full bg-leaf/10 flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-leaf" />
          </div>
          <h2 className="font-display text-title text-soil text-center mb-2">
            Pesanan Berulang Berhasil Dibuat!
          </h2>
          <p className="text-caption text-earth text-center">Pesanan akan aktif sesuai jadwal</p>
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
            <h1 className="font-display text-title text-soil mb-1">Pesanan Berulang</h1>
            <p className="text-body text-earth">Atur pesanan rutin bisnismu</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="w-10 h-10 rounded-full bg-harvest flex items-center justify-center hover:brightness-105 transition-all"
            aria-label="Buat pesanan berulang"
          >
            <Plus size={20} className="text-soil" />
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {(['aktif', 'riwayat'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-pill text-caption font-semibold transition-colors ${
                tab === t ? 'bg-leaf text-cream' : 'border border-earth/30 text-earth hover:bg-cream'
              }`}
            >
              {t === 'aktif' ? 'Aktif' : 'Riwayat'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <RecurringOrderCard
              key={order.id}
              order={order}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
            <div className="absolute inset-0 bg-soil/50" onClick={() => setShowForm(false)} />
            <div className="relative bg-fog rounded-t-xl w-full max-w-[430px] max-h-[80vh] overflow-y-auto shadow-hero p-6">
              <h3 className="font-semibold text-soil text-base mb-4">Buat Pesanan Berulang</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-caption font-semibold text-earth mb-1.5">Nama Pesanan</label>
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Pesanan Mingguan"
                    className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil text-sm"
                  />
                </div>

                <div>
                  <label className="block text-caption font-semibold text-earth mb-1.5">Hari</label>
                  <div className="flex flex-wrap gap-2">
                    {allDays.map((day) => (
                      <button
                        key={day}
                        onClick={() => setFormDays((prev) =>
                          prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
                        )}
                        className={`px-3 py-1.5 rounded-pill text-caption font-semibold border transition-colors ${
                          formDays.includes(day)
                            ? 'border-harvest bg-harvest/10 text-harvest'
                            : 'border-cream text-earth'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCreate}
                  disabled={!formName || formDays.length === 0}
                  className={`w-full py-3 rounded-pill font-bold text-sm transition-all ${
                    formName && formDays.length > 0
                      ? 'bg-harvest text-soil shadow-cta hover:brightness-105'
                      : 'bg-cream text-earth/50 cursor-not-allowed'
                  }`}
                >
                  Buat Pesanan Berulang
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
