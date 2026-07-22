export type B2BOrderStatus =
  | 'dibuat'
  | 'petani_dikonfirmasi'
  | 'panen'
  | 'collection_agent'
  | 'qc'
  | 'hub'
  | 'pengiriman'
  | 'diterima'

export type B2BUnit = 'kg' | 'karung' | 'box' | 'ton'

export type InvoiceStatus = 'lunas' | 'tempo' | 'overdue'

export type ContractStatus = 'aktif' | 'berakhir' | 'diajukan'

export interface B2BProduct {
  id: string
  name: string
  grade: 'A' | 'B' | 'C'
  pricePerKg: number
  stock: number
  minOrder: number
  unit: B2BUnit
  category: string
  image: string
  farmerId: string
}

export interface B2BOrderItem {
  productId: string
  productName: string
  quantity: number
  unit: B2BUnit
  pricePerKg: number
  subtotal: number
}

export interface B2BOrder {
  id: string
  items: B2BOrderItem[]
  totalWeight: number
  totalPrice: number
  status: B2BOrderStatus
  statusTimestamps: Record<B2BOrderStatus, string>
  createdAt: string
  businessName: string
}

export interface RecurringOrderItem {
  productId: string
  productName: string
  quantity: number
  unit: B2BUnit
}

export interface RecurringOrder {
  id: string
  name: string
  days: string[]
  items: RecurringOrderItem[]
  active: boolean
  createdAt: string
}

export interface Contract {
  id: string
  productName: string
  grade: string
  volumePerWeek: number
  unit: string
  duration: string
  pricePerKg: number
  status: ContractStatus
  farmerName?: string
  farmerId?: string
  startDate?: string
  endDate?: string
}

export interface RFQItem {
  productName: string
  grade: string
  quantity: number
  unit: B2BUnit
}

export interface RFQ {
  id: string
  items: RFQItem[]
  deadline: string
  notes: string
  status: 'dikirim' | 'ditanggapi' | 'selesai'
  createdAt: string
}

export interface B2BInvoice {
  id: string
  number: string
  date: string
  items: B2BOrderItem[]
  subtotal: number
  tax: number
  total: number
  dueDate: string
  status: InvoiceStatus
  orderRef: string
}

export interface B2BAnalyticsMonthly {
  month: string
  spending: number
}

export interface B2BAnalyticsTopProduct {
  productName: string
  totalKg: number
  totalSpent: number
}

export interface B2BAnalytics {
  monthlySpending: B2BAnalyticsMonthly[]
  topProducts: B2BAnalyticsTopProduct[]
  lastMonthChange: number
}
