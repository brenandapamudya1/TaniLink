import type { B2BOrder } from '@/types/b2b'

const dayMs = 86400000

const unitToKg = {
  kg: 1,
  karung: 50,
  box: 20,
  ton: 1000,
}

function calcWeight(items: { quantity: number; unit: 'kg' | 'karung' | 'box' | 'ton' }[]): number {
  return items.reduce((sum, item) => sum + item.quantity * unitToKg[item.unit], 0)
}

function calcTotal(items: { quantity: number; unit: 'kg' | 'karung' | 'box' | 'ton'; pricePerKg: number }[]): number {
  return items.reduce((sum, item) => sum + item.quantity * unitToKg[item.unit] * item.pricePerKg, 0)
}

function ts(daysAgo: number, hour: number): string {
  const d = new Date(Date.now() - daysAgo * dayMs)
  d.setHours(hour, 0, 0, 0)
  return d.toISOString()
}

export const b2bOrders: B2BOrder[] = [
  {
    id: 'B2B-001',
    items: [
      { productId: 'b2b-tomat', productName: 'Tomat Merah Grade A', quantity: 300, unit: 'kg', pricePerKg: 12000, subtotal: 3600000 },
      { productId: 'b2b-sawi', productName: 'Sawi Hijau Grade A', quantity: 100, unit: 'kg', pricePerKg: 8000, subtotal: 800000 },
    ],
    totalWeight: calcWeight([
      { quantity: 300, unit: 'kg' },
      { quantity: 100, unit: 'kg' },
    ]),
    totalPrice: calcTotal([
      { quantity: 300, unit: 'kg', pricePerKg: 12000 },
      { quantity: 100, unit: 'kg', pricePerKg: 8000 },
    ]),
    status: 'pengiriman',
    statusTimestamps: {
      dibuat: ts(3, 8),
      petani_dikonfirmasi: ts(3, 10),
      panen: ts(2, 6),
      collection_agent: ts(2, 12),
      qc: ts(1, 8),
      hub: ts(1, 14),
      pengiriman: ts(0, 7),
      diterima: '',
    },
    createdAt: ts(3, 8),
    businessName: 'Restaurant ABC',
  },
  {
    id: 'B2B-002',
    items: [
      { productId: 'b2b-wortel', productName: 'Wortel Baby Grade A', quantity: 150, unit: 'kg', pricePerKg: 15000, subtotal: 2250000 },
      { productId: 'b2b-cabai', productName: 'Cabai Rawit Grade A', quantity: 30, unit: 'kg', pricePerKg: 45000, subtotal: 1350000 },
    ],
    totalWeight: calcWeight([
      { quantity: 150, unit: 'kg' },
      { quantity: 30, unit: 'kg' },
    ]),
    totalPrice: calcTotal([
      { quantity: 150, unit: 'kg', pricePerKg: 15000 },
      { quantity: 30, unit: 'kg', pricePerKg: 45000 },
    ]),
    status: 'hub',
    statusTimestamps: {
      dibuat: ts(2, 9),
      petani_dikonfirmasi: ts(2, 11),
      panen: ts(1, 6),
      collection_agent: ts(1, 13),
      qc: ts(0, 9),
      hub: ts(0, 15),
      pengiriman: '',
      diterima: '',
    },
    createdAt: ts(2, 9),
    businessName: 'Hotel Grand M',
  },
  {
    id: 'B2B-003',
    items: [
      { productId: 'b2b-kentang', productName: 'Kentang Grade B', quantity: 5, unit: 'karung', pricePerKg: 18000, subtotal: 4500000 },
    ],
    totalWeight: calcWeight([
      { quantity: 5, unit: 'karung' },
    ]),
    totalPrice: calcTotal([
      { quantity: 5, unit: 'karung', pricePerKg: 18000 },
    ]),
    status: 'petani_dikonfirmasi',
    statusTimestamps: {
      dibuat: ts(1, 14),
      petani_dikonfirmasi: ts(1, 16),
      panen: '',
      collection_agent: '',
      qc: '',
      hub: '',
      pengiriman: '',
      diterima: '',
    },
    createdAt: ts(1, 14),
    businessName: 'Cafe Santai',
  },
  {
    id: 'B2B-004',
    items: [
      { productId: 'b2b-jeruk', productName: 'Jeruk Medan Grade A', quantity: 10, unit: 'box', pricePerKg: 25000, subtotal: 5000000 },
      { productId: 'b2b-pisang', productName: 'Pisang Cavendish Grade A', quantity: 8, unit: 'box', pricePerKg: 15000, subtotal: 2400000 },
    ],
    totalWeight: calcWeight([
      { quantity: 10, unit: 'box' },
      { quantity: 8, unit: 'box' },
    ]),
    totalPrice: calcTotal([
      { quantity: 10, unit: 'box', pricePerKg: 25000 },
      { quantity: 8, unit: 'box', pricePerKg: 15000 },
    ]),
    status: 'diterima',
    statusTimestamps: {
      dibuat: ts(5, 8),
      petani_dikonfirmasi: ts(5, 10),
      panen: ts(4, 6),
      collection_agent: ts(4, 11),
      qc: ts(3, 8),
      hub: ts(3, 14),
      pengiriman: ts(2, 7),
      diterima: ts(2, 12),
    },
    createdAt: ts(5, 8),
    businessName: 'Bakery Harum',
  },
]
