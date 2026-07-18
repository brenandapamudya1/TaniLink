import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Scale, Leaf, Eye, ShoppingBag, PackageCheck, Truck } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { HeroSection } from '@/components/sections/HeroSection'
import { TestimonialSlider } from '@/components/sections/TestimonialSlider'
import { CtaSection } from '@/components/sections/CtaSection'

interface ValueCard {
  icon: typeof Scale
  title: string
  description: string
}

const values: ValueCard[] = [
  {
    icon: Scale,
    title: 'Harga Adil',
    description: 'Petani mendapat harga yang layak untuk kerja keras mereka. Konsumen membayar harga wajar tanpa markup tengkulak.',
  },
  {
    icon: Leaf,
    title: 'Kesegaran Terjamin',
    description: 'Produk dipanen pagi hari dan dikirim langsung ke pintumu. Tidak ada gudang penyimpanan berhari-hari.',
  },
  {
    icon: Eye,
    title: 'Transparansi',
    description: 'Kamu tahu dari mana makananmu berasal. Setiap produk punya cerita petani di baliknya.',
  },
]

interface Step {
  icon: typeof ShoppingBag
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: ShoppingBag,
    title: 'Pilih produk',
    description: 'Jelajahi katalog produk segar dari petani terverifikasi di seluruh Indonesia.',
  },
  {
    icon: PackageCheck,
    title: 'Kami kumpulkan',
    description: 'Pesananmu dikumpulkan langsung dari kebun pagi hari setelah order masuk.',
  },
  {
    icon: Truck,
    title: 'Sampai segar',
    description: 'Diantar kurang dari 24 jam ke pintumu dalam kondisi segar dan siap diolah.',
  },
]

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <div className="sticky top-14 z-30 bg-fog/90 backdrop-blur-sm px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
          aria-label="Kembali"
        >
          <ArrowLeft size={20} className="text-soil" />
        </button>
      </div>

      <HeroSection />

      <div className="px-4 py-6">
        <h1 className="font-display text-title text-soil mb-4">
          Tentang TaniLink
        </h1>
        <p className="text-body text-earth leading-relaxed">
          Kami menghubungkan petani lokal langsung ke konsumen tanpa perantara. 
          Tidak ada lagi rantai distribusi panjang yang merugikan petani dan 
          memberatkan konsumen.
        </p>
        <p className="text-body text-earth leading-relaxed mt-3">
          TaniLink lahir dari keyakinan sederhana: petani deserves better, 
          dan kamu deserves makanan segar dengan harga wajar.
        </p>
      </div>

      <div className="border-t border-cream px-4 py-6">
        <h2 className="font-display text-section text-soil mb-4">
          Misi Kami
        </h2>
        <div className="flex flex-col gap-3">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <div
                key={value.title}
                className="bg-cream rounded-lg p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-harvest/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-harvest" />
                  </div>
                  <h3 className="font-semibold text-soil text-base">{value.title}</h3>
                </div>
                <p className="text-sm text-earth leading-relaxed">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="border-t border-cream px-4 py-6">
        <h2 className="font-display text-section text-soil mb-4">
          Cara Kerja
        </h2>
        <div className="flex flex-col gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-harvest/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-harvest" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-harvest/20 min-h-8 mt-2" />
                  )}
                </div>
                <div className={`flex-1 ${index < steps.length - 1 ? 'pb-2' : ''}`}>
                  <h3 className="font-semibold text-soil text-base">{step.title}</h3>
                  <p className="text-sm text-earth mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <TestimonialSlider />
      <CtaSection />
    </PageWrapper>
  )
}
