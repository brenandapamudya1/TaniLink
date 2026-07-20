export interface MarketPrice {
  id: string
  commodity: string
  category: string
  avgPrice: number
  unit: string
  change: number
  trend: 'up' | 'down' | 'stable'
}

export const marketPrices: MarketPrice[] = [
  { id: 'mp-001', commodity: 'Tomat', category: 'buah-segar', avgPrice: 8000, unit: '500g', change: 10, trend: 'up' },
  { id: 'mp-002', commodity: 'Bayam', category: 'sayur-daun', avgPrice: 4500, unit: '250g', change: 5, trend: 'up' },
  { id: 'mp-003', commodity: 'Cabai Rawit', category: 'rempah', avgPrice: 12000, unit: '100g', change: -8, trend: 'down' },
  { id: 'mp-004', commodity: 'Kangkung', category: 'sayur-daun', avgPrice: 3500, unit: '250g', change: 0, trend: 'stable' },
  { id: 'mp-005', commodity: 'Wortel', category: 'umbi-umbian', avgPrice: 6000, unit: '250g', change: 3, trend: 'up' },
  { id: 'mp-006', commodity: 'Selada', category: 'sayur-daun', avgPrice: 5000, unit: '200g', change: -5, trend: 'down' },
  { id: 'mp-007', commodity: 'Jahe', category: 'rempah', avgPrice: 8000, unit: '100g', change: 12, trend: 'up' },
  { id: 'mp-008', commodity: 'Jeruk', category: 'buah-segar', avgPrice: 15000, unit: '500g', change: -2, trend: 'down' },
  { id: 'mp-009', commodity: 'Paprika', category: 'buah-segar', avgPrice: 14000, unit: '250g', change: 7, trend: 'up' },
  { id: 'mp-010', commodity: 'Ubi Jalar', category: 'umbi-umbian', avgPrice: 7000, unit: '500g', change: 0, trend: 'stable' },
  { id: 'mp-011', commodity: 'Kunyit', category: 'rempah', avgPrice: 5000, unit: '100g', change: 15, trend: 'up' },
  { id: 'mp-012', commodity: 'Beras Merah', category: 'biji-bijian', avgPrice: 22000, unit: '1kg', change: 4, trend: 'up' },
  { id: 'mp-013', commodity: 'Markisa', category: 'buah-segar', avgPrice: 18000, unit: '500g', change: -10, trend: 'down' },
  { id: 'mp-014', commodity: 'Jagung Manis', category: 'buah-segar', avgPrice: 6000, unit: '2 buah', change: 2, trend: 'up' },
]
