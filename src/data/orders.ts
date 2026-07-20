export type OrderStatus = 'dipanen' | 'dikumpulkan' | 'perjalanan' | 'selesai'

export interface OrderItem {
  productId: string
  name: string
  image: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  date: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  total: number
  farmerName: string
  farmerLocation: string
}

export const orders: Order[] = [
  {
    id: 'ORD-001',
    date: '2025-01-15',
    status: 'dipanen',
    items: [
      {
        productId: 'prod-001',
        name: 'Bayam Hijau Segar',
        image: '/placeholder-bayam.jpg',
        quantity: 2,
        price: 4500,
      },
      {
        productId: 'prod-003',
        name: 'Kangkung Organik',
        image: '/placeholder-kangkung.jpg',
        quantity: 1,
        price: 3500,
      },
    ],
    subtotal: 12500,
    shippingCost: 8000,
    total: 20500,
    farmerName: 'Pak Amin Suryadi',
    farmerLocation: 'Malang, Jawa Timur',
  },
  {
    id: 'ORD-002',
    date: '2025-01-14',
    status: 'perjalanan',
    items: [
      {
        productId: 'prod-002',
        name: 'Tomat Merah Premium',
        image: '/placeholder-tomat.jpg',
        quantity: 3,
        price: 8000,
      },
    ],
    subtotal: 24000,
    shippingCost: 8000,
    total: 32000,
    farmerName: 'Bu Sari Dewi',
    farmerLocation: 'Lembang, Jawa Barat',
  },
  {
    id: 'ORD-003',
    date: '2025-01-12',
    status: 'selesai',
    items: [
      {
        productId: 'prod-005',
        name: 'Jeruk Medan Manis',
        image: '/placeholder-jeruk.jpg',
        quantity: 2,
        price: 15000,
      },
      {
        productId: 'prod-009',
        name: 'Markisa Ungu',
        image: '/placeholder-markisa.jpg',
        quantity: 1,
        price: 18000,
      },
    ],
    subtotal: 48000,
    shippingCost: 8000,
    total: 56000,
    farmerName: 'Pak Togas Siregar',
    farmerLocation: 'Berastagi, Sumatera Utara',
  },
]
