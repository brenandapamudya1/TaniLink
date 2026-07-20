import { useNavigate } from 'react-router-dom'
import { Bell, ArrowLeft } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { NotificationItem } from '@/components/ui/NotificationItem'
import { notifications } from '@/data/notifications'

export default function NotifikasiPage() {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <div className="sticky top-14 z-30 bg-fog px-4 py-3 border-b border-cream flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream transition-colors"
            aria-label="Kembali"
          >
            <ArrowLeft size={20} className="text-soil" />
          </button>
          <h1 className="font-display text-section text-soil">Notifikasi</h1>
        </div>
        {notifications.length > 0 && (
          <button className="text-caption text-harvest font-semibold">
            Tandai semua dibaca
          </button>
        )}
      </div>

      <div className="px-4 py-6">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Bell size={64} className="text-earth/30 mb-4" />
            <p className="text-body text-soil font-semibold">Belum ada notifikasi</p>
            <p className="text-caption text-earth mt-2 text-center">
              Notifikasi pesanan dan promo akan muncul di sini.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
