export interface FarmerOrder {
  id: string
  buyerName: string
  product: string
  quantity: number
  total: number
  status: 'baru' | 'diproses' | 'dikirim' | 'selesai'
  date: string
}

export const farmerOrders: FarmerOrder[] = [
  {
    id: 'FO-001',
    buyerName: 'Budi Santoso',
    product: 'Bayam Hijau Segar',
    quantity: 2,
    total: 9000,
    status: 'baru',
    date: '2025-01-15',
  },
  {
    id: 'FO-002',
    buyerName: 'Siti Aminah',
    product: 'Kangkung Organik',
    quantity: 3,
    total: 10500,
    status: 'diproses',
    date: '2025-01-14',
  },
  {
    id: 'FO-003',
    buyerName: 'Ahmad Rizki',
    product: 'Jagung Manis',
    quantity: 4,
    total: 24000,
    status: 'dikirim',
    date: '2025-01-13',
  },
  {
    id: 'FO-004',
    buyerName: 'Dewi Lestari',
    product: 'Bayam Hijau Segar',
    quantity: 1,
    total: 4500,
    status: 'selesai',
    date: '2025-01-12',
  },
  {
    id: 'FO-005',
    buyerName: 'Rudi Hermawan',
    product: 'Kangkung Organik',
    quantity: 5,
    total: 17500,
    status: 'selesai',
    date: '2025-01-11',
  },
]
