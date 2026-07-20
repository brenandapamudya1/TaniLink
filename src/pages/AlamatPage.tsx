import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Phone, User, Plus, ArrowLeft, X } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'

interface Address {
  id: string
  name: string
  phone: string
  address: string
  city: string
  postalCode: string
  label: 'Utama' | 'Rumah' | 'Kantor' | 'Lainnya'
}

export default function AlamatPage() {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-001',
      name: 'Budi Santoso',
      phone: '0812-3456-7890',
      address: 'Jl. Melati No. 45, RT 03/RW 07, Kel. Sukamaju, Kec. Cilandak',
      city: 'Jakarta Selatan',
      postalCode: '12430',
      label: 'Utama',
    },
  ])

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    label: 'Rumah' as Address['label'],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      ...formData,
    }
    setAddresses([...addresses, newAddress])
    setFormData({ name: '', phone: '', address: '', city: '', postalCode: '', label: 'Rumah' })
    setShowForm(false)
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
        <h1 className="font-display text-section text-soil">Alamat Pengiriman</h1>
      </div>

      <div className="px-4 py-6">
        <div className="space-y-3 mb-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`bg-fog rounded-lg shadow-card p-4 ${
                addr.label === 'Utama' ? 'border-l-4 border-harvest' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-0.5 rounded-pill text-caption font-semibold ${
                  addr.label === 'Utama' ? 'bg-harvest text-soil' : 'bg-cream text-earth'
                }`}>
                  {addr.label}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <User size={16} className="text-earth flex-shrink-0" />
                <span className="text-soil font-semibold text-sm">{addr.name}</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-earth flex-shrink-0" />
                <span className="text-soil text-sm">{addr.phone}</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-earth flex-shrink-0 mt-0.5" />
                <p className="text-soil text-sm leading-relaxed">
                  {addr.address}, {addr.city} {addr.postalCode}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 rounded-lg border-2 border-dashed border-earth/30 text-earth font-semibold text-sm hover:border-harvest hover:text-harvest transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Tambah Alamat Baru
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-soil/50"
            onClick={() => setShowForm(false)}
          />
          <div className="relative w-full max-w-[430px] bg-fog rounded-t-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-fog px-4 py-4 border-b border-cream flex items-center justify-between">
              <h2 className="font-display text-section text-soil">Tambah Alamat</h2>
              <button
                onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
              >
                <X size={18} className="text-earth" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-4 py-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-soil mb-2">
                  Nama Penerima
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama lengkap"
                  className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil placeholder:text-earth/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-soil mb-2">
                  No. Handphone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="08xxxxxxxxxx"
                  className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil placeholder:text-earth/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-soil mb-2">
                  Alamat Lengkap
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil placeholder:text-earth/50 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-soil mb-2">
                    Kota
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Nama kota"
                    className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil placeholder:text-earth/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-soil mb-2">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="12345"
                    className="w-full px-4 py-3 rounded-lg border border-cream focus:border-harvest focus:outline-none text-soil placeholder:text-earth/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-soil mb-2">
                  Label Alamat
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Utama', 'Rumah', 'Kantor', 'Lainnya'] as const).map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setFormData({ ...formData, label })}
                      className={`py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                        formData.label === label
                          ? 'bg-harvest text-soil'
                          : 'bg-cream text-earth hover:bg-cream/80'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-pill bg-harvest text-soil font-bold text-base shadow-cta hover:brightness-105 active:scale-95 transition-all mt-6"
              >
                Simpan Alamat
              </button>
            </form>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}
