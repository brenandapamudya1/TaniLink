import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, CheckCircle } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import type { B2BUnit, RFQItem } from '@/types/b2b'

const unitOptions: B2BUnit[] = ['kg', 'karung', 'box', 'ton']

export default function B2BRFQPage() {
  const navigate = useNavigate()
  const [deadline, setDeadline] = useState('')
  const [notes, setNotes] = useState('')
  const [items, setItems] = useState<RFQItem[]>([
    { productName: '', grade: 'A', quantity: 0, unit: 'kg' },
  ])
  const [confirmed, setConfirmed] = useState(false)

  const addItem = () => {
    setItems([...items, { productName: '', grade: 'A', quantity: 0, unit: 'kg' }])
  }

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx))
  }

  const updateItem = (idx: number, field: keyof RFQItem, value: string | number) => {
    setItems(items.map((item, i) => i === idx ? { ...item, [field]: value } : item))
  }

  const handleSubmit = () => {
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
            RFQ Berhasil Dikirim!
          </h2>
          <p className="text-caption text-earth text-center mb-8">
            Permintaan akan dicarikan oleh petani mitra
          </p>
          <button
            onClick={() => navigate('/dashboard-b2b')}
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

        <h1 className="font-display text-title text-soil mb-1">Ajukan RFQ</h1>
        <p className="text-body text-earth mb-6">Minta penawaran dari petani mitra</p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-caption font-semibold text-earth mb-1.5">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-caption font-semibold text-earth">Item</label>
              <button onClick={addItem} className="flex items-center gap-1 text-caption font-semibold text-harvest hover:brightness-105 transition-all">
                <Plus size={14} /> Tambah Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="bg-cream rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-caption font-semibold text-earth">Item #{i + 1}</span>
                    {items.length > 1 && (
                      <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 transition-colors" aria-label="Hapus item">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <input
                      value={item.productName}
                      onChange={(e) => updateItem(i, 'productName', e.target.value)}
                      placeholder="Nama produk"
                      className="w-full px-3 py-2 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil text-sm"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex gap-1">
                        {(['A', 'B', 'C'] as const).map((g) => (
                          <button key={g} onClick={() => updateItem(i, 'grade', g)} className={`px-2 py-1 rounded text-[10px] font-semibold border transition-colors ${item.grade === g ? 'border-harvest bg-harvest/10 text-harvest' : 'border-cream text-earth'}`}>{g}</button>
                        ))}
                      </div>
                      <input
                        type="number"
                        value={item.quantity || ''}
                        onChange={(e) => updateItem(i, 'quantity', Number(e.target.value))}
                        placeholder="0"
                        className="w-full px-2 py-2 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil text-sm text-center"
                      />
                      <select
                        value={item.unit}
                        onChange={(e) => updateItem(i, 'unit', e.target.value)}
                        className="px-2 py-2 rounded-lg border border-cream text-caption font-semibold text-soil bg-cream outline-none focus:border-harvest"
                      >
                        {unitOptions.map((u) => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-caption font-semibold text-earth mb-1.5">Catatan</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Catatan tambahan..."
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil text-sm placeholder:text-earth/50 resize-none"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!deadline || items.some((i) => !i.productName || i.quantity <= 0)}
          className={`w-full py-3.5 rounded-pill font-bold text-base transition-all ${
            deadline && items.every((i) => i.productName && i.quantity > 0)
              ? 'bg-harvest text-soil shadow-cta hover:brightness-105 active:scale-95'
              : 'bg-cream text-earth/50 cursor-not-allowed'
          }`}
        >
          Kirim RFQ
        </button>
      </div>
    </PageWrapper>
  )
}
