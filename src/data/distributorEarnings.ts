import type { DistributorEarning, MonthlyEarning } from '@/types/distributor'

export const monthlyEarnings: MonthlyEarning[] = [
  { month: 'Jan', amount: 4200000 },
  { month: 'Feb', amount: 5100000 },
  { month: 'Mar', amount: 4800000 },
  { month: 'Apr', amount: 6300000 },
  { month: 'Mei', amount: 5700000 },
  { month: 'Jun', amount: 7200000 },
]

export const recentEarnings: DistributorEarning[] = [
  {
    id: 'earn-001',
    date: '2026-07-20',
    pickupFee: 150000,
    deliveryFee: 75000,
    performanceBonus: 25000,
    qualityBonus: 15000,
    total: 265000,
    taskRef: 'PH1020',
  },
  {
    id: 'earn-002',
    date: '2026-07-19',
    pickupFee: 75000,
    deliveryFee: 50000,
    performanceBonus: 25000,
    qualityBonus: 0,
    total: 150000,
    taskRef: 'PH1018',
  },
  {
    id: 'earn-003',
    date: '2026-07-18',
    pickupFee: 150000,
    deliveryFee: 100000,
    performanceBonus: 25000,
    qualityBonus: 20000,
    total: 295000,
    taskRef: 'PH1016',
  },
  {
    id: 'earn-004',
    date: '2026-07-17',
    pickupFee: 75000,
    deliveryFee: 50000,
    performanceBonus: 0,
    qualityBonus: 10000,
    total: 135000,
    taskRef: 'PH1015',
  },
  {
    id: 'earn-005',
    date: '2026-07-16',
    pickupFee: 25000,
    deliveryFee: 25000,
    performanceBonus: 25000,
    qualityBonus: 15000,
    total: 90000,
    taskRef: 'PH1014',
  },
]
