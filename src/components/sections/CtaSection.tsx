import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function CtaSection() {
  return (
    <section className="bg-harvest py-12 md:max-w-[480px] md:mx-auto">
      <div className="px-4 text-center">
        <h2 className="font-display text-title text-soil mb-4">
          Mulai belanja hari ini.
        </h2>

        <Link to="/produk">
          <Button label="Daftar Gratis" variant="dark" />
        </Link>

        <p className="text-caption text-soil/70 mt-4">
          Tidak ada biaya langganan
        </p>
      </div>
    </section>
  )
}
