import { useState } from 'react'
import { Camera } from 'lucide-react'
import type { ProductCondition } from '@/types/distributor'

interface GradingPanelProps {
  productName: string
  onGradeChange?: (grades: { a: number; b: number; c: number; condition: ProductCondition; notes: string }) => void
}

export function GradingPanel({ productName, onGradeChange }: GradingPanelProps) {
  const [gradeA, setGradeA] = useState(0)
  const [gradeB, setGradeB] = useState(0)
  const [gradeC, setGradeC] = useState(0)
  const [condition, setCondition] = useState<ProductCondition>('baik')
  const [notes, setNotes] = useState('')

  const handleChange = () => {
    onGradeChange?.({ a: gradeA, b: gradeB, c: gradeC, condition, notes })
  }

  return (
    <div className="bg-fog rounded-lg shadow-card p-4 space-y-4">
      <h4 className="font-semibold text-soil text-sm">Pre-check: {productName}</h4>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-caption font-semibold text-leaf mb-1">Grade A</label>
          <input
            type="number"
            min={0}
            value={gradeA}
            onChange={(e) => { setGradeA(Number(e.target.value)); handleChange() }}
            className="w-full px-3 py-2 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil text-sm"
            placeholder="kg"
          />
        </div>
        <div>
          <label className="block text-caption font-semibold text-earth mb-1">Grade B</label>
          <input
            type="number"
            min={0}
            value={gradeB}
            onChange={(e) => { setGradeB(Number(e.target.value)); handleChange() }}
            className="w-full px-3 py-2 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil text-sm"
            placeholder="kg"
          />
        </div>
        <div>
          <label className="block text-caption font-semibold text-earth/50 mb-1">Grade C</label>
          <input
            type="number"
            min={0}
            value={gradeC}
            onChange={(e) => { setGradeC(Number(e.target.value)); handleChange() }}
            className="w-full px-3 py-2 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil text-sm"
            placeholder="kg"
          />
        </div>
      </div>

      <div>
        <label className="block text-caption font-semibold text-earth mb-2">Kondisi</label>
        <div className="flex gap-2">
          {(['baik', 'sedang', 'rusak'] as ProductCondition[]).map((c) => (
            <button
              key={c}
              onClick={() => { setCondition(c); handleChange() }}
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

      <div>
        <label className="block text-caption font-semibold text-earth mb-2">Foto Produk</label>
        <button
          onClick={() => alert('Fitur foto akan segera hadir!')}
          className="w-full py-3 rounded-lg border-2 border-dashed border-cream text-earth text-sm font-semibold flex items-center justify-center gap-2 hover:border-harvest/50 transition-colors"
        >
          <Camera size={18} />
          Ambil Foto
        </button>
      </div>

      <div>
        <label className="block text-caption font-semibold text-earth mb-2">Catatan</label>
        <textarea
          value={notes}
          onChange={(e) => { setNotes(e.target.value); handleChange() }}
          placeholder="Catatan kondisi produk..."
          rows={2}
          className="w-full px-3 py-2 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil text-sm placeholder:text-earth/50 resize-none"
        />
      </div>
    </div>
  )
}
