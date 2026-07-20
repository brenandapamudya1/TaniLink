import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { categories } from '@/data/categories'

export default function UploadProdukPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    harvestDate: '',
    description: '',
    grade: 'A',
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Produk berhasil diupload! (dummy)')
    navigate('/dashboard-petani')
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
        <h1 className="font-display text-section text-soil">Upload Produk</h1>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-5 pb-32">
        <div>
          <label className="block text-sm font-semibold text-soil mb-2">Foto Produk</label>
          <div className="w-full aspect-square bg-cream rounded-lg flex flex-col items-center justify-center gap-2 border-2 border-dashed border-earth/30">
            <Camera size={32} className="text-earth/50" />
            <p className="text-caption text-earth">Tap untuk upload foto</p>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-soil mb-2">
            Nama Produk
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Contoh: Bayam Hijau Segar"
            className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil placeholder:text-earth/50"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-soil mb-2">
            Kategori
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil appearance-none"
            required
          >
            <option value="">Pilih kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-soil mb-2">
              Harga (Rp)
            </label>
            <input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder="4.500"
              className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil placeholder:text-earth/50"
              required
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-semibold text-soil mb-2">
              Stok
            </label>
            <input
              id="stock"
              type="number"
              value={formData.stock}
              onChange={(e) => handleChange('stock', e.target.value)}
              placeholder="50"
              className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil placeholder:text-earth/50"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="harvestDate" className="block text-sm font-semibold text-soil mb-2">
              Tanggal Panen
            </label>
            <input
              id="harvestDate"
              type="date"
              value={formData.harvestDate}
              onChange={(e) => handleChange('harvestDate', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil"
              required
            />
          </div>
          <div>
            <label htmlFor="grade" className="block text-sm font-semibold text-soil mb-2">
              Grade
            </label>
            <select
              id="grade"
              value={formData.grade}
              onChange={(e) => handleChange('grade', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil appearance-none"
            >
              <option value="A">Grade A (Premium)</option>
              <option value="B">Grade B (Standar)</option>
              <option value="C">Grade C (Ekonomis)</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-soil mb-2">
            Deskripsi
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Deskripsikan produk kamu..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil placeholder:text-earth/50 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-pill bg-harvest text-soil font-bold text-base shadow-cta hover:brightness-105 active:scale-95 transition-all"
        >
          Upload Produk
        </button>
      </form>
    </PageWrapper>
  )
}
