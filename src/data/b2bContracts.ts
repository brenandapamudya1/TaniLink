import type { Contract } from '@/types/b2b'

export const contracts: Contract[] = [
  {
    id: 'kontrak-001',
    productName: 'Tomat Merah Grade A',
    grade: 'A',
    volumePerWeek: 500,
    unit: 'kg',
    duration: '6 bulan',
    pricePerKg: 12000,
    status: 'aktif',
    farmerName: 'Pak Amin Suryadi',
    farmerId: 'farmer-001',
    startDate: '2026-04-01',
    endDate: '2026-09-30',
  },
  {
    id: 'kontrak-002',
    productName: 'Sawi Hijau Grade A',
    grade: 'A',
    volumePerWeek: 200,
    unit: 'kg',
    duration: '3 bulan',
    pricePerKg: 8000,
    status: 'aktif',
    farmerName: 'Bu Sari Dewi',
    farmerId: 'farmer-002',
    startDate: '2026-05-15',
    endDate: '2026-08-15',
  },
  {
    id: 'kontrak-003',
    productName: 'Wortel Baby Grade A',
    grade: 'A',
    volumePerWeek: 300,
    unit: 'kg',
    duration: '4 bulan',
    pricePerKg: 15000,
    status: 'aktif',
    farmerName: 'Pak Togas',
    farmerId: 'farmer-003',
    startDate: '2026-06-01',
    endDate: '2026-09-30',
  },
]

export const proposedContracts: Contract[] = [
  {
    id: 'kontrak-004',
    productName: 'Cabai Rawit Grade A',
    grade: 'A',
    volumePerWeek: 100,
    unit: 'kg',
    duration: '6 bulan',
    pricePerKg: 42000,
    status: 'diajukan',
  },
]
