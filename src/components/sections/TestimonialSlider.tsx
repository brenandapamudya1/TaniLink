import { useState, useRef, useEffect } from 'react'

interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: 'Dulu saya jual ke tengkulak Rp 800/kg. Sekarang saya bisa dapat Rp 3.200/kg.',
    name: 'Pak Suryanto',
    role: 'Petani Sayur, Malang',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    id: 2,
    quote: 'Anak-anak saya sekarang makan sayur segar setiap hari. Harganya terjangkau dan kualitasnya jauh lebih baik.',
    name: 'Bu Ratna',
    role: 'Konsumen, Jakarta',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  },
  {
    id: 3,
    quote: 'Platform ini membantu kami menjangkau pasar yang lebih luas tanpa harus bergantung pada tengkulak.',
    name: 'Pak Wayan',
    role: 'Petani Organik, Bali',
    avatar: 'https://images.unsplash.com/photo-1506794783210-15d02344e488?w=200&q=80',
  },
]

export function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const width = container.offsetWidth
      const index = Math.round(scrollLeft / width)
      setActiveIndex(index)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="bg-soil py-12 md:max-w-[480px] md:mx-auto">
      <div className="px-4">
        <div className="text-harvest text-6xl font-display leading-none mb-2">
          "
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory -mx-4 px-4 gap-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-full snap-center"
            >
              <p className="font-display text-section text-cream italic leading-relaxed mb-6">
                {testimonial.quote}
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  loading="lazy"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-label text-cream font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-caption text-cream/70">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = scrollRef.current
                if (container) {
                  container.scrollTo({
                    left: index * container.offsetWidth,
                    behavior: 'smooth',
                  })
                }
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex ? 'bg-harvest' : 'bg-cream/30'
              }`}
              aria-label={`Testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
