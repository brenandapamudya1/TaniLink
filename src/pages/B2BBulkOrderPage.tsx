import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, CheckCircle } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { BulkOrderItem } from '@/components/ui/BulkOrderItem'
import { b2bProducts } from '@/data/b2bProducts'

const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'sayur', label: 'Sayur' },
  { id: 'buah', label: 'Buah' },
  { id: 'bumbu', label: 'Bumbu' },
  { id: 'biji-bijian', label: 'Biji-bijian' },
]

export default function B2BBulkOrderPage() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const filtered = b2bProducts.filter((p) => {
    const matchCat = category === 'all' || p.category === category
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleConfirm = () => {
    if (filtered.length > 0) {
      setConfirmed(true)
    }
  }

  if (confirmed) {
    return (
      <PageWrapper>
        <div className="px-4 py-6 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 rounded-full bg-leaf/10 flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-leaf" />
          </div>
          <h2 className="font-display text-title text-soil text-center mb-2">
            Pesanan Bulk Berhasil Dibuat!
          </h2>
          <p className="text-caption text-earth text-center mb-8">
            Pesanan akan segera diproses oleh petani mitra
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

        <h1 className="font-display text-title text-soil mb-1">Bulk Order</h1>
        <p className="text-body text-earth mb-6">Pesan bahan baku dalam jumlah besar</p>

        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-earth" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-11 pr-4 py-3 rounded-pill bg-fog border border-cream focus:border-harvest focus:outline-none text-soil text-sm placeholder:text-earth/50"
          />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-1.5 rounded-pill text-caption font-semibold whitespace-nowrap transition-colors ${
                category === cat.id
                  ? 'bg-harvest text-soil'
                  : 'border border-earth/30 text-earth hover:bg-cream'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-3 mb-6">
          {filtered.map((product) => (
            <BulkOrderItem
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <button
          onClick={handleConfirm}
          disabled={filtered.length === 0}
          className={`w-full py-3.5 rounded-pill font-bold text-base transition-all ${
            filtered.length > 0
              ? 'bg-harvest text-soil shadow-cta hover:brightness-105 active:scale-95'
              : 'bg-cream text-earth/50 cursor-not-allowed'
          }`}
        >
          Buat Pesanan
        </button>
      </div>
    </PageWrapper>
  )
}
