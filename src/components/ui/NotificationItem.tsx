import { Package, CreditCard, Tag, TrendingUp, Sprout } from 'lucide-react'
import type { Notification, NotificationType } from '@/data/notifications'

interface NotificationItemProps {
  notification: Notification
}

const typeConfig: Record<NotificationType, { icon: typeof Package; color: string }> = {
  order: { icon: Package, color: 'text-harvest' },
  payment: { icon: CreditCard, color: 'text-leaf' },
  promo: { icon: Tag, color: 'text-earth' },
  price: { icon: TrendingUp, color: 'text-harvest' },
  harvest: { icon: Sprout, color: 'text-leaf' },
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { icon: Icon, color } = typeConfig[notification.type]
  const time = new Date(notification.timestamp).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div
      className={`bg-fog rounded-lg shadow-card p-4 flex gap-3 ${
        !notification.read ? 'border-l-4 border-harvest' : ''
      }`}
    >
      <div className={`w-10 h-10 rounded-full bg-cream flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-soil font-semibold text-sm truncate">
            {notification.title}
          </h3>
          {!notification.read && (
            <span className="w-2 h-2 rounded-full bg-harvest flex-shrink-0 mt-1.5" />
          )}
        </div>
        <p className="text-body text-earth text-sm leading-relaxed mb-2">
          {notification.message}
        </p>
        <p className="text-caption text-earth">{time}</p>
      </div>
    </div>
  )
}
