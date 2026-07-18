import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Users } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { FarmerCard } from '@/components/ui/FarmerCard'
import { farmers } from '@/data/farmers'
import type { Farmer } from '@/types/farmer'

export default function FarmerListPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(farmers.map((f) => f.location))]
    return uniqueLocations.sort()
  }, [])

  const filteredFarmers = useMemo(() => {
    let result = [...farmers]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((f) => f.name.toLowerCase().includes(query))
    }

    if (selectedLocation !== 'all') {
      result = result.filter((f) => f.location === selectedLocation)
    }

    return result
  }, [searchQuery, selectedLocation])

  const handleFarmerClick = (farmer: Farmer) => {
    navigate(`/petani/${farmer.id}`)
  }

  return (
    <PageWrapper>
      <div className="sticky top-14 z-30 bg-fog px-4 py-3 border-b border-cream">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-earth" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari petani..."
            className="w-full h-11 pl-11 pr-10 rounded-pill bg-cream text-soil placeholder:text-earth/60 focus:outline-none focus:ring-2 focus:ring-harvest/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-earth/20 flex items-center justify-center"
              aria-label="Hapus pencarian"
            >
              <X size={14} className="text-earth" />
            </button>
          )}
        </div>
      </div>

      <div className="sticky top-[102px] z-20 bg-fog px-4 py-3 border-b border-cream">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 snap-x">
          <button
            onClick={() => setSelectedLocation('all')}
            className={`px-4 py-2 rounded-pill text-sm font-semibold whitespace-nowrap transition-colors ${
              selectedLocation === 'all'
                ? 'bg-leaf text-cream'
                : 'bg-transparent border border-earth text-earth'
            }`}
          >
            Semua
          </button>
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => setSelectedLocation(location)}
              className={`px-4 py-2 rounded-pill text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedLocation === location
                  ? 'bg-leaf text-cream'
                  : 'bg-transparent border border-earth text-earth'
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        <h1 className="font-display text-title text-soil mb-4">Petani Mitra</h1>

        {filteredFarmers.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filteredFarmers.map((farmer) => (
              <FarmerCard
                key={farmer.id}
                farmer={farmer}
                onClick={handleFarmerClick}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Users size={48} className="text-earth/30 mb-4" />
            <p className="text-body text-soil font-semibold">Petani tidak ditemukan</p>
            <p className="text-caption text-earth mt-2">Coba kata kunci lain atau hapus filter</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
