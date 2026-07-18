import { useParams, Link } from 'react-router-dom'
import { PageWrapper } from '@/components/layout/PageWrapper'

export default function FarmerDetailPage() {
  const { id } = useParams()

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="font-display text-title text-soil">Profil Petani</h1>
        <p className="text-caption text-earth mt-2">ID: {id} — Halaman segera hadir</p>
        <Link to="/petani" className="text-sm text-harvest mt-4 underline">Kembali ke daftar petani</Link>
      </div>
    </PageWrapper>
  )
}
