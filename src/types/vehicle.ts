export type VehicleStatus = 'tersedia' | 'digunakan' | 'perbaikan'

export type VehicleType = 'pribadi' | 'rental'

export interface Vehicle {
  id: string
  name: string
  icon: string
  capacityLabel: string
  capacityKg: number
  range: string
  suitableFor: string
  rentalFee?: number
  rentalCompany?: string
  type: VehicleType
  status: VehicleStatus
}
