export type ProductCondition = 'baik' | 'sedang' | 'rusak'

export interface DistributorEarning {
  id: string
  date: string
  pickupFee: number
  deliveryFee: number
  performanceBonus: number
  qualityBonus: number
  total: number
  taskRef: string
}

export interface PickupVerification {
  taskId: string
  actualWeight: number
  condition: ProductCondition
  gradeA: number
  gradeB: number
  gradeC: number
  photoUrl?: string
  notes: string
  verifiedAt: string
}

export interface MonthlyEarning {
  month: string
  amount: number
}
