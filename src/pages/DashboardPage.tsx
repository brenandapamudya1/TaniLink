import { GreetingSection } from '@/components/sections/GreetingSection'
import { CategorySection } from '@/components/sections/CategorySection'
import { PanenHariIni } from '@/components/sections/PanenHariIni'
import { RekomendasiSection } from '@/components/sections/RekomendasiSection'
import { PageWrapper } from '@/components/layout/PageWrapper'

export default function DashboardPage() {
  return (
    <PageWrapper>
      <main className="bg-fog min-h-screen">
        <GreetingSection />
        <CategorySection />
        <PanenHariIni />
        <RekomendasiSection />
      </main>
    </PageWrapper>
  )
}
