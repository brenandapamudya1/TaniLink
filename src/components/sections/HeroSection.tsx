import { Link } from 'react-router-dom'
import { Wheat, Package, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StatPill } from '@/components/ui/StatPill'
import heroFarmerImg from '@/assets/hero-farmer.jpeg'

export function HeroSection() {
  return (
    <section className="bg-soil min-h-[88vh] px-4 py-12 md:max-w-[480px] md:mx-auto">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-label text-harvest uppercase tracking-wider">
            Langsung dari tangan petani
          </span>

          <h1 className="font-display text-hero text-cream italic leading-tight">
            Hasil bumi yang adil untuk semua.
          </h1>

          <p className="text-body text-cream/70 leading-relaxed max-w-md">
            Harga pasar tanpa tengkulak — petani untung, kamu hemat.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/produk">
            <Button label="Belanja Sekarang" variant="primary" />
          </Link>
          <Link to="/tentang">
            <Button label="Daftar sebagai Petani" variant="ghost" />
          </Link>
        </div>

        <div className="rounded-xl overflow-hidden shadow-hero">
          <img
            src={heroFarmerImg}
            alt="Petani memegang hasil panen segar dari kebun"
            className="w-full aspect-[4/3] object-cover"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory">
          <StatPill icon={<Wheat size={18} />} value="120+" label="Petani Mitra" />
          <StatPill icon={<Package size={18} />} value="850+" label="Produk Segar" />
          <StatPill icon={<Zap size={18} />} value="<24jam" label="Kirim" />
        </div>
      </div>
    </section>
  )
}
