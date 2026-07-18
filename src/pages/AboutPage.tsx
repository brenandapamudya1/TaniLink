import { Link } from 'react-router-dom'
import { PageWrapper } from '@/components/layout/PageWrapper'

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="font-display text-title text-soil">Tentang TaniLink</h1>
        <p className="text-caption text-earth mt-2">Halaman segera hadir</p>
        <Link to="/" className="text-sm text-harvest mt-4 underline">Kembali ke beranda</Link>
      </div>
    </PageWrapper>
  )
}
