import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

export function GreetingSection() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Selamat pagi'
    if (hour < 18) return 'Selamat siang'
    return 'Selamat malam'
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/produk?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="px-4 pt-6 pb-2">
      <h1 className="font-display text-title text-soil mb-1">
        {getGreeting()}, Tamu
      </h1>
      <p className="text-caption text-earth mb-4">
        Mau belanja apa hari ini?
      </p>

      <form onSubmit={handleSearch} className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-earth" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari sayur, buah, rempah..."
          className="w-full h-12 pl-11 pr-4 rounded-pill bg-cream text-soil placeholder:text-earth/60 focus:outline-none focus:ring-2 focus:ring-harvest/30"
        />
      </form>
    </section>
  )
}
