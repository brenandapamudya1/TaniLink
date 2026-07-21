export type PickupTaskStatus = 'baru' | 'diterima' | 'dalam_perjalanan' | 'selesai'

export interface PickupItem {
  name: string
  qty: number
  unit: string
}

export interface PickupTask {
  id: string
  farmerName: string
  farmerLocation: string
  items: PickupItem[]
  totalWeight: number
  vehicleId?: string
  status: PickupTaskStatus
  scheduledTime: string
  createdAt: string
}
