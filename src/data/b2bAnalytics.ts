import type { B2BAnalytics } from '@/types/b2b'

export const b2bAnalytics: B2BAnalytics = {
  monthlySpending: [
    { month: 'Feb', spending: 8500000 },
    { month: 'Mar', spending: 9200000 },
    { month: 'Apr', spending: 8800000 },
    { month: 'Mei', spending: 10500000 },
    { month: 'Jun', spending: 9500000 },
    { month: 'Jul', spending: 11200000 },
  ],
  topProducts: [
    { productName: 'Tomat Merah Grade A', totalKg: 1850, totalSpent: 22200000 },
    { productName: 'Jeruk Medan Grade A', totalKg: 920, totalSpent: 23000000 },
    { productName: 'Wortel Baby Grade A', totalKg: 780, totalSpent: 11700000 },
    { productName: 'Sawi Hijau Grade A', totalKg: 650, totalSpent: 5200000 },
    { productName: 'Cabai Rawit Grade A', totalKg: 180, totalSpent: 8100000 },
  ],
  lastMonthChange: 18.75,
}
