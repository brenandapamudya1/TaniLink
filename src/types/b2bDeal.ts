export type B2BPartnerType = 'restoran' | 'umkm' | 'catering'

export interface B2BPartner {
  id: string
  name: string
  type: B2BPartnerType
  location: string
}

export interface B2BDealProduct {
  id: string
  name: string
  description: string
  partner: B2BPartner
  originalPrice: number
  discountedPrice: number
  unit: string
  stock: number
  image: string
  rating: number
  category: string
}