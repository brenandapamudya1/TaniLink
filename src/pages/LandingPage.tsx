import { HeroSection } from '@/components/sections/HeroSection'
import { CategorySection } from '@/components/sections/CategorySection'
import { ProductCarousel } from '@/components/sections/ProductCarousel'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { TestimonialSlider } from '@/components/sections/TestimonialSlider'
import { CtaSection } from '@/components/sections/CtaSection'
import { Footer } from '@/components/layout/Footer'

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <CategorySection />
      <ProductCarousel />
      <HowItWorks />
      <TestimonialSlider />
      <CtaSection />
      <Footer />
    </main>
  )
}
