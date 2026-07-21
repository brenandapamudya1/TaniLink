import type { PickupTask } from '@/types/pickupTask'

export const pickupTasks: PickupTask[] = [
  {
    id: 'PH1023',
    farmerName: 'Budi Santoso',
    farmerLocation: 'Desa Sukamaju, Malang',
    items: [
      { name: 'Sawi Hijau', qty: 100, unit: 'kg' },
      { name: 'Tomat Merah', qty: 50, unit: 'kg' },
    ],
    totalWeight: 150,
    status: 'baru',
    scheduledTime: '2026-07-21T08:00:00',
    createdAt: '2026-07-20T14:00:00',
  },
  {
    id: 'PH1024',
    farmerName: 'Sari Dewi',
    farmerLocation: 'Desa Cikole, Lembang',
    items: [
      { name: 'Bayam Hijau', qty: 40, unit: 'kg' },
      { name: 'Kangkung', qty: 30, unit: 'kg' },
      { name: 'Selada', qty: 20, unit: 'kg' },
    ],
    totalWeight: 90,
    status: 'baru',
    scheduledTime: '2026-07-21T09:30:00',
    createdAt: '2026-07-20T16:00:00',
  },
  {
    id: 'PH1021',
    farmerName: 'Pak Wayan',
    farmerLocation: 'Desa Baturiti, Bali',
    items: [
      { name: 'Cabai Rawit', qty: 25, unit: 'kg' },
      { name: 'Jahe Merah', qty: 15, unit: 'kg' },
    ],
    totalWeight: 40,
    status: 'diterima',
    vehicleId: 'mobil',
    scheduledTime: '2026-07-21T07:00:00',
    createdAt: '2026-07-19T10:00:00',
  },
  {
    id: 'PH1020',
    farmerName: 'Bu Hasnah',
    farmerLocation: 'Desa Dolok Masihul, Sumatera Utara',
    items: [
      { name: 'Jeruk Medan', qty: 200, unit: 'kg' },
      { name: 'Markisa', qty: 80, unit: 'kg' },
    ],
    totalWeight: 280,
    status: 'dalam_perjalanan',
    vehicleId: 'pickup',
    scheduledTime: '2026-07-21T06:00:00',
    createdAt: '2026-07-18T09:00:00',
  },
  {
    id: 'PH1018',
    farmerName: 'Pak Togas',
    farmerLocation: 'Desa Tomohon, Sulawesi Utara',
    items: [
      { name: 'Wortel Baby', qty: 60, unit: 'kg' },
      { name: 'Paprika', qty: 30, unit: 'kg' },
    ],
    totalWeight: 90,
    status: 'selesai',
    vehicleId: 'mobil',
    scheduledTime: '2026-07-20T08:00:00',
    createdAt: '2026-07-17T11:00:00',
  },
]
