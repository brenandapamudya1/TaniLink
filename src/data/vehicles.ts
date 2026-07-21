import type { Vehicle } from '@/types/vehicle'

export const vehicles: Vehicle[] = [
  {
    id: 'motor',
    name: 'Motor',
    icon: 'Bike',
    capacityLabel: '≤ 20 kg',
    capacityKg: 20,
    range: 'Dekat',
    suitableFor: 'Sayur dalam jumlah kecil',
    type: 'pribadi',
    status: 'tersedia',
  },
  {
    id: 'mobil',
    name: 'Mobil',
    icon: 'Car',
    capacityLabel: '≤ 200 kg',
    capacityKg: 200,
    range: 'Menengah',
    suitableFor: 'Pengiriman B2C / B2B kecil',
    type: 'pribadi',
    status: 'tersedia',
  },
  {
    id: 'pickup',
    name: 'Pick-up',
    icon: 'Truck',
    capacityLabel: '≤ 1 ton',
    capacityKg: 1000,
    range: 'Menengah–jauh',
    suitableFor: 'Pengambilan hasil panen dalam jumlah besar',
    type: 'rental',
    rentalFee: 150000,
    rentalCompany: 'CV. Angkut Mandiri',
    status: 'tersedia',
  },
  {
    id: 'truk',
    name: 'Truk',
    icon: 'Truck',
    capacityLabel: '> 1 ton',
    capacityKg: 2000,
    range: 'Jauh',
    suitableFor: 'Pesanan B2B besar',
    type: 'rental',
    rentalFee: 300000,
    rentalCompany: 'PT. Logistik Nusantara',
    status: 'digunakan',
  },
]

export const VEHICLE_ICONS: Record<string, string> = {
  Bike: 'Bike',
  Car: 'Car',
  Truck: 'Truck',
}
