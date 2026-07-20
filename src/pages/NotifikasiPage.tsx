import { Bell } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'

export default function NotifikasiPage() {
  return (
    <PageWrapper>
      <div className="px-4 py-6">
        <h1 className="font-display text-title text-soil mb-6">Notifikasi</h1>

        <div className="flex flex-col items-center justify-center py-16">
          <Bell size={64} className="text-earth/30 mb-4" />
          <p className="text-body text-soil font-semibold">Belum ada notifikasi</p>
          <p className="text-caption text-earth mt-2 text-center">
            Notifikasi pesanan dan promo akan muncul di sini.
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}
