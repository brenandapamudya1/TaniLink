export type NotificationType = 'order' | 'payment' | 'promo' | 'price' | 'harvest'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
}

export const notifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'order',
    title: 'Pesanan Sedang Diproses',
    message: 'Pesanan ORD-001 sedang diproses oleh Pak Amin. Bayam hijau segar akan segera dipanen.',
    timestamp: '2025-01-15T10:30:00',
    read: false,
  },
  {
    id: 'notif-002',
    type: 'payment',
    title: 'Pembayaran Berhasil',
    message: 'Pembayaran untuk pesanan ORD-002 sebesar Rp 32.000 telah berhasil.',
    timestamp: '2025-01-14T14:20:00',
    read: true,
  },
  {
    id: 'notif-003',
    type: 'promo',
    title: 'Promo Minggu Ini!',
    message: 'Dapatkan diskon 15% untuk semua produk organik. Gunakan kode: ORGANIK15',
    timestamp: '2025-01-14T09:00:00',
    read: true,
  },
  {
    id: 'notif-004',
    type: 'price',
    title: 'Harga Tomat Naik 10%',
    message: 'Harga tomat merah naik dari Rp 7.000 menjadi Rp 8.000 per 500g karena permintaan tinggi.',
    timestamp: '2025-01-13T16:45:00',
    read: true,
  },
  {
    id: 'notif-005',
    type: 'harvest',
    title: 'Pengingat Panen',
    message: 'Kangkung organik di kebun Pak Amin akan dipanen besok pagi. Pesan sekarang untuk mendapatkan yang paling segar!',
    timestamp: '2025-01-13T08:00:00',
    read: true,
  },
  {
    id: 'notif-006',
    type: 'order',
    title: 'Pesanan Selesai',
    message: 'Pesanan ORD-003 telah selesai. Jangan lupa berikan rating untuk produk dari Pak Togas!',
    timestamp: '2025-01-12T18:30:00',
    read: true,
  },
]
